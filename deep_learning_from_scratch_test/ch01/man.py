class Man:
    def __init__(self, name):
        self.name = name
        print('initialized!')

    def hello(self):
        print('hello'+ self.name + '!')

    def goodbye(self):
        print('good-bye' + self.name +'!')

m = Man('David')
m.hello()
m.goodbye()
