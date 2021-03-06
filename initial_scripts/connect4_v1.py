import sys
import signal
import random


def sigint_handler(signum, frame):
    sys.exit(0)


def print_red(string: str, end: str):
    print('\033[91m{}\033[00m'.format(string), end=end)


def print_blue(string: str, end: str):
    print('\033[94m{}\033[00m'.format(string), end=end)


def print_board(board: list):
    for row in board:
        for item in row:
            if item == 1:
                print_red(item,'   ')
            elif item == 2:
                print_blue(item,'   ')
            else:
                print(item, end='   ')
        print('\n')


def validate_win(board: list, board_size: int, row: int, col: int, player: int) -> bool:
    """
    Validate whether the current player has "connected 4" after his or her latest move.

    Check 4 directions total, relative to the latest piece.
    1) Vertical (up-down)
    2) Horizontal (left-right)
    3) Diagonal 1 (Top Left to Bottom Right)
    4) Diagonal 2 (Top Right to Bottom Left)
    """
    # Vertical
    count = 0
    cur_row = row
    while cur_row >= 0:
        if board[cur_row][col] != player:
            break
        count += 1
        cur_row -= 1
    cur_row = row + 1
    while cur_row < board_size:
        if board[cur_row][col] != player:
            break
        count += 1
        cur_row += 1
    if count > 3:
        return True

    # Horizontal
    count = 0
    cur_col = col
    while cur_col >= 0:
        if board[row][cur_col] != player:
            break
        count += 1
        cur_col -= 1
    cur_col = col + 1
    while cur_col < board_size:
        if board[row][cur_col] != player:
            break
        count += 1
        cur_col += 1
    if count > 3:
        return True

    # Diagonal 1
    count = 0
    cur_row = row
    cur_col = col
    while cur_col >= 0 and cur_row >= 0:
        if board[cur_row][cur_col] != player:
            break
        count += 1
        cur_row -= 1
        cur_col -= 1
    cur_row = row + 1
    cur_col = col + 1
    while cur_col < board_size and cur_row < board_size:
        if board[cur_row][cur_col] != player:
            break
        count += 1
        cur_row += 1
        cur_col += 1
    if count > 3:
        return True

    # Diagonal 2
    count = 0
    cur_row = row
    cur_col = col
    while cur_col < board_size and cur_row >= 0:
        if board[cur_row][cur_col] != player:
            break
        count += 1
        cur_row -= 1
        cur_col += 1
    cur_row = row + 1
    cur_col = col - 1
    while cur_col >= 0 and cur_row < board_size:
        if board[cur_row][cur_col] != player:
            break
        count += 1
        cur_row += 1
        cur_col -= 1
    if count > 3:
        return True

    # If no winning sequence found, return False
    return False


def minimax(board: list, board_size: int, row: int, col: int, max_player: int, cur_depth: int, max_depth: int, alpha: int, beta: int) -> int:
    """
    Possible column selections are scored via minimax algorithm.
    The maximizing player is the AI, and the minimizing player is Player 1.
    This implementation assumes Player 1 will always choose most rational option.

    For more details on Minimax Algorithm, see Github README.
    """
    # Only need to check for AI Win if it's currently Player 1's turn (the AI just completed its move)
    if not max_player and validate_win(board, board_size, row, col, 2):
        return 10
    # Only need to check for Player 1 Win if it's currently AI's turn (Player 1 just completed his or her move)
    if max_player and validate_win(board, board_size, row, col, 1):
        return -10
    # Check for Tie or Max Depth Reached
    if all(board[0]) or cur_depth == max_depth:
        return 0
    # Maximizing Player: Player 2 (AI)
    if max_player:
        best_score = -1 * sys.maxsize
        for col in range(board_size):
            if board[0][col] == 0:
                row = 1
                while row < board_size:
                    if row == board_size - 1 and board[row][col] == 0:
                        break
                    elif board[row][col] != 0:
                        row -= 1
                        break
                    row += 1
                board[row][col] = 2
                best_score = max(best_score, minimax(board, board_size, row, col, not max_player, cur_depth + 1, max_depth, alpha, beta))
                board[row][col] = 0
                alpha = max(alpha, best_score)
                if beta <= alpha:
                    break
        return best_score
    # Minimizing Player: Player 1
    else:
        best_score = sys.maxsize
        for col in range(board_size):
            if board[0][col] == 0:
                row = 1
                while row < board_size:
                    if row == board_size - 1 and board[row][col] == 0:
                        break
                    elif board[row][col] != 0:
                        row -= 1
                        break
                    row += 1
                board[row][col] = 1
                best_score = min(best_score, minimax(board, board_size, row, col, not max_player, cur_depth + 1, max_depth, alpha, beta))
                board[row][col] = 0
                beta = min(beta, best_score)
                if beta <= alpha:
                    break
        return best_score


