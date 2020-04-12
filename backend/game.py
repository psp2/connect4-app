import sys
import signal
import random
from color import print_red, print_blue
from board import Board
from AI import choose_column
from player import Player


def sigint_handler(signum, frame):
    sys.exit(0)

def play_game(board_size: int, player: list) -> int:

    player_idx = 0
    board = Board(board_size, board_size)
    while True:
        cur_player = player[player_idx]
        board.print_board()

        cur_player.players_turn()

        move_pending = True
        while move_pending:
            player_input = cur_player.choose_input(board, board_size)
            try:
                selected_col = int(player_input) - 1
            except ValueError:
                if(player_input == 'r'):
                    print("Game has been restarted")
                    board.reset()
                    continue
                elif(player_input == 'u'):
                    print("player wishes to undo last move")
                    board.undo()
                    break
                print('Invalid Input')
                continue
            move_pending = not board.place_token(selected_col, cur_player.color)

        # Validate whether the current player has won
        if board.validate_win(cur_player.color):
            board.print_board()
            return cur_player.color

        # Validate whether the game can continue (if all are non-zero in the top row, the game ends in a tie)
        if all(board.state[0]):
            board.print_board()
            return 0
        # Switch players
        player_idx = (player_idx + 1)%2


def game_setup():
    # Decide if you want to play against an AI or another human
    print('Select Number of Players\nChoose 1 to play an AI, and choose 2 to play a friend.')
    while True:
        try:
            num_players = int(input('Number of Players (1 or 2): '))
        except ValueError:
            print('Invalid Input')
            continue
        if num_players is 1 or num_players is 2:
            break
        else:
            print('Invalid Number of Players')
    # Select board size
    while True:
        try:
            board_size = int(input('Select a board length from 6 to 8: '))
        except ValueError:
            print('Invalid Input')
            continue
        if 5 < board_size < 9:
            break
        else:
            print('Invalid Board Size')

    if num_players == 1:
        while True:
            try:
                difficulty = int(input('Select difficulty level from 1 (Easy) to 9 (Hard): '))
            except ValueError:
                print('Invalid Input')
                continue
            if difficulty < 1 or difficulty > 9:
                print('Invalid Difficulty Level')
            else:
                difficulty += 2
                break
        player_name = input("Please enter player1's name: ")
        player1 = Player(player_name, 1)
        print_red('You are Player 1.\n', '')
        print_blue('The AI is Player 2.\n', '')
        player2 = Player("AI", 2, difficulty)
    else:
        player_name = input("Please enter player1's name: ")
        player1 = Player(player_name, 1)
        player_name = input("Please enter player2's name: ")
        player2 = Player(player_name, 2)

    return [player1, player2], board_size

def run_game():
    signal.signal(signal.SIGINT, sigint_handler)
    player, board_size = game_setup()
    # Play Game with 1 or 2 players
    winner = play_game(board_size, player)
    # Results
    if winner == 1:
        print_red('Player 1 has Won.\n', '')
    elif winner == 2:
        print_blue('Player 2 has Won.\n', '')
    else:
        print('Game ends in Tie.\n')

if __name__ == '__main__':
    run_game()
