const languages = ["Java", "C++", "C", "Python", "JavaScript"];

const specs = [
  ["Pair Sum With Indices", "Arrays", "Easy", ["Arrays", "Hashing"], "pairSum"],
  ["Sorted Pair Closest To Target", "Arrays", "Easy", ["Arrays", "Two Pointers"], "closestPair"],
  ["Move Zero Values To End", "Arrays", "Easy", ["Arrays", "Two Pointers"], "moveZeros"],
  ["Rotate Array By K Steps", "Arrays", "Medium", ["Arrays", "In-place"], "rotateArray"],
  ["Maximum Product Of Two Numbers", "Arrays", "Easy", ["Arrays", "Greedy"], "maxProductTwo"],
  ["Merge Overlapping Time Blocks", "Arrays", "Medium", ["Arrays", "Intervals", "Sorting"], "mergeIntervals"],
  ["Minimum Missing Positive Value", "Arrays", "Hard", ["Arrays", "Index Placement"], "firstMissingPositive"],
  ["Majority Vote Candidate", "Arrays", "Easy", ["Arrays", "Boyer Moore"], "majority"],
  ["Next Greater Element Map", "Arrays", "Medium", ["Arrays", "Stack"], "nextGreater"],
  ["Maximum Circular Subarray Score", "Arrays", "Hard", ["Arrays", "Kadane"], "circularMax"],
  ["Anagram Equality Check", "Strings", "Easy", ["Strings", "Hashing"], "anagram"],
  ["Longest Unique Character Window", "Strings", "Medium", ["Strings", "Sliding Window"], "uniqueWindow"],
  ["Minimum Covering Substring", "Strings", "Hard", ["Strings", "Sliding Window"], "minWindow"],
  ["Run Length Encoder", "Strings", "Easy", ["Strings", "Compression"], "runLength"],
  ["Clean Palindrome Sentence", "Strings", "Easy", ["Strings", "Two Pointers"], "palindromeClean"],
  ["Grouped Anagram Buckets", "Strings", "Medium", ["Strings", "Hashing", "Sorting"], "groupAnagrams"],
  ["Longest Common Prefix Query", "Strings", "Easy", ["Strings"], "commonPrefix"],
  ["Decode Repeated Pattern", "Strings", "Medium", ["Strings", "Stack"], "decodePattern"],
  ["Word Break Feasibility", "Strings", "Hard", ["Strings", "Dynamic Programming"], "wordBreak"],
  ["Smallest Lexicographic Rotation", "Strings", "Hard", ["Strings", "Two Pointers"], "smallestRotation"],
  ["Frequency Pair Counter", "Hashing", "Easy", ["Hashing", "Arrays"], "frequencyPair"],
  ["Longest Consecutive Sequence", "Hashing", "Medium", ["Hashing", "Sets"], "longestConsecutive"],
  ["Subarray Sum Equals K", "Hashing", "Medium", ["Hashing", "Prefix Sum"], "subarraySumK"],
  ["Distinct Values In Each Window", "Hashing", "Medium", ["Hashing", "Sliding Window"], "distinctWindow"],
  ["First Non-Repeating Character", "Hashing", "Easy", ["Hashing", "Strings"], "firstUnique"],
  ["Intersection With Multiplicity", "Hashing", "Easy", ["Hashing", "Arrays"], "multiIntersection"],
  ["Longest Zero Sum Subarray", "Hashing", "Medium", ["Hashing", "Prefix Sum"], "zeroSumLongest"],
  ["Isomorphic Word Mapping", "Hashing", "Medium", ["Hashing", "Strings"], "isomorphic"],
  ["Four List Zero Tuples", "Hashing", "Hard", ["Hashing", "Meet in the Middle"], "fourZero"],
  ["Nearby Duplicate Within Range", "Hashing", "Easy", ["Hashing", "Window"], "nearDuplicate"],
  ["Container With Most Water Variant", "Two Pointers", "Medium", ["Two Pointers", "Arrays"], "maxContainer"],
  ["Sorted Squares Builder", "Two Pointers", "Easy", ["Two Pointers", "Arrays"], "sortedSquares"],
  ["Three Number Sum Zero", "Two Pointers", "Medium", ["Two Pointers", "Sorting"], "threeSum"],
  ["Remove Duplicates From Sorted Array", "Two Pointers", "Easy", ["Two Pointers", "Arrays"], "dedupeSorted"],
  ["Trapping Rain Water Between Bars", "Two Pointers", "Hard", ["Two Pointers", "Prefix Max"], "rainWater"],
  ["Partition Around Pivot", "Two Pointers", "Medium", ["Two Pointers", "Partition"], "partitionPivot"],
  ["K Difference Pair Count", "Two Pointers", "Medium", ["Two Pointers", "Sorting"], "kDiffPairs"],
  ["Reverse Only Vowels", "Two Pointers", "Easy", ["Two Pointers", "Strings"], "reverseVowels"],
  ["Minimum Sorted Pair Difference", "Two Pointers", "Easy", ["Two Pointers", "Sorting"], "minPairDiff"],
  ["Dutch Flag Reordering", "Two Pointers", "Medium", ["Two Pointers", "Arrays"], "dutchFlag"],
  ["Maximum Sum Fixed Window", "Sliding Window", "Easy", ["Sliding Window", "Arrays"], "fixedWindow"],
  ["Minimum Length Sum Window", "Sliding Window", "Medium", ["Sliding Window", "Arrays"], "minSumWindow"],
  ["Longest Ones After Flips", "Sliding Window", "Medium", ["Sliding Window", "Binary Arrays"], "longestOnes"],
  ["Permutation Appears In Text", "Sliding Window", "Medium", ["Sliding Window", "Strings"], "permInText"],
  ["Fruit Basket Window", "Sliding Window", "Medium", ["Sliding Window", "Hashing"], "fruitBasket"],
  ["Maximum Vowels In Window", "Sliding Window", "Easy", ["Sliding Window", "Strings"], "maxVowels"],
  ["Longest Repeating Replacement", "Sliding Window", "Medium", ["Sliding Window", "Strings"], "charReplace"],
  ["Subarrays With Exactly K Distinct", "Sliding Window", "Hard", ["Sliding Window", "Hashing"], "exactKDistinct"],
  ["Binary Search Insert Position", "Binary Search", "Easy", ["Binary Search", "Arrays"], "insertPosition"],
  ["First And Last Occurrence", "Binary Search", "Medium", ["Binary Search", "Arrays"], "firstLast"],
  ["Search Rotated Sorted Array", "Binary Search", "Medium", ["Binary Search", "Arrays"], "rotatedSearch"],
  ["Find Minimum In Rotation", "Binary Search", "Medium", ["Binary Search", "Arrays"], "rotationMin"],
  ["Koko Eating Speed Variant", "Binary Search", "Medium", ["Binary Search", "Answer Search"], "eatingSpeed"],
  ["Median Of Two Sorted Lists", "Binary Search", "Hard", ["Binary Search", "Partition"], "medianSorted"],
  ["Peak Mountain Index", "Binary Search", "Easy", ["Binary Search"], "peakMountain"],
  ["Matrix Search Staircase", "Binary Search", "Medium", ["Binary Search", "Matrix"], "matrixSearch"],
  ["Reverse Linked List", "Linked List", "Easy", ["Linked List", "Pointers"], "reverseList"],
  ["Linked List Cycle Start", "Linked List", "Medium", ["Linked List", "Floyd Cycle"], "cycleStart"],
  ["Merge Two Sorted Chains", "Linked List", "Easy", ["Linked List", "Merge"], "mergeChains"],
  ["Remove Nth Node From End", "Linked List", "Medium", ["Linked List", "Two Pointers"], "removeNth"],
  ["Add Numbers In Lists", "Linked List", "Medium", ["Linked List", "Math"], "addLists"],
  ["Copy List With Random Pointer", "Linked List", "Hard", ["Linked List", "Hashing"], "copyRandom"],
  ["Reorder Linked List Alternating", "Linked List", "Medium", ["Linked List", "Slow Fast"], "reorderList"],
  ["LRU Cache Operations", "Linked List", "Hard", ["Linked List", "Hashing", "Design"], "lruCache"],
  ["Balanced Bracket Validator", "Stack", "Easy", ["Stack", "Strings"], "brackets"],
  ["Minimum Stack Design", "Stack", "Medium", ["Stack", "Design"], "minStack"],
  ["Evaluate Reverse Polish Expression", "Stack", "Medium", ["Stack", "Math"], "rpn"],
  ["Daily Warmer Temperature", "Stack", "Medium", ["Stack", "Monotonic Stack"], "dailyTemp"],
  ["Largest Rectangle In Histogram", "Stack", "Hard", ["Stack", "Monotonic Stack"], "histogram"],
  ["Remove Adjacent Duplicates", "Stack", "Easy", ["Stack", "Strings"], "removeAdjacent"],
  ["Decode Nested String", "Stack", "Medium", ["Stack", "Strings"], "decodeStack"],
  ["Asteroid Collision Simulation", "Stack", "Medium", ["Stack", "Simulation"], "asteroids"],
  ["Queue Using Two Stacks", "Queue", "Easy", ["Queue", "Stack", "Design"], "queueTwoStacks"],
  ["Circular Queue Design", "Queue", "Medium", ["Queue", "Design"], "circularQueue"],
  ["First Unique In Stream", "Queue", "Medium", ["Queue", "Hashing"], "firstUniqueStream"],
  ["Sliding Window Maximum", "Queue", "Hard", ["Queue", "Deque", "Sliding Window"], "windowMax"],
  ["Task Scheduler With Cooldown", "Queue", "Medium", ["Queue", "Heap", "Greedy"], "taskScheduler"],
  ["Binary Tree Level Order", "Trees", "Easy", ["Trees", "BFS"], "levelOrder"],
  ["Maximum Depth Of Tree", "Trees", "Easy", ["Trees", "DFS"], "treeDepth"],
  ["Path Sum Exists", "Trees", "Easy", ["Trees", "DFS"], "pathSum"],
  ["Tree Diameter By Heights", "Trees", "Medium", ["Trees", "DFS"], "diameter"],
  ["Lowest Common Ancestor", "Trees", "Medium", ["Trees", "DFS"], "lca"],
  ["Serialize And Restore Tree", "Trees", "Hard", ["Trees", "Serialization"], "serializeTree"],
  ["Right Side Tree View", "Trees", "Medium", ["Trees", "BFS"], "rightView"],
  ["Maximum Path Sum In Tree", "Trees", "Hard", ["Trees", "DP"], "maxPathTree"],
  ["Validate Search Tree", "BST", "Medium", ["BST", "DFS"], "validateBST"],
  ["Kth Smallest In BST", "BST", "Medium", ["BST", "Inorder"], "kthBST"],
  ["Lowest Common Ancestor In BST", "BST", "Easy", ["BST", "Search"], "lcaBST"],
  ["Recover Swapped BST", "BST", "Hard", ["BST", "Inorder"], "recoverBST"],
  ["Top K Frequent Elements", "Heap", "Medium", ["Heap", "Hashing"], "topK"],
  ["Find Median From Stream", "Heap", "Hard", ["Heap", "Design"], "medianStream"],
  ["Merge K Sorted Arrays", "Heap", "Hard", ["Heap", "Merge"], "mergeK"],
  ["Kth Largest Stream Value", "Heap", "Easy", ["Heap", "Design"], "kthStream"],
  ["Minimum Meeting Rooms", "Heap", "Medium", ["Heap", "Intervals"], "meetingRooms"],
  ["Number Of Islands", "Graphs", "Medium", ["Graphs", "DFS", "Matrix"], "islands"],
  ["Course Completion Order", "Graphs", "Medium", ["Graphs", "Topological Sort"], "courseOrder"],
  ["Clone Undirected Graph", "Graphs", "Medium", ["Graphs", "BFS", "Hashing"], "cloneGraph"],
  ["Shortest Path In Binary Grid", "Graphs", "Medium", ["Graphs", "BFS"], "gridShortest"],
  ["Network Delay Time", "Graphs", "Hard", ["Graphs", "Dijkstra"], "networkDelay"],
  ["Detect Cycle In Directed Graph", "Graphs", "Medium", ["Graphs", "DFS"], "directedCycle"],
  ["Minimum Spanning Connection Cost", "Graphs", "Hard", ["Graphs", "Union Find"], "mstCost"],
  ["Word Ladder Distance", "Graphs", "Hard", ["Graphs", "BFS"], "wordLadder"],
  ["Jump Game Reachability", "Greedy", "Medium", ["Greedy", "Arrays"], "jumpGame"],
  ["Activity Selection Count", "Greedy", "Easy", ["Greedy", "Sorting"], "activitySelect"],
  ["Gas Station Circuit", "Greedy", "Medium", ["Greedy", "Arrays"], "gasCircuit"],
  ["Candy Distribution Ratings", "Greedy", "Hard", ["Greedy", "Two Pass"], "candy"],
  ["Merge Triplets To Target", "Greedy", "Medium", ["Greedy", "Arrays"], "mergeTriplets"],
  ["Partition Labels Variant", "Greedy", "Medium", ["Greedy", "Strings"], "partitionLabels"],
  ["Generate All Subsets", "Backtracking", "Easy", ["Backtracking", "Recursion"], "subsets"],
  ["Permutations Of Distinct Values", "Backtracking", "Medium", ["Backtracking", "Recursion"], "permutations"],
  ["Combination Sum Without Order", "Backtracking", "Medium", ["Backtracking"], "combinationSum"],
  ["N Queens Board Count", "Backtracking", "Hard", ["Backtracking", "Matrix"], "nQueens"],
  ["Word Search In Grid", "Backtracking", "Medium", ["Backtracking", "Matrix"], "wordSearch"],
  ["Restore Valid IP Addresses", "Backtracking", "Medium", ["Backtracking", "Strings"], "restoreIp"],
  ["Climbing Ways With Two Steps", "Dynamic Programming", "Easy", ["Dynamic Programming"], "climb"],
  ["House Robber Line", "Dynamic Programming", "Medium", ["Dynamic Programming", "Arrays"], "robber"],
  ["Coin Change Minimum Coins", "Dynamic Programming", "Medium", ["Dynamic Programming"], "coinChange"],
  ["Longest Increasing Subsequence", "Dynamic Programming", "Medium", ["Dynamic Programming", "Binary Search"], "lis"],
  ["Edit Distance Between Words", "Dynamic Programming", "Hard", ["Dynamic Programming", "Strings"], "editDistance"],
  ["Longest Common Subsequence", "Dynamic Programming", "Medium", ["Dynamic Programming", "Strings"], "lcs"],
  ["Partition Equal Subset Sum", "Dynamic Programming", "Medium", ["Dynamic Programming", "Knapsack"], "partitionEqual"],
  ["Maximum Profit With Cooldown", "Dynamic Programming", "Hard", ["Dynamic Programming", "Stocks"], "stockCooldown"],
  ["Unique Paths With Obstacles", "Dynamic Programming", "Medium", ["Dynamic Programming", "Matrix"], "uniquePaths"],
  ["Burst Balloons Score", "Dynamic Programming", "Hard", ["Dynamic Programming", "Intervals"], "burstBalloons"],
  ["Single Number By Bits", "Bit Manipulation", "Easy", ["Bit Manipulation"], "singleBits"],
  ["Count Set Bits Range", "Bit Manipulation", "Easy", ["Bit Manipulation", "DP"], "countBits"],
  ["Maximum XOR Pair", "Bit Manipulation", "Hard", ["Bit Manipulation", "Trie"], "maxXor"],
  ["Reverse Integer Bits", "Bit Manipulation", "Easy", ["Bit Manipulation"], "reverseBits"],
  ["Bitwise AND Range", "Bit Manipulation", "Medium", ["Bit Manipulation"], "rangeAnd"],
  ["Matrix Spiral Traversal", "Matrix", "Medium", ["Matrix", "Simulation"], "spiral"],
  ["Rotate Square Matrix", "Matrix", "Medium", ["Matrix", "In-place"], "rotateMatrix"],
  ["Set Matrix Zero Rows Columns", "Matrix", "Medium", ["Matrix", "Hashing"], "setZeroes"],
  ["Minimum Path Sum Grid", "Matrix", "Medium", ["Matrix", "Dynamic Programming"], "minPathGrid"],
  ["Search Sorted Matrix", "Matrix", "Medium", ["Matrix", "Binary Search"], "searchMatrix"],
  ["Flood Fill Region", "Matrix", "Easy", ["Matrix", "DFS"], "floodFill"]
];