def necessary_move(board: list, board_size: int, cur_player: int) -> int:
    for col in range(board_size):
        if board[0][col] != 0:
            continue
        row = 1
        while row < board_size:
            if row == board_size - 1 and board[row][col] == 0:
                break
            elif board[row][col] != 0:
                row -= 1
                break
            row += 1
        board[row][col] = cur_player
        win = validate_win(board, board_size, row, col, cur_player)
        board[row][col] = 0
        if win:
            return col
    return -1


def choose_column(board: list, board_size: int, difficulty: int) -> int:
    """
    Selects column for AI Player.

    First checks for immediate opportunities (wins) or vulnerabilities (losses).
    If neither of the above are present, uses the minimax algorithm using difficulty as maximum recursion depth.
    """
    # First check for immediate opportunities or vulnerabilities for AI
    # Opportunities for an immediate win take priority.
    opportunity = necessary_move(board, board_size, 2)
    if opportunity != -1:
        return opportunity
    vulnerability = necessary_move(board, board_size, 1)
    if vulnerability != -1:
        return vulnerability

    # If no necessary move is present, use minimax algorithm to determine optimal move
    col_scores = []
    best_col_score = -1 * sys.maxsize
    for col in range(board_size):
        if board[0][col] == 0:
            row = 1
            while row < board_size:
                if row == board_size - 1 and board[row][col] == 0:
                    break
                elif board[row][col] != 0:
                    row -= 1
                    break
                row += 1
            board[row][col] = 2
            cur_score = minimax(board, board_size, row, col, False, 1, difficulty, -1 * sys.maxsize, sys.maxsize)
            board[row][col] = 0
            col_scores.append((col, cur_score))
            if cur_score > best_col_score:
                best_col_score = cur_score
    best_col = random.choice([col for col, score in col_scores if score == best_col_score])
    return best_col


def play_game(board_size: int, num_players: int) -> int:
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
        print_red('You are Player 1.\n', '')
        print_blue('The AI is Player 2.\n', '')
    cur_player = 1
    board = [[0]*board_size for row in range(board_size)]
    while True:
        if cur_player == 2 and num_players == 1:
            print('--------------')
            print_blue('AI\n', '')
            selected_col = choose_column(board, board_size, difficulty)
            print('AI selects column: ' + str(selected_col+1))
        else:
            print_board(board)
            if cur_player == 1:
                print_red('Player 1\n', '')
            else:
                print_blue('Player 2\n', '')
            while True:
                try:
                    selected_col = int(input('Select a column from 1 to ' + str(board_size) + ': ')) - 1
                except ValueError:
                    print('Invalid Input')
                    continue
                if selected_col < 0 or selected_col >= board_size:
                    print('Invalid Column Selection')
                    continue
                elif board[0][selected_col] != 0:
                    print('Selected Column is Full. Choose a different one.')
                    continue
                else:
                    break
        # Iterate through a column, replace the lowest possible 0 (default) with the Player's token
        row = 1
        while row < board_size:
            if row == board_size-1 and board[row][selected_col] == 0:
                board[row][selected_col] = cur_player
                break
            elif board[row][selected_col] != 0:
                row -= 1
                board[row][selected_col] = cur_player
                break
            row += 1
        # Validate whether the current player has won
        if validate_win(board, board_size, row, selected_col, cur_player):
            print_board(board)
            return cur_player
        # Validate whether the game can continue (if all are non-zero in the top row, the game ends in a tie)
        if all(board[0]):
            print_board(board)
            return 0
        # Switch players
        cur_player = 2 if cur_player == 1 else 1


def run_game():
    signal.signal(signal.SIGINT, sigint_handler)
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
    # Play Game with 1 or 2 players
    winner = play_game(board_size, num_players)
    # Results
    if winner == 1:
        print_red('Player 1 has Won.\n', '')
    elif winner == 2 and num_players == 1:
        print_blue('The AI has Won.\n', '')
    elif winner == 2 and num_players == 2:
        print_blue('Player 2 has Won.\n', '')
    else:
        print('Game ends in Tie.\n')


if __name__ == '__main__':
    while True:
        run_game()
        while True:
            try:
                play_again = input('Play Again? Type Y for Yes, N for No. ')
            except ValueError:
                print('Invalid Input.')
                continue
            if play_again == 'Y' or play_again == 'y':
                break
            elif play_again == 'N' or play_again == 'n':
                sys.exit(0)
            else:
                print('Please enter Y or N.')
