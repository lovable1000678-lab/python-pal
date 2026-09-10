import { extraKnowledge } from "./knowledge-base-extra";
import { generalKnowledge } from "./knowledge-base-general";

export type KbEntry = {
  id: string;
  topic: string;
  questions: string[];
  keywords?: string[];
  answer: string;
  code?: string;
};

const coreKnowledge: KbEntry[] = [
  {
    id: "basics-what-is-python",
    topic: "Python basics",
    questions: [
      "What is Python?",
      "Why should I learn Python?",
      "What is Python used for?",
    ],
    keywords: ["language", "interpreted", "beginner"],
    answer:
      "Python is a high-level, interpreted programming language known for readable syntax and a huge standard library. It is widely used for scripting, web backends, data analysis, automation, and machine learning. Code runs line by line, so you can experiment quickly in an interactive shell.",
    code: 'print("Hello, world!")',
  },
  {
    id: "basics-comments",
    topic: "Python basics",
    questions: [
      "How do I write a comment in Python?",
      "What is a docstring?",
      "How to comment multiple lines?",
    ],
    keywords: ["comment", "hash", "docstring"],
    answer:
      "A single-line comment starts with #. For multi-line explanations, use a triple-quoted string at the top of a module, class, or function — that is called a docstring and tools can read it with help().",
    code: '# this is a comment\n\ndef greet(name):\n    """Return a greeting for name."""\n    return f"Hi {name}"',
  },
  {
    id: "basics-indentation",
    topic: "Python basics",
    questions: [
      "Why does Python care about indentation?",
      "What is an IndentationError?",
      "How much should I indent?",
    ],
    keywords: ["indent", "whitespace", "block"],
    answer:
      "Python uses indentation instead of braces to define blocks. Every line in the same block must be indented by the same amount — the convention is 4 spaces. Mixing tabs and spaces raises a TabError or IndentationError.",
    code: "if score > 50:\n    print(\"pass\")\nelse:\n    print(\"retry\")",
  },
  {
    id: "variables",
    topic: "Variables",
    questions: [
      "What is a variable in Python?",
      "How do I declare a variable?",
      "Do I need to declare types in Python?",
    ],
    keywords: ["variable", "assign", "name", "declare"],
    answer:
      "A variable is a name bound to a value. You create one just by assigning — no type declaration needed, because Python is dynamically typed. Names are case sensitive and by convention use lower_snake_case.",
    code: "count = 10\nname = \"Ada\"\nprice = 19.99\ncount = \"now a string\"  # rebinding is allowed",
  },
  {
    id: "datatypes",
    topic: "Data types",
    questions: [
      "What are the built-in data types in Python?",
      "What data types does Python have?",
      "How do I check the type of a value?",
    ],
    keywords: ["type", "int", "float", "str", "bool", "none"],
    answer:
      "The core built-in types are int, float, complex, str, bool, NoneType, plus the containers list, tuple, dict, and set. Use type(value) to inspect a type and isinstance(value, T) to test one.",
    code: 'type(3)          # <class \'int\'>\ntype(3.0)        # <class \'float\'>\nisinstance("a", str)  # True',
  },
  {
    id: "datatypes-casting",
    topic: "Data types",
    questions: [
      "How do I convert a string to an integer?",
      "How to cast types in Python?",
      "Convert int to string",
    ],
    keywords: ["convert", "cast", "int", "str", "float"],
    answer:
      "Use the type constructors int(), float(), str(), bool(), list(). Converting a non-numeric string with int() raises ValueError, so validate or wrap it in try/except.",
    code: 'int("42")      # 42\nstr(42)        # "42"\nfloat("3.14")  # 3.14',
  },
  {
    id: "strings",
    topic: "Strings",
    questions: [
      "How do I format a string in Python?",
      "What is an f-string?",
      "How to join strings?",
    ],
    keywords: ["string", "format", "fstring", "concat", "join"],
    answer:
      "f-strings are the modern way to build strings: prefix the literal with f and put expressions inside braces. For joining a sequence of strings use \"sep\".join(items), which is far faster than repeated + concatenation.",
    code: 'name = "Ada"\nprint(f"Hello {name}, you are {2026 - 1815} years old")\nprint(", ".join(["a", "b", "c"]))',
  },
  {
    id: "lists",
    topic: "Lists",
    questions: [
      "What is a list in Python?",
      "How do I create a list?",
      "How do I add or remove items from a list?",
    ],
    keywords: ["list", "append", "remove", "mutable", "index"],
    answer:
      "A list is an ordered, mutable sequence written with square brackets. Index from 0, use negative indexes from the end, and slice with [start:stop]. Common methods are append, extend, insert, remove, pop, and sort.",
    code: 'nums = [3, 1, 2]\nnums.append(4)     # [3, 1, 2, 4]\nnums.sort()        # [1, 2, 3, 4]\nnums[0], nums[-1]  # (1, 4)\nnums[1:3]          # [2, 3]',
  },
  {
    id: "lists-reverse",
    topic: "Lists",
    questions: [
      "How do I reverse a list?",
      "How to sort a list in descending order?",
      "How do I copy a list?",
    ],
    keywords: ["reverse", "sort", "copy", "slice"],
    answer:
      "list.reverse() flips a list in place; reversed(list) returns an iterator without changing the original. Sort descending with sort(reverse=True) or sorted(items, reverse=True). Copy with list(items) or items[:] — plain assignment only makes another reference.",
    code: "nums = [1, 2, 3]\nnums.reverse()            # [3, 2, 1]\nsorted(nums, reverse=True)\ncopy = nums[:]",
  },
  {
    id: "tuples",
    topic: "Tuples",
    questions: [
      "What is a tuple?",
      "What is the difference between a list and a tuple?",
      "When should I use a tuple instead of a list?",
    ],
    keywords: ["tuple", "immutable", "difference", "list"],
    answer:
      "A tuple is an ordered but immutable sequence written with parentheses. Because it cannot change, it is hashable and can be used as a dictionary key or set member. Use tuples for fixed records like coordinates, and lists for collections that grow or change.",
    code: 'point = (3, 4)\nx, y = point            # unpacking\nlocations = {point: "origin-ish"}\nsingle = (5,)           # trailing comma makes a 1-tuple',
  },
  {
    id: "dicts",
    topic: "Dictionaries",
    questions: [
      "What is a dictionary in Python?",
      "How do I loop over a dictionary?",
      "How do I check if a key exists in a dict?",
    ],
    keywords: ["dict", "dictionary", "key", "value", "items", "get"],
    answer:
      "A dictionary stores key-value pairs with fast lookup by key. Use the in operator to test membership, .get(key, default) to avoid KeyError, and .items() to loop over pairs. Insertion order is preserved.",
    code: 'user = {"name": "Ada", "age": 36}\n"name" in user        # True\nuser.get("email", "-")\nfor key, value in user.items():\n    print(key, value)',
  },
  {
    id: "sets",
    topic: "Sets",
    questions: [
      "What is a set in Python?",
      "How do I remove duplicates from a list?",
      "How to do union and intersection?",
    ],
    keywords: ["set", "unique", "duplicate", "union", "intersection"],
    answer:
      "A set is an unordered collection of unique, hashable items. Membership tests are O(1), which makes sets great for deduplicating and for fast lookups. Use | for union, & for intersection, and - for difference.",
    code: "unique = set([1, 2, 2, 3])   # {1, 2, 3}\n{1, 2} | {2, 3}              # {1, 2, 3}\n{1, 2} & {2, 3}              # {2}",
  },
  {
    id: "conditionals",
    topic: "Conditionals",
    questions: [
      "How do if statements work in Python?",
      "What is elif?",
      "Does Python have a ternary operator?",
    ],
    keywords: ["if", "else", "elif", "condition", "ternary", "boolean"],
    answer:
      "Use if / elif / else with a colon and an indented block. Conditions are truthy: empty strings, empty containers, 0, and None are falsy. Python's inline conditional is written value_if_true if condition else value_if_false.",
    code: 'if score >= 90:\n    grade = "A"\nelif score >= 60:\n    grade = "pass"\nelse:\n    grade = "retry"\n\nlabel = "even" if n % 2 == 0 else "odd"',
  },
  {
    id: "loops",
    topic: "Loops",
    questions: [
      "How do for loops work in Python?",
      "What is the difference between for and while?",
      "How do I loop with an index?",
    ],
    keywords: ["for", "while", "loop", "range", "enumerate", "break", "continue"],
    answer:
      "A for loop iterates directly over any iterable; a while loop repeats until its condition becomes false. Use range(n) for counting, enumerate(items) when you need the index too, and zip(a, b) to walk two sequences together. break exits the loop, continue skips to the next round.",
    code: 'for i, item in enumerate(["a", "b"]):\n    print(i, item)\n\nn = 3\nwhile n > 0:\n    n -= 1',
  },
  {
    id: "functions",
    topic: "Functions",
    questions: [
      "How do functions work in Python?",
      "How do I define a function?",
      "What are default arguments and *args / **kwargs?",
    ],
    keywords: ["function", "def", "return", "argument", "parameter", "args", "kwargs"],
    answer:
      "Define a function with def, a parameter list, and an indented body; return sends a value back (None if omitted). Parameters can have defaults, *args collects extra positional arguments, and **kwargs collects extra keyword arguments. Never use a mutable value like [] as a default.",
    code: 'def greet(name, greeting="Hi", *args, **kwargs):\n    return f"{greeting}, {name}!"\n\ngreet("Ada")\ngreet("Ada", greeting="Hello")',
  },
  {
    id: "functions-lambda",
    topic: "Functions",
    questions: [
      "What is a lambda function?",
      "What is an anonymous function in Python?",
      "How do I sort by a key?",
    ],
    keywords: ["lambda", "anonymous", "key", "sort", "map", "filter"],
    answer:
      "A lambda is a small anonymous function limited to a single expression. It is most useful as a throwaway key or callback; for anything longer, a named def is clearer.",
    code: 'people = [("Ada", 36), ("Bo", 24)]\npeople.sort(key=lambda p: p[1])\nsquares = list(map(lambda x: x * x, range(5)))',
  },
  {
    id: "oop",
    topic: "OOP basics",
    questions: [
      "What is a class in Python?",
      "How does object oriented programming work in Python?",
      "What is __init__ and self?",
    ],
    keywords: ["class", "object", "init", "self", "method", "oop"],
    answer:
      "A class is a blueprint for objects that bundles data (attributes) with behaviour (methods). __init__ is the initializer that runs when you create an instance, and self is the reference to that instance passed automatically to every method.",
    code: 'class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        return f"{self.name} says woof"\n\nDog("Rex").speak()',
  },
  {
    id: "oop-inheritance",
    topic: "OOP basics",
    questions: [
      "How does inheritance work in Python?",
      "What is super()?",
      "How do I override a method?",
    ],
    keywords: ["inheritance", "super", "subclass", "override", "parent"],
    answer:
      "A subclass lists its parent in parentheses and inherits its attributes and methods. Redefining a method overrides it, and super() calls the parent implementation — commonly used inside __init__ to reuse the parent's setup.",
    code: 'class Puppy(Dog):\n    def __init__(self, name, age):\n        super().__init__(name)\n        self.age = age\n\n    def speak(self):\n        return f"{self.name} says yip"',
  },
  {
    id: "modules",
    topic: "Modules and imports",
    questions: [
      "How do imports work in Python?",
      "How do I import my own module?",
      "What is __name__ == '__main__'?",
    ],
    keywords: ["import", "module", "package", "from", "main"],
    answer:
      "Any .py file is a module. Import the whole module with import math, or specific names with from math import sqrt. Your own files import by filename from the same folder. The if __name__ == \"__main__\": guard runs code only when the file is executed directly, not when it is imported.",
    code: 'import math\nfrom math import sqrt as square_root\nimport helpers          # helpers.py next door\n\nif __name__ == "__main__":\n    main()',
  },
  {
    id: "exceptions",
    topic: "Exception handling",
    questions: [
      "How do I handle exceptions in Python?",
      "What is try except?",
      "What are finally and else in a try block?",
    ],
    keywords: ["exception", "error", "try", "except", "finally", "raise"],
    answer:
      "Wrap risky code in try and handle failures in except. Catch specific exception types rather than a bare except. else runs when no exception was raised, and finally always runs — ideal for cleanup. Use raise to signal an error yourself.",
    code: 'try:\n    value = int(user_input)\nexcept ValueError as e:\n    print("not a number:", e)\nelse:\n    print("parsed", value)\nfinally:\n    print("done")',
  },
  {
    id: "files",
    topic: "File handling",
    questions: [
      "How do I read a file in Python?",
      "How do I write to a file?",
      "What does with open do?",
    ],
    keywords: ["file", "open", "read", "write", "with", "close"],
    answer:
      "Use open() inside a with block so the file closes automatically, even if an error occurs. Mode \"r\" reads, \"w\" overwrites, \"a\" appends. Iterating over the file object reads it line by line without loading the whole file into memory.",
    code: 'with open("notes.txt", "r", encoding="utf-8") as f:\n    for line in f:\n        print(line.rstrip())\n\nwith open("out.txt", "w", encoding="utf-8") as f:\n    f.write("hello\\n")',
  },
  {
    id: "files-csv",
    topic: "File handling",
    questions: [
      "How do I read a CSV file?",
      "How to work with JSON in Python?",
    ],
    keywords: ["csv", "json", "load", "dump", "reader"],
    answer:
      "The standard library covers both formats: csv.DictReader gives you each row as a dictionary, and the json module converts between Python objects and JSON text with load/loads and dump/dumps.",
    code: 'import csv, json\n\nwith open("data.csv", newline="") as f:\n    for row in csv.DictReader(f):\n        print(row["name"])\n\nwith open("data.json") as f:\n    data = json.load(f)',
  },
  {
    id: "comprehensions",
    topic: "Comprehensions",
    questions: [
      "What is a list comprehension?",
      "How do I write a dict comprehension?",
      "How to filter a list in one line?",
    ],
    keywords: ["comprehension", "list", "dict", "set", "filter", "generator"],
    answer:
      "A comprehension builds a new collection from an iterable in a single expression, optionally with a filter. The same syntax works for dictionaries and sets, and using parentheses instead creates a lazy generator.",
    code: "squares = [x * x for x in range(10)]\nevens = [x for x in range(10) if x % 2 == 0]\nlookup = {w: len(w) for w in words}\nlazy = (x * x for x in range(1_000_000))",
  },
  {
    id: "errors-common",
    topic: "Common errors",
    questions: [
      "What are common Python errors?",
      "What does IndexError mean?",
      "Why do I get a NameError?",
    ],
    keywords: ["error", "traceback", "indexerror", "keyerror", "nameerror", "typeerror"],
    answer:
      "Read the last line of the traceback first — it names the error. SyntaxError means the code cannot be parsed (often a missing colon or bracket). NameError means the name was never assigned. TypeError means an operation got the wrong type. IndexError means the index is past the end of a sequence, and KeyError means the dictionary key is missing.",
    code: '[1, 2][5]      # IndexError\n{"a": 1}["b"]  # KeyError\n"1" + 1        # TypeError',
  },
  {
    id: "errors-mutable-default",
    topic: "Common errors",
    questions: [
      "Why is my default argument shared between calls?",
      "What is the mutable default argument bug?",
      "Why does my list keep growing between function calls?",
    ],
    keywords: ["mutable", "default", "argument", "shared", "bug"],
    answer:
      "A default argument is evaluated once when the function is defined, so a mutable default like [] or {} is shared by every call. Use None as the default and create the container inside the function body.",
    code: "def add(item, bucket=None):\n    if bucket is None:\n        bucket = []\n    bucket.append(item)\n    return bucket",
  },
  {
    id: "errors-equality",
    topic: "Common errors",
    questions: [
      "What is the difference between == and is?",
      "Should I use is to compare strings?",
    ],
    keywords: ["equality", "identity", "is", "==", "compare"],
    answer:
      "== compares values, while is compares identity — whether two names point to the same object in memory. Use == for values and reserve is for singletons like None, True, and False.",
    code: "a = [1, 2]\nb = [1, 2]\na == b   # True\na is b   # False\nx is None  # correct identity check",
  },
];

export const knowledgeBase: KbEntry[] = [
  ...coreKnowledge,
  ...extraKnowledge,
  ...generalKnowledge,
];
