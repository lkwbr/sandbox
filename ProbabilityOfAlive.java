/*
   PROMPT
      There is an island which is represented by square matrix NxN.
      A person on the island is standing at any given co-ordinates (x,y). He can move in any direction one step right, left, up, down on the island. If he steps outside the island, he dies.

      Let island is represented as (0,0) to (N-1,N-1) (i.e NxN matrix) & person is standing at given co-ordinates (x,y). He is allowed to move n steps on the island (along the matrix). What is the probability that he is alive after he walks n steps on the island?

      Write a psuedocode & then full code for function
      " float probabilityofalive(int x,int y, int n) ".

   SOURCE
      http://www.careercup.com/question?id=15556758
 */

import java.util.*;

class ProbabilityOfAlive
{

public static HashMap<String, Boolean> visited;

/* ISLAND
      _ = flattened ground
      | = untreked terrain
      ^ = current position
*/
public static void printIsland(int x, int y, int N) {
        for (int i = 0; i < N; i++) {
             // Col nums
                if (i == 0) {
                      System.out.print("  ");
                        for (int j = 0; j < N; j++)
                                System.out.print(" " + j + " ");
                        System.out.println();
                }
                // Row num
                System.out.print(i + " ");
                for (int j = 0; j < N; j++) {
                        char posChar = '|';
                        if (visited.containsKey(i + "," + j)) posChar = '_';
                        if ((i == x) && (j == y)) posChar = '^';     // Current position
                        System.out.print(" " + posChar + " ");
                }
                System.out.println();     // Newline
        }
}

public static void printVisited() {
      Iterator it = visited.entrySet().iterator();
      while (it.hasNext()) {
             Map.Entry pair = (Map.Entry)it.next();
             System.out.println(pair.getKey() + " = " + pair.getValue());
             it.remove(); // avoids a ConcurrentModificationException
      }
}

public static double probabilityOfAlive(int x, int y, int N, int n)
{
        if (x < 0 || x > (N - 1) || y < 0 || y > (N - 1) || N < 1) return 0.0;
        //printIsland(x, y, N);
        return probabilityOfAlive(x, y, N, n, new HashMap<String, Double>());
}

private static double probabilityOfAlive(int x, int y, int N, int step, HashMap<String, Double> map)
{
        // Prints each step from each branch
        //printIsland(x, y, N);
        //System.out.println();

        // Know we've visited this node
        visited.put((x + "," + y), true);

        if (0 == step) return 1.0;

        // If the state is already calculated, return from HashMap
        String key = "";
        {
                StringBuffer sb = new StringBuffer();
                sb.append(x + ",");
                sb.append(y + ",");
                sb.append(step);
                key = sb.toString();
        }
        if (map.containsKey(key)) return map.get(key);

        // calculate the probability of a state
        double probability = 0.0;
        if (x > 0) probability += 0.25 * probabilityOfAlive(x - 1, y, N, step - 1, map);
        if (x < (N - 1)) probability += 0.25 * probabilityOfAlive(x + 1, y, N, step - 1, map);
        if (y > 0) probability += 0.25 * probabilityOfAlive(x, y - 1, N, step - 1, map);
        if (y < (N - 1)) probability += 0.25 * probabilityOfAlive(x, y + 1, N, step - 1, map);

        // Save result to HashMap and return
        map.put(key, probability);
        return probability;
}

public static String getString(String prompt) {
      System.out.print(prompt + ": ");
      Scanner input = new Scanner(System.in);
      return input.nextLine();
}

// Gets integer from console input
public static int getInt(String prompt) {
        int val;
        val = Integer.parseInt(getString(prompt));
        return val;
}

public static char getChar(String prompt) {
      char val;
      val = getString(prompt).charAt(0);
      return val;
}

public static void main(String[] args)
{
        visited = new HashMap<String, Boolean>();
        // Get island and islander attributes
        int N = getInt("Size of island"), x = getInt("X coordinate"), y = getInt("Y coordinate"), n = getInt("Number of steps");
        System.out.println("Probability of being alive: " + probabilityOfAlive(x, y, N, n));
        printIsland(x, y, N);
        //printVisited();

        char val = getChar("Again? (Y/n)");
        if (Character.toLowerCase(val) == 'y') main(args);
        return;
}
}
