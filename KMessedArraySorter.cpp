// K-Messed Array Sorter
// ---
// Problem: Given an (originally) sorted array, each item is then displaced at most k
// spots, and at least 0 spots
// Solution: Use min-heap sort on a "sliding window" of k items to achieve O(n*log(k)),
// with a space complexity of O(k+1) --> O(1)
// ---
// Code written by Luke Weber

#include <stdlib.h>
#include <math.h>
#include <iostream>
#include <queue>
using namespace std;

int *create_k_messed_arr(int size, int k);
int k_messed_heap_sort(int **arr, int size, int k);
int print_arr(int *arr, int len, char *name);

// Used for min-heap!
struct comparator 
{
	bool operator()(int i, int j) 
	{ return i > j; }
};	

int main() 
{
	// Init random seed
	srand(time(NULL));

	// Create k-messed array array
	int arr_size = 10, k = 2;
	int *arr = create_k_messed_arr(arr_size, k);

	// Sort it
	k_messed_heap_sort(&arr, arr_size, k);

	return 0;
}

int k_messed_heap_sort(int **arr, int size, int k)
{
	cout << endl << "K-messed sorting:" << endl;

	// Setup min-heap (size k)
	priority_queue<int, std::vector<int>, comparator> min_heap;
	for (int i = 0; i < (k + 1); i++)
	{ min_heap.push(arr[0][i]); } 	

	// Slide k-size heap across whole array
	int el, new_i;	
	for (int i = 0; i < size; i++)
	{
		// Popoff minimum of heap
		el = min_heap.top(); min_heap.pop();
		arr[0][i] = el;

		// Add new element to heap
		new_i = i + (k + 1);
		if (new_i < size) 
		{ min_heap.push(arr[0][new_i]); }
	}

	// Print	
	print_arr(*arr, size, "Heap sorted: ");	
}

int *create_k_messed_arr(int size, int k)
{
	// First: create normally sorted array
	// NOTE: Had to be dynamically allocated in order to be
	// accessed outside of this function
	int *arr = (int*) malloc(sizeof(int) * size);
	int el = rand() % 100;

	for (int i = 0; i < size; i++)
	{
		arr[i] = el;

		// Distance between adjacent (sorted)
		// elements in range [0, 9] 
		el += rand() % 10; 
	}

	// Print
	print_arr(arr, size, "Original");

	// K, mess it up!
	int arr_flags[size] = {}, temp;
	for (int i = 0; i < size; i++)
	{
		// Find swap location (within bounds)
		int j, d;
		do
		{
			// Distance to move ith element, [-k, k]
			d = pow(-1, (rand() % 2)) * (rand() % k + 1); 
			j = i + d;
		}
		while ((j < 0) || (j >= size));

		// Pass if shit's already swapped here, or nothing to swap
		if ((j == i) || (arr_flags[i] != 0) || (arr_flags[j] != 0)) { continue; }

		// Flag
		arr_flags[i] = 1; arr_flags[j] = 1;

		// Swap
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}

	// Print
	print_arr(arr, size, "K-messed");

	return arr;
}

int print_arr(int *arr, int len, char *name)
{
	cout << name << ": ";
	for (int i = 0; i < len; i++)
	{ cout << arr[i] << ","; }
	cout << endl;
}
