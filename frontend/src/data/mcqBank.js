const technicalTopics = ["Java", "C/C++", "Python", "JavaScript", "React", "Node.js", "Express.js", "MongoDB", "SQL", "DBMS", "OOP", "Operating System", "Computer Networks", "Software Engineering", "Git/GitHub", "REST API", "HTML/CSS"];
const dsaTopics = ["Arrays", "Strings", "Linked List", "Stack/Queue", "Trees", "Graphs", "Searching", "Sorting", "Recursion", "Dynamic Programming", "Time & Space Complexity"];
const aptitudeTopics = ["Percentages", "Profit & Loss", "Ratio", "Average", "Time & Work", "Time, Speed & Distance", "Probability", "Permutation & Combination", "Number System"];
const reasoningTopics = ["Logical Reasoning", "Series", "Coding-Decoding", "Blood Relations", "Direction Sense", "Syllogism", "Puzzles"];
const generalTopics = ["General Knowledge", "Computer Fundamentals", "Science", "Government/Competitive Exam"];

const topicConcepts = {
  Java: ["JVM bytecode execution", "method overloading", "method overriding", "interface contract", "abstract class use", "exception hierarchy", "collections framework", "hashCode equals contract", "thread synchronization", "garbage collection", "final keyword", "access modifiers"],
  "C/C++": ["pointer arithmetic", "reference variable", "manual memory management", "constructor initialization", "virtual function dispatch", "copy constructor", "STL vector growth", "stack vs heap allocation", "const correctness", "operator overloading", "RAII cleanup", "header guards"],
  Python: ["list comprehension", "dictionary hashing", "generator laziness", "decorator wrapping", "GIL impact", "mutable default argument", "context manager", "tuple immutability", "lambda function", "exception handling", "module import", "virtual environment"],
  JavaScript: ["event loop", "closure scope", "prototype chain", "promise resolution", "async await flow", "hoisting behavior", "this binding", "strict equality", "array map/filter/reduce", "DOM event bubbling", "module export", "truthy falsy values"],
  React: ["component state", "props flow", "useEffect lifecycle", "useMemo caching", "controlled component", "key reconciliation", "context provider", "conditional rendering", "custom hook", "React Router navigation", "error boundary", "state lifting"],
  "Node.js": ["non-blocking I/O", "event-driven runtime", "CommonJS module", "stream processing", "process environment", "middleware pipeline", "package management", "file system async API", "buffer handling", "cluster scaling", "error-first callback", "JWT verification"],
  "Express.js": ["route handler", "middleware ordering", "error middleware", "request validation", "router modularization", "CORS handling", "body parser", "status code response", "query parameters", "route parameters", "authentication middleware", "REST controller"],
  MongoDB: ["document model", "ObjectId primary key", "index selection", "aggregation pipeline", "schema validation", "embedded documents", "reference relationship", "update operators", "text search", "replica set", "compound index", "Mongoose model"],
  SQL: ["SELECT projection", "WHERE filtering", "INNER JOIN", "LEFT JOIN", "GROUP BY aggregation", "HAVING clause", "ORDER BY sorting", "subquery", "index usage", "transaction commit", "normalization", "primary key"],
  DBMS: ["ACID properties", "normal forms", "transaction isolation", "deadlock handling", "indexing strategy", "ER modeling", "foreign key constraint", "concurrency control", "write ahead logging", "data redundancy", "view abstraction", "stored procedure"],
  OOP: ["encapsulation", "inheritance", "polymorphism", "abstraction", "composition", "interface segregation", "constructor", "method overriding", "association", "aggregation", "coupling", "cohesion"],
  "Operating System": ["process scheduling", "thread context switch", "deadlock conditions", "semaphore", "mutex", "paging", "virtual memory", "file system inode", "system call", "CPU scheduling", "critical section", "memory fragmentation"],
  "Computer Networks": ["TCP handshake", "UDP datagram", "DNS resolution", "HTTP request response", "IP addressing", "subnet mask", "routing", "congestion control", "TLS encryption", "OSI layers", "MAC address", "ARP lookup"],
  "Software Engineering": ["SDLC phases", "agile sprint", "unit testing", "integration testing", "requirements analysis", "design review", "code maintainability", "version control workflow", "CI pipeline", "technical debt", "UML diagram", "deployment rollback"],
  "Git/GitHub": ["commit snapshot", "branch workflow", "merge conflict", "pull request review", "rebase history", "stash changes", "remote origin", "git clone", "git fetch vs pull", "tag release", "fork contribution", "issue tracking"],
  "REST API": ["resource URI", "HTTP method semantics", "status code 201", "idempotency", "pagination", "rate limiting", "authentication header", "JSON payload", "PUT vs PATCH", "API versioning", "statelessness", "error response body"],
  "HTML/CSS": ["semantic HTML", "form label accessibility", "CSS specificity", "flexbox layout", "grid layout", "media query", "box model", "position absolute", "responsive image", "ARIA attribute", "pseudo class", "CSS variable"],
  Arrays: ["prefix sum", "two pointer scan", "in-place rotation", "Kadane maximum subarray", "frequency counting", "sliding window maximum", "partitioning", "merge intervals", "majority vote", "binary indexed position", "cyclic sort", "difference array"],
  Strings: ["palindrome check", "anagram frequency", "KMP prefix table", "rolling hash", "run length encoding", "substring window", "character replacement", "lexicographic ordering", "string builder", "trie lookup", "pattern matching", "case normalization"],
  "Linked List": ["slow fast pointer", "cycle detection", "node reversal", "dummy head", "merge sorted lists", "remove nth from end", "middle node", "list intersection", "random pointer copy", "reorder list", "tail insertion", "pointer relinking"],
  "Stack/Queue": ["monotonic stack", "valid parentheses", "min stack", "queue with stacks", "deque window", "BFS queue", "next greater element", "histogram stack", "expression evaluation", "circular queue", "producer consumer", "undo operation"],
  Trees: ["inorder traversal", "preorder traversal", "postorder traversal", "level order traversal", "tree height", "lowest common ancestor", "binary search tree property", "path sum", "diameter", "serialize tree", "balanced tree", "right side view"],
  Graphs: ["DFS traversal", "BFS traversal", "topological ordering", "cycle detection", "Dijkstra shortest path", "Union Find", "minimum spanning tree", "connected components", "bipartite check", "grid island DFS", "adjacency list", "in-degree count"],
  Searching: ["linear search", "binary search", "lower bound", "upper bound", "rotated array search", "answer space search", "peak element", "matrix search", "first occurrence", "last occurrence", "search invariant", "mid overflow avoidance"],
  Sorting: ["quick sort partition", "merge sort combine", "stable sort", "heap sort", "counting sort", "insertion sort", "selection sort", "bubble sort", "custom comparator", "sort by frequency", "topological sort", "external sort"],
  Recursion: ["base case", "recursive case", "call stack", "backtracking choice", "divide and conquer", "tail recursion", "memoized recursion", "tree recursion", "recurrence relation", "stack overflow risk", "state restoration", "subproblem definition"],
  "Dynamic Programming": ["overlapping subproblems", "optimal substructure", "memoization", "tabulation", "knapsack state", "LCS transition", "LIS optimization", "coin change recurrence", "grid DP", "interval DP", "bitmask DP", "space optimization"],
  "Time & Space Complexity": ["Big O upper bound", "constant time", "logarithmic time", "linear scan", "n log n sorting", "quadratic nested loops", "exponential recursion", "auxiliary space", "amortized analysis", "best average worst case", "input size", "dominant term"],
  Percentages: ["percentage increase", "percentage decrease", "successive discount", "percentage of total", "base value recovery", "marks percentage", "population growth", "tax percentage", "profit percentage", "loss percentage", "mixture percentage", "comparison percentage"],
  "Profit & Loss": ["cost price", "selling price", "profit", "loss", "discount", "marked price", "profit percentage", "loss percentage", "successive discount", "break-even", "overhead cost", "selling price after tax"],
  Ratio: ["ratio simplification", "proportion", "direct variation", "inverse variation", "partnership share", "mixture ratio", "continued ratio", "compound ratio", "equal ratios", "unitary method", "division in ratio", "scale factor"],
  Average: ["arithmetic mean", "weighted average", "combined average", "missing value", "average speed", "new average after addition", "average after removal", "class average", "run rate", "mean deviation", "total from average", "replacement value"],
  "Time & Work": ["work rate", "combined work", "alternate days", "efficiency ratio", "pipes and cisterns", "work left", "man days", "wage distribution", "negative work", "one day work", "completion time", "partial work"],
  "Time, Speed & Distance": ["speed formula", "relative speed", "average speed", "train crossing", "boat stream", "race track", "time conversion", "distance conversion", "meeting point", "overtaking", "upstream speed", "downstream speed"],
  Probability: ["sample space", "favorable outcomes", "independent events", "mutually exclusive events", "conditional probability", "complement rule", "dice probability", "card probability", "coin toss", "expected value", "at least one", "without replacement"],
  "Permutation & Combination": ["factorial arrangement", "permutation order matters", "combination selection", "repetition allowed", "circular arrangement", "identical objects", "committee formation", "word arrangement", "seat arrangement", "nPr", "nCr", "gap method"],
  "Number System": ["divisibility rule", "prime number", "LCM", "HCF", "remainder theorem", "unit digit", "number of factors", "even odd", "base conversion", "surds", "integer properties", "modular arithmetic"],
  "Logical Reasoning": ["statement conclusion", "assumption", "argument strength", "cause and effect", "course of action", "logical implication", "necessary condition", "sufficient condition", "analogical reasoning", "critical reasoning", "decision making", "data sufficiency"],
  Series: ["arithmetic series", "geometric series", "alternating series", "square pattern", "cube pattern", "prime pattern", "difference pattern", "fibonacci pattern", "alphabet series", "mixed series", "missing term", "wrong term"],
  "Coding-Decoding": ["letter shift", "reverse coding", "number coding", "symbol coding", "position mapping", "word coding", "matrix coding", "substitution rule", "pair coding", "alphabet rank", "directional encoding", "mixed coding"],
  "Blood Relations": ["father relation", "mother relation", "sibling relation", "maternal relation", "paternal relation", "generation gap", "family tree", "in-law relation", "coded relation", "gender inference", "uncle aunt relation", "cousin relation"],
  "Direction Sense": ["north movement", "south movement", "left turn", "right turn", "opposite direction", "shortest distance", "final direction", "coordinate tracking", "clockwise turn", "anticlockwise turn", "diagonal movement", "starting point"],
  Syllogism: ["all statements", "some statements", "no statements", "possibility case", "definite conclusion", "Venn diagram", "either-or case", "complementary pair", "only a few", "universal affirmative", "universal negative", "particular affirmative"],
  Puzzles: ["seating arrangement", "floor puzzle", "box arrangement", "scheduling puzzle", "selection puzzle", "ranking puzzle", "order arrangement", "grid puzzle", "comparison puzzle", "constraint elimination", "case splitting", "final arrangement"],
  "General Knowledge": ["Indian Constitution", "national symbols", "important days", "current affairs", "awards", "sports events", "international organizations", "geography basics", "history milestones", "economy terms", "science discoveries", "government schemes"],
  "Computer Fundamentals": ["CPU function", "RAM vs ROM", "input device", "output device", "operating system role", "binary number", "file extension", "compiler", "interpreter", "database basics", "network basics", "cyber safety"],
  Science: ["Newton laws", "photosynthesis", "acid base", "human digestion", "electric current", "magnetism", "states of matter", "cell structure", "solar system", "sound waves", "heat transfer", "chemical reaction"],
  "Government/Competitive Exam": ["constitution basics", "public administration", "budget term", "environment awareness", "computer literacy", "quantitative aptitude", "reasoning pattern", "science fact", "current scheme", "general awareness", "exam strategy", "official document"]
};