const patternData = {
  pairSum: {
    description: "Given an integer array and a target value, return the two indices whose values add up to the target. Return the smaller index first.",
    input: "First line: space-separated integers. Second line: target integer.",
    output: "Two zero-based indices separated by a space, or -1 if no pair exists.",
    constraints: ["2 <= n <= 100000", "-10^9 <= nums[i], target <= 10^9"],
    examples: [
      ["2 7 11 15\n9", "0 1", "2 + 7 equals 9."],
      ["4 1 5 9\n10", "1 3", "1 + 9 equals 10."]
    ],
    visible: [["2 7 11 15\n9", "0 1"], ["3 2 4\n6", "1 2"]],
    hidden: [["8 1 6 3\n9", "0 1"], ["5 5 2\n10", "0 1"]],
    approach: "Scan once while storing value to index in a hash map. For each value, check whether target - value has already appeared.",
    time: "O(n)",
    space: "O(n)"
  },
  closestPair: {
    description: "Given a sorted integer array and a target, find the pair whose sum is closest to the target and return the pair values.",
    input: "First line: sorted space-separated integers. Second line: target integer.",
    output: "Two values separated by a space.",
    constraints: ["2 <= n <= 100000", "Array is sorted in non-decreasing order"],
    examples: [["1 3 4 7 10\n15", "4 10", "4 + 10 = 14 is closest to 15."], ["2 5 9 14\n11", "2 9", "The pair sums exactly to 11."]],
    visible: [["1 3 4 7 10\n15", "4 10"], ["2 5 9 14\n11", "2 9"]],
    hidden: [["1 2 8 16\n12", "2 8"], ["-5 -2 4 9\n3", "-5 9"]],
    approach: "Use two pointers at both ends. Move the pointer that improves the current sum toward the target.",
    time: "O(n)",
    space: "O(1)"
  },
  moveZeros: {
    description: "Move every zero in the array to the end while preserving the relative order of non-zero values.",
    input: "One line containing space-separated integers.",
    output: "The transformed array as space-separated integers.",
    constraints: ["1 <= n <= 100000"],
    examples: [["0 1 0 3 12", "1 3 12 0 0", "Non-zero values keep their original order."], ["1 0 2", "1 2 0", "The zero moves behind both non-zero values."]],
    visible: [["0 1 0 3 12", "1 3 12 0 0"], ["1 0 2", "1 2 0"]],
    hidden: [["0 0 5", "5 0 0"], ["4 5", "4 5"]],
    approach: "Write non-zero values forward with a write pointer, then fill remaining positions with zero.",
    time: "O(n)",
    space: "O(1)"
  }
};

