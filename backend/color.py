def print_red(string: str, end: str):
    print('\033[91m{}\033[00m'.format(string), end=end)


def print_blue(string: str, end: str):
    print('\033[94m{}\033[00m'.format(string), end=end)
