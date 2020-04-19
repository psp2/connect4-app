from board import Board
import player
from game import play_game, game_setup, run_game
import sys

# AIs play Don't Connect 4!
def test_AI_play_reverse():
    player1 = player.Player("AI", 1, reverse=True)
    player2 = player.Player("AI", 2, reverse=True)

    play_game(6, [player1, player2])


# AIs play Mayhem!
def test_AI_play_mayhem():
    player1 = player.Player("AI", 1, mayhem=True)
    player2 = player.Player("AI", 2, mayhem=True)

    play_game(6, [player1, player2])


# 2 players plays Don't Connect 4!
def test_whole_reverse():
    sys.stdin = open("test_input_files/2p_input_silly.txt")
    player, board_size, reverse_status = game_setup()
    assert play_game(board_size, player) == 1

    sys.stdin = open("test_input_files/2p_input_silly.txt")
    run_game()