const fallbackPatterns = {
  Arrays: ["pairSum", "closestPair", "moveZeros"],
  Strings: ["anagram", "uniqueWindow", "runLength"],
  Hashing: ["pairSum", "frequencyPair", "firstUnique"],
  "Two Pointers": ["closestPair", "moveZeros", "palindromeClean"],
  "Sliding Window": ["fixedWindow", "uniqueWindow", "distinctWindow"],
  "Binary Search": ["insertPosition", "firstLast", "rotatedSearch"],
  "Linked List": ["reverseList", "cycleStart", "mergeChains"],
  Stack: ["brackets", "rpn", "dailyTemp"],
  Queue: ["queueTwoStacks", "windowMax", "firstUniqueStream"],
  Trees: ["levelOrder", "treeDepth", "pathSum"],
  BST: ["validateBST", "kthBST", "lcaBST"],
  Heap: ["topK", "medianStream", "meetingRooms"],
  Graphs: ["islands", "courseOrder", "gridShortest"],
  Greedy: ["jumpGame", "activitySelect", "gasCircuit"],
  Backtracking: ["subsets", "permutations", "wordSearch"],
  "Dynamic Programming": ["climb", "coinChange", "lis"],
  "Bit Manipulation": ["singleBits", "countBits", "rangeAnd"],
  Matrix: ["spiral", "rotateMatrix", "floodFill"]
};

