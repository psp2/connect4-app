from color import print_red, print_blue
import random
class Board:

    def __init__(self, rows, columns, difficulty=0, players=None, mode=1):
        self.rows = rows
        self.columns = columns
        self.state = [[0]*columns for row in range(rows)]
        self.history = []
        self.turn = 0
        self.difficulty = difficulty
        self.players = players
        self.mode = mode

    '''
    Modes
    1: Normal game
    2: Silly game
    3: Mayhem
    '''
    #encodes object into a dictionary for database storage
    def encode(self):
        output = {}
        output["size"] = self.columns
        output["state"] = self.state
        output["history"] = self.history
        output["turn"] = self.turn
        output["difficulty"] = self.difficulty
        output["players"] = self.players
        output["mode"] = self.mode
        return output

    def place_token(self, selected_col, cur_player=None):

        #game mode is mayhem
        if(self.mode == 3):
            rand_num = random.randint(1, 1000)
            selected_col = rand_num % selected_col

        # Iterate through a column, replace the lowest possible 0 (default) with the Player's token
        if self.invalid_column_selection(selected_col):
            print("Invalid column selection!!!")
            return False

        if self.column_full(selected_col):
            print("Current column is full!!!!")
            return False

        if cur_player == None:
            cur_player = self.turn + 1

        row = 1
        while row < self.rows:
            if row == self.rows-1 and self.state[row][selected_col] == 0:
                self.state[row][selected_col] = cur_player
                break
            elif self.state[row][selected_col] != 0:
                row -= 1
                self.state[row][selected_col] = cur_player
                break
            row += 1

        self.history.append((row, selected_col))
        self.turn = (self.turn+1)%2
        return True

    def column_full(self, col):
        return self.state[0][col] != 0

    def invalid_column_selection(self, selected_col):
        return selected_col < 0 or selected_col >= self.columns

    def undo(self):
        if (len(self.history) == 0):
            return False

        row, col = self.history.pop()
        self.state[row][col] = 0
        self.turn = (self.turn+1)%2
        return True

    def reset(self):
        self.state = [[0]*self.columns for row in range(self.rows)]
        self.history = []
        self.turn = 0

    def validate_win(self, player, row=-1, col=-1):
        """
        Validate whether the current player has "connected 4" after his or her latest move.

        Check 4 directions total, relative to the latest piece.
        1) Vertical (up-down)
        2) Horizontal (left-right)
        3) Diagonal 1 (Top Left to Bottom Right)
        4) Diagonal 2 (Top Right to Bottom Left)
        """
        # No moves performed yet!
        if(len(self.history) == 0):
            return False

        if(row == -1):
            row, col = self.history.pop()
            self.history.append((row, col))

        return self.vertical(player, row, col) or self.horizontal(player, row, col) or self.diagonal(player, row, col)

    def vertical(self, player, row, col):
        # Vertical
        count = 0
        cur_row = row
        while cur_row >= 0:
            if self.state[cur_row][col] != player:
                break
            count += 1
            cur_row -= 1
        cur_row = row + 1
        while cur_row < self.rows:
            if self.state[cur_row][col] != player:
                break
            count += 1
            cur_row += 1
        if count > 3:
            return True

        return False

    def horizontal(self, player, row, col):
        # Horizontal
        count = 0
        cur_col = col
        while cur_col >= 0:
            if self.state[row][cur_col] != player:
                break
            count += 1
            cur_col -= 1
        cur_col = col + 1
        while cur_col < self.columns:
            if self.state[row][cur_col] != player:
                break
            count += 1
            cur_col += 1
        if count > 3:
            return True

        return False

    def diagonal(self, player, row, col):
        # Diagonal 1
        count = 0
        cur_row = row
        cur_col = col
        while cur_col >= 0 and cur_row >= 0:
            if self.state[cur_row][cur_col] != player:
                break
            count += 1
            cur_row -= 1
            cur_col -= 1
        cur_row = row + 1
        cur_col = col + 1
        while cur_col < self.columns and cur_row < self.rows:
            if self.state[cur_row][cur_col] != player:
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
        while cur_col < self.columns and cur_row >= 0:
            if self.state[cur_row][cur_col] != player:
                break
            count += 1
            cur_row -= 1
            cur_col += 1
        cur_row = row + 1
        cur_col = col - 1
        while cur_col >= 0 and cur_row < self.rows:
            if self.state[cur_row][cur_col] != player:
                break
            count += 1
            cur_row += 1
            cur_col -= 1
        if count > 3:
            return True

        # If no winning sequence found, return False
        return False

    def print_board(self):
        for row in self.state:
            for item in row:
                if item == 1:
                    print_red(item, '   ')
                elif item == 2:
                    print_blue(item, '   ')
                else:
                    print(item, end='   ')
            print('\n')