const categoryTopics = {
  Technical: technicalTopics,
  DSA: dsaTopics,
  Aptitude: aptitudeTopics,
  Reasoning: reasoningTopics,
  "General Studies": generalTopics
};

const difficultyCycle = ["Easy", "Medium", "Medium", "Hard"];
const askTemplates = [
  (topic, concept) => `In ${topic}, which option best explains ${concept} in an interview scenario?`,
  (topic, concept) => `A placement interviewer asks about ${concept} while discussing ${topic}. Which answer is most accurate?`,
  (topic, concept) => `Which statement correctly identifies the role of ${concept} in ${topic}?`,
  (topic, concept) => `For a ${topic} question centered on ${concept}, which option should a candidate choose?`
];

function titleCase(value) {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}

function makeCorrect(topic, concept) {
  return `${titleCase(concept)} is the directly relevant concept for this ${topic} scenario.`;
}

function makeExplanation(topic, concept, category) {
  return `The scenario is asking about ${concept}. In ${topic}, this concept is commonly tested in ${category.toLowerCase()} interviews because it checks whether the candidate can identify the right principle before applying formulas, syntax, or problem-solving steps.`;
}

function distractors(topic, concept, allConcepts, index) {
  const pool = allConcepts.filter((item) => item !== concept);
  const picks = [pool[(index + 3) % pool.length], pool[(index + 6) % pool.length], pool[(index + 9) % pool.length]];
  return picks.map((item) => `${titleCase(item)} is useful, but it does not directly answer this ${topic} scenario.`);
}