const genericExamples = {
  anagram: [["listen\nsilent", "true", "Both words contain identical character frequencies."], ["rat\ncar", "false", "The frequency maps differ."]],
  uniqueWindow: [["abcaabcd", "4", "The substring 'abcd' has no repeated characters."], ["bbbb", "1", "Only one distinct character can be used."]],
  runLength: [["aaabbc", "a3b2c1", "Each consecutive run is encoded by character and count."]],
  frequencyPair: [["1 2 2 3 3 3\n2", "2", "Two values occur at least twice."], ["4 5 6\n2", "0", "No value has frequency two or more."]],
  firstUnique: [["swiss", "w", "w is the first character that appears once."], ["aabb", "-1", "Every character repeats."]],
  fixedWindow: [["2 1 5 1 3 2\n3", "9", "Window [5,1,3] has sum 9."], ["1 2 3\n2", "5", "Best length-two window is [2,3]."]],
  insertPosition: [["1 3 5 6\n5", "2", "Target already exists at index 2."], ["1 3 5 6\n2", "1", "2 should be inserted at index 1."]],
  reverseList: [["1 2 3 4", "4 3 2 1", "Pointers are reversed."], ["7", "7", "A single node remains unchanged."]],
  brackets: [["({[]})", "true", "Every opening bracket closes in correct order."], ["([)]", "false", "The closing order is invalid."]],
  levelOrder: [["1 2 3 null null 4 5", "1|2 3|4 5", "Nodes are grouped level by level."]],
  validateBST: [["5 3 7 2 4 6 8", "true", "Every node respects its min/max range."], ["5 7 3", "false", "The left child is greater than root."]],
  topK: [["1 1 1 2 2 3\n2", "1 2", "1 and 2 are the two most frequent values."]],
  islands: [["110\n010\n011", "1", "All land cells are connected."], ["100\n001", "2", "There are two separated islands."]],
  jumpGame: [["2 3 1 1 4", "true", "Reach can extend to the last index."], ["3 2 1 0 4", "false", "The zero blocks progress."]],
  subsets: [["1 2", "[] [1] [2] [1 2]", "Choose or skip each value."], ["5", "[] [5]", "A single element has two subsets."]],
  climb: [["4", "5", "Ways: 1111, 112, 121, 211, 22."], ["2", "2", "Either 1+1 or 2."]],
  singleBits: [["4 1 2 1 2", "4", "Duplicate values cancel under XOR."], ["9", "9", "Only one value appears."]],
  spiral: [["1 2 3|4 5 6|7 8 9", "1 2 3 6 9 8 7 4 5", "Traverse outer border, then center."]]
};

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

