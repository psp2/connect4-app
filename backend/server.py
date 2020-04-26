from flask import Flask, request
from flask_cors import CORS
from board import Board
from pymongo import MongoClient
from color import print_red, print_blue
from bson.objectid import ObjectId
from AI import choose_column, choose_worst_column

app = Flask(__name__)
CORS(app)

def connect_database():
    client = MongoClient(port=27017)
    db = client.tic_tac
    return db

'''
Decode the board object from the mongodb database
@param id: The objectId of the board in database
'''
def decode(id):
    db = connect_database()
    record = db.boards.find_one({"_id": ObjectId(id)})
    size = record["size"]
    board = Board(size, size)
    board.state = record["state"]
    board.history = record["history"]
    board.turn = record["turn"]
    board.difficulty = record["difficulty"]
    board.players = record["players"]
    return db, board

'''
Update the board in the database and return an encoded version of the board object
'''
def update(db, id, board, result):
    to_insert = board.encode()
    db.boards.update_one({"_id": ObjectId(id)}, {"$set": to_insert})

    output = {}
    output['response'] = result
    output['state'] = board.state
    output['turn'] = board.turn + 1
    return output

'''
Inserts names into the leaderboard as long they don't already exists
'''
def insert_leaderboard(p1, p2):
    db = connect_database()
    result = db.leaderboard.find_one({"name": p1})
    if result == None:
        db.leaderboard.insert_one({"name": p1, "wins": 0, "losses": 0, "ties": 0})
    result = db.leaderboard.find_one({"name": p2})
    if result == None:
        db.leaderboard.insert_one({"name": p2, "wins": 0, "losses": 0, "ties": 0})

'''
Increment the scores on the leaderboard
'''
def increment_scores(db, winner, loser, tied=False):
    if tied == True:
        db.leaderboard.update_one({"name": winner}, {"$inc": {"tied": 1}})
        db.leaderboard.update_one({"name": loser}, {"$inc": {"tied": 1}})
    else:
        db.leaderboard.update_one({"name": winner}, {"$inc": {"wins": 1}})
        db.leaderboard.update_one({"name": loser}, {"$inc": {"losses": 1}})

'''
Validate on the state of the board
'''
def validate_state(db, player, board):
    game_won = board.validate_win(player)
    tied = all(board.state[0])

    '''
    0: Game ongoing
    1: Player 1 Won
    2: Player 2 Won
    3: Tied game
    '''
    game_status = 0
    if game_won:
        game_status = player
        winner = board.players[player-1]
        loser = board.players[player%2]

        #Check if it is silly mode or not
        if board.mode != 2:
            increment_scores(db, winner, loser)
        else:
            increment_scores(db, loser, winner)
            game_status = player%2 + 1
    elif tied:
        game_status = 3
        increment_scores(db, board.players[0], board.players[1], True)

    return game_status

def ai_move(db, id, board):
    player = board.turn + 1

    if board.mode != 2:
        col = choose_column(board, board.rows, board.difficulty)
    else:
        col = choose_worst_column(board, boards.rows, board.difficulty)

    result = board.place_token(col)

    game_status = validate_state(db, player, board)
    output = update(db, id, board, result)
    output['game_status'] = game_status
    board.print_board()
    return output

@app.route('/')
def hello_world():
    return 'Server is running'

@app.route('/start', methods=['PUT'])
def start_game():

    #Parse args from request
    size = int(request.args.get('size'))
    difficulty = int(request.args.get('difficulty')) + 2
    p1 = request.args.get('p1')
    p2 = request.args.get('p2')
    mode = request.args.get('mode')

    if mode == 'null':
        mode = 1

    #initialize game and insert into collection
    db = connect_database()
    board = Board(size, size, difficulty, [p1, p2], int(mode))
    to_insert = board.encode()
    id =  db.boards.insert_one(to_insert).inserted_id
    insert_leaderboard(p1, p2)

    #Response dictionary
    output = {}
    output["response"] = "Ok"
    output["state"] = board.state
    output["size"] = board.rows
    output["id"] = str(id)

    board.print_board()
    return output

#Launch special game mode
@app.route('/special', methods=['PUT'])
def special_game():
    # TODO: implement when custom game modes are implemented
    pass

@app.route('/state', methods=['GET'])
def game_state():

    id = request.args.get('id')

    db, board = decode(id)
    board.print_board()
    output = {}
    output["response"] = "Ok"
    output["state"] = board.state
    output['turn'] = board.turn + 1
    return output

@app.route('/place_token', methods=['POST'])
def place_token():
    id = request.args.get('id')
    col = int(request.args.get('col'))

    db, board = decode(id)

    player = board.turn + 1 #Color of current player
    result = board.place_token(col) #If the move was successful or not

    if result:
        board.print_board()
    else:
        print_red("No change\n", '')

    game_status = validate_state(db, player, board)

    if game_status != 0 or board.players[1] != 'AI':
        output = update(db, id, board, result)
        output['game_status'] = game_status
        output['prev'] = player
        return output

    else:
        return ai_move(db, id, board)


@app.route('/undo', methods=['POST'])
def undo():
    id = request.args.get('id')
    db, board = decode(id)
    result = board.undo()

    if result:
        board.print_board()
    else:
        print_red("No change\n", '')

    output = update(db, id, board, result)
    return output

@app.route('/ai', methods=['POST'])
def ai():
    id = request.args.get('id')
    db, board = decode(id)
    return ai_move(db, id, board)

@app.route('/restart', methods=['PUT'])
def restart():
    id = request.args.get('id')
    db, board = decode(id)
    board.reset()
    result = True
    board.print_board()
    output = update(db, id, board, result)
    return output

@app.route('/quit', methods=['PUT'])
def quit():
    id = request.args.get('id')
    turn = int(request.args.get('turn'))
    db, board = decode(id)
    loser = board.players[turn-1]
    winner = board.players[turn%2]

    increment_scores(db, winner, loser)
    output = {'game_status' : turn%2+1}
    return output

@app.route('/delete/board', methods=['DELETE'])
def delete_board():
    id = request.args.get('id')
    db = connect_database()
    result = db.boards.delete_one({"_id" : ObjectId(id)})
    output = {}
    output['response'] = str(result)
    return output

@app.route('/delete/player', methods=['DELETE'])
def delete_player():
    name = request.args.get('name')
    db = connect_database()
    result = db.leaderboard.delete_one({"name" : name})
    output = {}
    output['response'] = str(result)
    return output

@app.route('/leaderboard', methods=['GET'])
def leaderboard():
    db = connect_database()
    records = db.leaderboard.find({}, {"_id": 0, "name": 1, "wins": 1, "losses": 1, "ties": 1})
    leaderboard = []
    for i in records:
        leaderboard.append(i)
    output = {"response": True, "leaderboard": leaderboard}
    return output
