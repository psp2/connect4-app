import sys
import random

def choose_column(board, board_size, difficulty: int) -> int:
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
        if board.state[0][col] == 0:
            row = 1
            while row < board_size:
                if row == board_size - 1 and board.state[row][col] == 0:
                    break
                elif board.state[row][col] != 0:
                    row -= 1
                    break
                row += 1
            board.state[row][col] = 2
            cur_score = minimax(board, board_size, row, col, False, 1, difficulty, -1 * sys.maxsize, sys.maxsize)
            board.state[row][col] = 0
            col_scores.append((col, cur_score))
            if cur_score > best_col_score:
                best_col_score = cur_score
    best_col = random.choice([col for col, score in col_scores if score == best_col_score])
    return best_col


def choose_worst_column(board: list, board_size: int, difficulty: int) -> int:
    """
    Selects column for AI Player (Silly Mode Only)

    Uses the minimax algorithm using difficulty as maximum recursion depth.
    """
    col_scores = []
    worst_col_score = sys.maxsize
    for col in range(board_size):
        if board.state[0][col] == 0:
            row = 1
            while row < board_size:
                if row == board_size - 1 and board.state[row][col] == 0:
                    break
                elif board.state[row][col] != 0:
                    row -= 1
                    break
                row += 1
            board.state[row][col] = 2
            cur_score = minimax(board, board_size, row, col, False, 1, difficulty, -1 * sys.maxsize, sys.maxsize)
            board.state[row][col] = 0
            col_scores.append((col, cur_score))
            if cur_score < worst_col_score:
                worst_col_score = cur_score
    worst_col = random.choice([col for col, score in col_scores if score == worst_col_score])
    return worst_col


def necessary_move(board, board_size: int, cur_player: int) -> int:
    for col in range(board_size):
        if board.state[0][col] != 0:
            continue
        row = 1
        while row < board_size:
            if row == board_size - 1 and board.state[row][col] == 0:
                break
            elif board.state[row][col] != 0:
                row -= 1
                break
            row += 1
        board.state[row][col] = cur_player
        win = board.validate_win(cur_player, row, col)
        board.state[row][col] = 0
        if win:
            return col
    return -1


def minimax(board, board_size: int, row: int, col: int, max_player: int, cur_depth: int, max_depth: int, alpha: int, beta: int) -> int:
    """
    Possible column selections are scored via Minimax Algorithm.
    The maximizing player is the AI, and the minimizing player is Player 1.
    This implementation assumes Player 1 will always choose most rational option.

    For more details on Minimax Algorithm, see Github README.
    """
    # Only need to check for AI Win if it's currently Player 1's turn (the AI just completed its move)
    if not max_player and board.validate_win(2, row, col):
        return 10
    # Only need to check for Player 1 Win if it's currently AI's turn (Player 1 just completed his or her move)
    if max_player and board.validate_win(1, row, col):
        return -10
    # Check for Tie or Max Depth Reached
    if all(board.state[0]) or cur_depth == max_depth:
        return 0
    # Maximizing Player: Player 2 (AI)
    if max_player:
        best_score = -1 * sys.maxsize
        for col in range(board_size):
            if board.state[0][col] == 0:
                row = 1
                while row < board_size:
                    if row == board_size - 1 and board.state[row][col] == 0:
                        break
                    elif board.state[row][col] != 0:
                        row -= 1
                        break
                    row += 1
                board.state[row][col] = 2
                best_score = max(best_score, minimax(board, board_size, row, col, not max_player, cur_depth + 1, max_depth, alpha, beta))
                board.state[row][col] = 0
                alpha = max(alpha, best_score)
                if beta <= alpha:
                    break
        return best_score
    # Minimizing Player: Player 1
    else:
        best_score = sys.maxsize
        for col in range(board_size):
            if board.state[0][col] == 0:
                row = 1
                while row < board_size:
                    if row == board_size - 1 and board.state[row][col] == 0:
                        break
                    elif board.state[row][col] != 0:
                        row -= 1
                        break
                    row += 1
                board.state[row][col] = 1
                best_score = min(best_score, minimax(board, board_size, row, col, not max_player, cur_depth + 1, max_depth, alpha, beta))
                board.state[row][col] = 0
                beta = min(beta, best_score)
                if beta <= alpha:
                    break
        return best_score