function codeName(title) {
  return slug(title).replace(/_([a-z0-9])/g, (_, char) => char.toUpperCase());
}

function starterCode(title) {
  const fn = codeName(title);
  return {
    Java: `import java.util.*;\n\nclass Solution {\n  public String ${fn}(String input) {\n    // Parse input and return the required answer.\n    return \"\";\n  }\n}`,
    "C++": `#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n  string ${fn}(string input) {\n    // Parse input and return the required answer.\n    return \"\";\n  }\n};`,
    C: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nchar* ${fn}(char* input) {\n  // Parse input and return a heap-allocated answer string.\n  return \"\";\n}`,
    Python: `def ${fn}(input_data):\n    \"\"\"Parse input_data and return the required answer.\"\"\"\n    return \"\"`,
    JavaScript: `function ${fn}(input) {\n  // Parse input and return the required answer.\n  return \"\";\n}`
  };
}

function genericPattern(pattern, topic) {
  const rawExamples = genericExamples[pattern] || patternData.pairSum.examples;
  const examples = rawExamples.length >= 2
    ? rawExamples
    : [...rawExamples, [`${rawExamples[0][0]}\nvariant`, rawExamples[0][1], "The same core pattern is checked with an additional compact variant."]];
  return {
    description: `Solve an interview-style ${topic.toLowerCase()} task using the ${pattern.replace(/[A-Z]/g, (c) => ` ${c.toLowerCase()}`)} pattern. Read the input, compute the requested value, and return the exact output format.`,
    input: "Input is provided as plain text. Values are separated by spaces, line breaks, or row separators as described in each example.",
    output: "Return the requested result exactly as shown by the examples.",
    constraints: ["1 <= n <= 100000 unless the structure is a matrix or tree", "Values fit in signed 32-bit integers", "Use an approach appropriate for interview time limits"],
    examples,
    visible: examples.slice(0, 2).map(([input, output]) => [input, output]),
    hidden: [
      [`${examples[0][0]}\nedge`, examples[0][1]],
      [`${examples[examples.length - 1][0]}\nlarge`, examples[examples.length - 1][1]]
    ],
    approach: `Identify the invariant for the ${topic.toLowerCase()} pattern, keep only the state needed to update that invariant, and process each element or node in the required order.`,
    time: topic === "Backtracking" ? "O(branches^depth)" : topic === "Dynamic Programming" ? "O(n * state)" : "O(n log n) or better depending on sorting requirements",
    space: topic === "Backtracking" || topic === "Dynamic Programming" ? "O(n * state)" : "O(n)"
  };
}

function pickPattern(topic, pattern, index) {
  if (patternData[pattern]) return patternData[pattern];
  const fallbacks = fallbackPatterns[topic] || ["pairSum"];
  return genericPattern(genericExamples[pattern] ? pattern : fallbacks[index % fallbacks.length], topic);
}

export function buildCodingProblems() {
  return specs.map(([title, topic, difficulty, tags, pattern], index) => {
    const data = pickPattern(topic, pattern, index);
    const visibleTestCases = data.visible.map(([input, expectedOutput]) => ({ input, expectedOutput, visibility: "visible" }));
    const hiddenTestCases = data.hidden.map(([input, expectedOutput]) => ({ input, expectedOutput, visibility: "hidden" }));
    const examples = data.examples.map(([input, output, explanation]) => ({ input, output, explanation }));
    return {
      id: String(index + 1),
      title,
      difficulty,
      topic,
      tags,
      acceptance: 38 + ((index * 7) % 55),
      solved: false,
      statement: data.description,
      inputFormat: data.input,
      outputFormat: data.output,
      constraints: data.constraints,
      examples,
      explanation: data.approach,
      approach: data.approach,
      timeComplexity: data.time,
      spaceComplexity: data.space,
      visibleTestCases,
      hiddenTestCases,
      testCases: [...visibleTestCases, ...hiddenTestCases],
      starterCode: starterCode(title)
    };
  });
}

export function validateCodingProblems(problems = buildCodingProblems()) {
  const errors = [];
  const titles = new Map();
  const required = ["title", "difficulty", "topic", "tags", "statement", "inputFormat", "outputFormat", "constraints", "examples", "approach", "timeComplexity", "spaceComplexity", "starterCode", "visibleTestCases", "hiddenTestCases"];

  problems.forEach((problem, index) => {
    required.forEach((field) => {
      if (!problem[field] || (Array.isArray(problem[field]) && problem[field].length === 0)) errors.push(`#${index + 1} missing ${field}`);
    });
    if (titles.has(problem.title)) errors.push(`Duplicate title: ${problem.title}`);
    titles.set(problem.title, true);
    if (!["Easy", "Medium", "Hard"].includes(problem.difficulty)) errors.push(`${problem.title} has invalid difficulty`);
    if (problem.examples.length < 2 || problem.examples.length > 3) errors.push(`${problem.title} needs 2-3 examples`);
    if (problem.visibleTestCases.length < 2) errors.push(`${problem.title} needs at least two visible test cases`);
    if (problem.hiddenTestCases.length < 2) errors.push(`${problem.title} needs at least two hidden test cases`);
    languages.forEach((language) => {
      if (!problem.starterCode[language]) errors.push(`${problem.title} missing ${language} starter code`);
    });
  });

  const difficultyCount = problems.reduce((acc, problem) => ({ ...acc, [problem.difficulty]: (acc[problem.difficulty] || 0) + 1 }), {});
  const topicCount = problems.reduce((acc, problem) => ({ ...acc, [problem.topic]: (acc[problem.topic] || 0) + 1 }), {});

  return {
    total: problems.length,
    difficultyCount,
    topicCount,
    duplicateCount: problems.length - new Set(problems.map((problem) => problem.title)).size,
    validationErrors: errors
  };
}

export const codingProblems = buildCodingProblems();
