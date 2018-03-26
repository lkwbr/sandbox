#!/usr/env python

'''Reverse a linked list.

Time: O(n)
Space: O(1)
'''

class Node:
    def __init__(self, data, next = None):
        self.data = data
        self.next = next
    @staticmethod
    def reverse(node):
        assert isinstance(node, Node)
        prev = None
        while node is not None:
            tmp = node
            node = node.next
            tmp.next = prev
            prev = tmp
        return prev
    @staticmethod
    def display(node):
        assert isinstance(node, Node)
        while node is not None:
            print('%s -> ' % node.data, end = '')
            node = node.next
        print('_')

if __name__ == '__main__':
    e = Node('e')
    d = Node('d', e)
    c = Node('c', d)
    b = Node('b', c)
    a = Node('a', b)
    Node.display(a)
    a = Node.reverse(a)
    Node.display(a)
