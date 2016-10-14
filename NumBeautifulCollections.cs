// NUMBER OF BEAUTIFUL COLLECTIONS
// -----------------------------------------------------
// Returns number of collections of size n, 
// such that for every index i, the corresponding
// value x_i must have either of the conditions
// be true:
//		- x_i is divisible by i
//		- i is divisible by x_i
//
// e.g. For n = 3, the number of beautiful collections
// would be 3 (note that collection has 1-based indexes):
//	1.	x =	[1, 2, 3]
//		i =	 1, 2, 3
//	2.	x =	[2, 1, 3]
//		i =	 1, 2, 3
//	3.	x =	[3, 2, 1]
//		i =	 1, 2, 3
// -----------------------------------------------------
public static int getNumBeauColls (int n)
{
	return getNumBeauColls(n, Enumerable.Range(1, n).ToList());
}
public static int getNumBeauColls (int i, List<int> unused)
{
	// Terminating condition; means we've gone from index n to 1,
	// so we've found a beautiful collection :)
	if (i == 0) return 1;

	// Sum all branches together
	int numBeauColls = 0;
	foreach (var y in unused) 
	{
		if (isBeauPair(y, i)) {
			// Go down a level to create another
			// branch of possible collections where
			// the i-th number in it is y
			numBeauColls += getNumBeauColls(
				(i - 1), 
				// LINQ to create new "unused" list
				// without value of y in there
				unused.Where(x=>x != y).ToList()
			); 
		}
	}
	return numBeauColls;
}
// See if given data and index are good match for collection
public static bool isBeauPair(int x, int i)
{
	if (x % i == 0 ||
		i % x == 0) return true;
	return false;
}
