from AI import choose_column
from color import print_red, print_blue

class Player:

    def __init__(self, name, color, difficulty=6):
        self.name = name
        self.color = color
        self.difficulty = difficulty

    def players_turn(self):
        statement = "It is " + self.name + "'s turn\n"
        if self.color == 1:
            print_red(statement, '')
        else:
            print_blue(statement, '')


    def choose_input(self, board, board_size):
        if (self.name == 'AI'):
            return str(choose_column(board, board_size, self.difficulty) + 1)
        return input('Select a column from 1 to ' + str(board_size) + ': ')