function buildOptions(correct, wrong, index) {
  const options = [correct, ...wrong];
  const shift = index % 4;
  return [...options.slice(shift), ...options.slice(0, shift)];
}

export function buildMcqQuestions() {
  let id = 0;
  return Object.entries(categoryTopics).flatMap(([category, topics]) =>
    topics.flatMap((topic) => {
      const concepts = topicConcepts[topic];
      return concepts.map((concept, conceptIndex) => {
        id += 1;
        const correctAnswer = makeCorrect(topic, concept);
        return {
          id: `mcq-${id}`,
          category,
          subCategory: topic,
          topic,
          difficulty: difficultyCycle[conceptIndex % difficultyCycle.length],
          type: "mcq",
          question: askTemplates[conceptIndex % askTemplates.length](topic, concept),
          options: buildOptions(correctAnswer, distractors(topic, concept, concepts, conceptIndex), conceptIndex),
          correctAnswer,
          explanation: makeExplanation(topic, concept, category)
        };
      });
    })
  );
}

export function validateMcqQuestions(questions = buildMcqQuestions()) {
  const errors = [];
  const seen = new Set();
  questions.forEach((question, index) => {
    if (!question.question || !question.category || !question.topic || !question.difficulty) errors.push(`#${index + 1} missing required metadata`);
    if (!Array.isArray(question.options) || question.options.length !== 4) errors.push(`${question.id} must have exactly four options`);
    if (new Set(question.options).size !== 4) errors.push(`${question.id} has duplicate options`);
    if (!question.options.includes(question.correctAnswer)) errors.push(`${question.id} correct answer is not present in options`);
    if (!question.explanation || question.explanation.length < 40) errors.push(`${question.id} explanation is too short`);
    const normalized = question.question.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    if (seen.has(normalized)) errors.push(`Duplicate question: ${question.question}`);
    seen.add(normalized);
  });

  const categoryCount = questions.reduce((acc, question) => ({ ...acc, [question.category]: (acc[question.category] || 0) + 1 }), {});
  const difficultyCount = questions.reduce((acc, question) => ({ ...acc, [question.difficulty]: (acc[question.difficulty] || 0) + 1 }), {});
  return {
    total: questions.length,
    categoryCount,
    difficultyCount,
    duplicateCount: questions.length - seen.size,
    invalidQuestionCount: errors.length,
    validationErrors: errors
  };
}

export const mcqCategories = categoryTopics;
export const questions = buildMcqQuestions();
