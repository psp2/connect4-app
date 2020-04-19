import random
from AI import choose_column, choose_worst_column
from color import print_red, print_blue

class Player:

    def __init__(self, name, color, difficulty=6, reverse=False, mayhem=False):
        self.name = name
        self.color = color
        self.difficulty = difficulty
        self.reverse = reverse
        self.mayhem = mayhem

    def players_turn(self):
        statement = "It is " + self.name + "'s turn\n"
        if self.color == 1:
            print_red(statement, '')
        else:
            print_blue(statement, '')


    def choose_input(self, board, board_size):
        if self.name == 'AI' and not self.reverse:
            return str(choose_column(board, board_size, self.difficulty) + 1)
        elif self.name == 'AI' and self.reverse:
            return str(choose_worst_column(board, board_size, self.difficulty) + 1)
        elif self.name == 'AI' and self.mayhem:
            rand_selection = random.randint(1, board_size+1)
            return str(rand_selection)
        elif self.name != 'AI' and self.mayhem:
            rand_num = random.randint(1, 1000)
            print('A secret number has been selected from 1 to 1000.')
            player_input = input('Select a MOD number between 1 and ' + str(board_size) + ': ')
            return str((rand_num % int(player_input)) + 1)
        return input('Select a column from 1 to ' + str(board_size) + ': ')
