import os
from server import app

import pytest
@pytest.fixture
def client():
    app.config['TESTING'] = True

    with app.test_client() as client:
        return client

blank_state_6 = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]

def state_compare(expected, actual):
    for i in range(len(expected)):
        for j in range(len(expected[0])):
            if expected[i][j] != actual[i][j]:
                print(i, j)
                print(expected[i][j], actual[i][j])
                return False
    return True

def leaderboard_get(name, data):
    for i in data:
        if i['name'] == name:
            return i

    return None

def test_server_running(client):
    rv = client.get('/')
    assert b'Server is running' in rv.data

def start_game(client):
    rv = client.put('/start?size=6&difficulty=1&p1=Test1&p2=Test2&mode=1')
    json_data = rv.get_json()
    assert json_data['size'] == 6
    assert json_data['response'] == 'Ok'
    assert state_compare(json_data['state'], blank_state_6)

    return json_data['id']

def delete_data(client, id):
    path = '/delete/board?id='+id
    rv = client.delete(path)

    path = '/delete/player?name=Test1'
    rv = client.delete(path)

    path = '/delete/player?name=Test2'
    rv = client.delete(path)


def test_place_token_and_undo(client):

    id = start_game(client)

    #Place token in 0th column
    path = '/place_token?id='+id+'&col=0'
    rv = client.post(path)
    json_data = rv.get_json()
    assert json_data['response'] == True
    assert json_data['game_status'] == 0
    assert not state_compare(blank_state_6, json_data['state'])
    first_placed_state_6 = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[1,0,0,0,0,0]]
    assert state_compare(first_placed_state_6, json_data['state'])

    #Place token in 1st column
    path = '/place_token?id='+id+'&col=1'
    rv = client.post(path)
    json_data = rv.get_json()
    assert json_data['response'] == True
    assert json_data['game_status'] == 0
    assert not state_compare(blank_state_6, json_data['state'])
    second_placed_state_6 = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[1,2,0,0,0,0]]
    assert state_compare(second_placed_state_6, json_data['state'])

    #Verify game state
    path = '/state?id='+id
    rv = client.get(path)
    json_data = rv.get_json()
    assert json_data["response"] == "Ok"
    assert state_compare(second_placed_state_6, json_data['state'])

    #Undo last move
    path = '/undo?id='+id
    rv = client.post(path)
    undo_data = rv.get_json()
    assert undo_data['response'] == True
    assert state_compare(first_placed_state_6, undo_data['state'])

    delete_data(client, id)

def test_game_restart(client):

    id = start_game(client)

    #Place token in 0th column
    path = '/place_token?id='+id+'&col=0'
    rv = client.post(path)
    json_data = rv.get_json()
    assert json_data['response'] == True
    assert json_data['game_status'] == 0
    assert not state_compare(blank_state_6, json_data['state'])
    first_placed_state_6 = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[1,0,0,0,0,0]]
    assert state_compare(first_placed_state_6, json_data['state'])

    #Restart game
    path = '/restart?id='+id
    rv = client.put(path)
    restart_data = rv.get_json()
    assert restart_data['response'] == True
    assert state_compare(blank_state_6, restart_data['state'])

    delete_data(client, id)

def test_quit_leaderboard(client):

    id = start_game(client)

    #Get leaderboard data
    path = '/leaderboard'
    rv = client.get(path)
    lead_data = rv.get_json()
    assert lead_data['response'] == True
    assert leaderboard_get("Test1", lead_data["leaderboard"]) != None
    assert leaderboard_get("Test2", lead_data["leaderboard"]) != None

    path = '/quit?id='+id+'&turn=1'
    rv = client.put(path)
    quit_data = rv.get_json()
    assert quit_data['game_status'] == 2

    #Get updated leaderboard data
    path = '/leaderboard'
    rv = client.get(path)
    lead_data = rv.get_json()
    assert lead_data['response'] == True
    losser = leaderboard_get("Test1", lead_data["leaderboard"])
    winner = leaderboard_get("Test2", lead_data["leaderboard"])
    assert losser["wins"] == 0
    assert losser["losses"] == 1
    assert winner["wins"] == 1
    assert winner["losses"] == 0

    delete_data(client, id)

def double_move(id, client):
    path = '/place_token?id='+id+'&col=0'
    rv = client.post(path)
    path = '/place_token?id='+id+'&col=1'
    rv = client.post(path)

def test_win_condition(client):

    id = start_game(client)

    double_move(id, client)
    double_move(id, client)
    double_move(id, client)

    path = '/place_token?id='+id+'&col=0'
    rv = client.post(path)

    json_data = rv.get_json()
    assert json_data['game_status'] == 1

    final_board = [[0,0,0,0,0,0],[0,0,0,0,0,0],[1,0,0,0,0,0],[1,2,0,0,0,0],[1,2,0,0,0,0],[1,2,0,0,0,0]]
    assert state_compare(final_board, json_data['state'])

    #Get updated leaderboard data
    path = '/leaderboard'
    rv = client.get(path)
    lead_data = rv.get_json()
    assert lead_data['response'] == True
    losser = leaderboard_get("Test2", lead_data["leaderboard"])
    winner = leaderboard_get("Test1", lead_data["leaderboard"])
    assert losser["wins"] == 0
    assert losser["losses"] == 1
    assert winner["wins"] == 1
    assert winner["losses"] == 0

    delete_data(client, id)

def test_ai_moves(client):

    id = start_game(client)

    path = '/ai?id='+id
    rv = client.post(path)
    ai_data = rv.get_json()
    assert ai_data['response'] == True

    delete_data(client, id)
