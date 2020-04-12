from board import Board
import player
from game import play_game, game_setup
import sys

def test_board_const():
    board = Board(6, 6)
    assert board.rows == 6
    assert board.columns == 6
    assert len(board.history) == 0

def test_board_place_token():
    board = Board(6, 6)
    assert board.place_token(0, 1) == True
    assert board.place_token(-1, 1) == False
    assert board.place_token(0, 1) == True
    assert board.place_token(0, 1) == True
    assert board.place_token(0, 1) == True
    assert board.place_token(0, 1) == True
    assert board.place_token(0, 1) == True
    assert board.place_token(0, 1) == False
    board.print_board()

def test_board_undo_reset():
    board = Board(6, 6)
    assert board.place_token(0, 1) == True
    assert board.place_token(0, 1) == True
    assert board.place_token(0, 1) == True
    assert board.place_token(0, 1) == True
    assert board.place_token(0, 1) == True
    assert board.place_token(0, 1) == True
    assert board.place_token(0, 1) == False
    assert board.undo() == True
    assert board.place_token(0, 1) == True
    board.reset()
    assert board.undo() == False


def test_validate_win():
    board = Board(6, 6)
    assert board.place_token(0, 1) == True
    assert board.place_token(0, 1) == True
    assert board.place_token(0, 1) == True
    assert board.place_token(0, 1) == True
    assert board.place_token(0, 1) == True
    assert board.validate_win(1, 0, 0) == True
    assert board.validate_win(1, 0, 1) == False

def test_player():
    player1 = player.Player("Vivek", 1)
    player2 = player.Player("AI", 2)

    player1.players_turn()
    player2.players_turn()
    board = Board(6, 6)
    player2.choose_input(board, 6)
    sys.stdin = open("test_input_files/input_player.txt")
    player1.choose_input(board, 6)

def test_AI_play_game():
    player1 = player.Player("AI", 1)
    player2 = player.Player("AI", 2)

    play_game(6, [player1, player2])

def test_game_setup():
    sys.stdin = open("test_input_files/input.txt")
    player, board_size = game_setup()
    assert board_size == 6
    assert player[0].name == "AI"
    assert player[1].name == "AI"

def test_invalid_inputs():
    sys.stdin = open("test_input_files/invalid.txt")
    player, board_size = game_setup()
    assert board_size == 6


def test_whole():
    sys.stdin = open("test_input_files/2p_input.txt")
    player, board_size = game_setup()
    assert play_game(board_size, player) == 1
