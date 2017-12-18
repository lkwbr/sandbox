#!/usr/bin/env python

'''Circular doubly linked list three-part coding prompt coming from a chill
`http://interviewing.io` interviewer.'''

# Circular doubly linked list
class Node:
    prev_node = None
    next_node = None
    def __init__(self, data):
        self.data = data

# Problem 1
# Given the head of a circular doubly linked list, print the contents of that
# list starting with the head, in forward and reverse order.
def print_cdll(head_node):
    '''Print linked list both forwards and backwards.'''
    if not head_node:
        print('[Empty LL]')
        return
    print(head_node.data, end = '|')
    curr_node = head_node.next_node
    while curr_node is not head_node:
        print(curr_node.data, end = '|')
        curr_node = curr_node.next_node
    print('\n===\n', end = '')
    tail_node = head_node.prev_node
    print(tail_node.data, end = '|')
    curr_node = tail_node.prev_node
    while curr_node is not tail_node:
        print(curr_node.data, end = '|')
        curr_node = curr_node.prev_node
    print('\n')

# Problem 2
# Given the heads of two circular doubly linked lists, append the second list
# to the first and return the head of the resulting list
def append_two(head1, head2):
    '''Append two linked lists together by mending the correct heads and tails
    together.'''
    if not head1:
        return head2
    if not head2:
        return head1
    tail1 = head1.prev_node
    tail2 = head2.prev_node
    tail1.next_node = head2
    tail2.next_node = head1
    head1.prev_node = tail2
    head2.prev_node = tail1
    return head1

# Problem 3:
# Given a binary tree, convert it to a circular doubly linked list (in place)
# and return the head of that list. For an example:
# Input:
#       5
#    /      \
#   3        7
#  / \      / \
# 2   4    6   8
# Result: 2<->3<->4<->5<->6<->7<->8[<->2]
def tree_to_list(root):
    '''Convert a tree to a list using a recursive approach. From the bottom up,
    we recursively transform each "tree" node into a "linked list" node, and
    merge this node with each of its new LL child nodes.'''
    # Base case (searched past leaf).
    if not root:
        return None
    # Traverse child branches and grab head node from the LL
    # created on this branch.
    left_head = tree_to_list(root.prev_node)
    right_head = tree_to_list(root.next_node)
    # Convert single root node to LL.
    root.prev_node = root
    root.next_node = root
    # Merge root and child LLs into one LL, maintaining
    # and returning reference to head.
    mid_head = append_two(root, right_head)
    total_head = append_two(left_head, head)
    return total_head

# Tree test
n1 = Node(1)
n2 = Node(2)
n3 = Node(3)
n4 = Node(4)
n5 = Node(5)
n6 = Node(6)
n7 = Node(7)
n8 = Node(8)
n5.prev_node = n3
n5.next_node = n7
n3.prev_node = n2
n3.next_node = n4
n7.prev_node = n6
n7.next_node = n8
result = tree_to_list(n5)
print_cdll(result)
print('---')

# Regular linked list test
n9 = Node(9)
n10 = Node(10)
n11 = Node(11)
n9.prev_node = n11
n9.next_node = n10
n10.prev_node = n9
n10.next_node = n11
n11.prev_node = n10
n11.next_node = n9
#print_cdll(n9)
