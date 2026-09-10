import type { KbEntry } from "./knowledge-base";

/** Additional coverage: everyday phrasings and more Python topics. */
export const extraKnowledge: KbEntry[] = [
  {
    id: "install-run",
    topic: "Getting started",
    questions: [
      "How do I install Python?",
      "How do I run a Python file?",
      "How do I check my Python version?",
      "How do I use pip to install a package?",
    ],
    keywords: ["install", "pip", "run", "version", "terminal", "command"],
    answer:
      "Download Python from python.org (or install with your package manager). Check the version with `python --version`. Run a script from a terminal with `python script.py`. Install third-party packages with pip, ideally inside a virtual environment so projects stay isolated.",
    code: "python --version\npython script.py\npython -m venv .venv\nsource .venv/bin/activate   # Windows: .venv\\Scripts\\activate\npip install requests",
  },
  {
    id: "input-output",
    topic: "Input and output",
    questions: [
      "How do I take input from the user?",
      "How do I print something in Python?",
      "How do I read a number from input?",
    ],
    keywords: ["input", "print", "user", "stdin", "output"],
    answer:
      "print() writes to the screen; input() reads a line of text from the user and always returns a string, so convert it with int() or float() when you need a number. print() accepts sep and end to control formatting.",
    code: 'name = input("Your name: ")\nage = int(input("Your age: "))\nprint("Hi", name, "you are", age, sep=" ", end="\\n")',
  },
  {
    id: "operators",
    topic: "Operators",
    questions: [
      "What operators does Python have?",
      "What is floor division?",
      "What does the modulo operator do?",
      "How do I do exponentiation?",
    ],
    keywords: ["operator", "modulo", "floor", "division", "power", "arithmetic", "logical"],
    answer:
      "Arithmetic: + - * / (true division, always float), // (floor division), % (remainder), ** (power). Comparison: == != < <= > >=. Logical: and, or, not. Membership: in, not in. Identity: is, is not.",
    code: "7 / 2    # 3.5\n7 // 2   # 3\n7 % 2    # 1\n2 ** 10  # 1024",
  },
  {
    id: "strings-methods",
    topic: "Strings",
    questions: [
      "What string methods are there?",
      "How do I split a string?",
      "How do I remove whitespace from a string?",
      "How do I replace text in a string?",
      "How do I reverse a string?",
    ],
    keywords: ["split", "strip", "replace", "upper", "lower", "slice", "reverse", "find"],
    answer:
      "Strings are immutable, so every method returns a new string. Common ones: split, strip, replace, lower, upper, startswith, endswith, find, count, and zfill. Reverse with slicing [::-1].",
    code: '" hi there ".strip()          # "hi there"\n"a,b,c".split(",")            # ["a","b","c"]\n"cat".replace("c", "b")       # "bat"\n"hello"[::-1]                 # "olleh"',
  },
  {
    id: "slicing",
    topic: "Slicing",
    questions: [
      "How does slicing work in Python?",
      "What does [::-1] mean?",
      "How do I get part of a list?",
    ],
    keywords: ["slice", "start", "stop", "step", "sublist", "substring"],
    answer:
      "Slicing takes [start:stop:step]. start is inclusive, stop is exclusive, and any part can be omitted. A negative step walks backwards, which is why [::-1] reverses a sequence. Slicing works on strings, lists, and tuples.",
    code: "nums = [0, 1, 2, 3, 4, 5]\nnums[1:4]    # [1, 2, 3]\nnums[:3]     # [0, 1, 2]\nnums[::2]    # [0, 2, 4]\nnums[::-1]   # [5, 4, 3, 2, 1, 0]",
  },
  {
    id: "range",
    topic: "Loops",
    questions: [
      "How does range work?",
      "How do I loop a certain number of times?",
      "How do I count backwards in a loop?",
    ],
    keywords: ["range", "count", "step", "iterate", "times"],
    answer:
      "range(stop), range(start, stop) and range(start, stop, step) produce a lazy sequence of integers, stop excluded. Use a negative step to count down. Wrap it in list() if you actually need the numbers stored.",
    code: "for i in range(3):        # 0 1 2\n    print(i)\n\nfor i in range(10, 0, -2): # 10 8 6 4 2\n    print(i)",
  },
  {
    id: "loops-else-nested",
    topic: "Loops",
    questions: [
      "What does else after a for loop do?",
      "How do I write nested loops?",
      "How do I stop a loop early?",
    ],
    keywords: ["else", "nested", "break", "continue", "pass", "infinite"],
    answer:
      "A loop's else block runs only if the loop finished without hitting break — handy for search loops. Nested loops are just loops inside loops; break only exits the innermost one. Use pass as a placeholder for an empty block.",
    code: "for n in nums:\n    if n == target:\n        print(\"found\")\n        break\nelse:\n    print(\"not found\")",
  },
  {
    id: "sorting",
    topic: "Sorting",
    questions: [
      "How do I sort a list of dictionaries?",
      "What is the difference between sort and sorted?",
      "How do I sort by multiple keys?",
    ],
    keywords: ["sort", "sorted", "key", "reverse", "order"],
    answer:
      "list.sort() sorts in place and returns None; sorted(iterable) returns a new list and works on any iterable. Pass key= a function that extracts the value to compare, and reverse=True for descending. For multiple keys, return a tuple from the key function.",
    code: 'people = [{"n": "Ada", "a": 36}, {"n": "Bo", "a": 24}]\nsorted(people, key=lambda p: p["a"])\nsorted(people, key=lambda p: (p["a"], p["n"]), reverse=True)',
  },
  {
    id: "dict-methods",
    topic: "Dictionaries",
    questions: [
      "How do I merge two dictionaries?",
      "How do I sort a dictionary by value?",
      "How do I delete a key from a dict?",
      "How do I count occurrences of items?",
    ],
    keywords: ["merge", "update", "pop", "del", "counter", "setdefault", "sort"],
    answer:
      "Merge with {**a, **b} or a | b (Python 3.9+). Remove a key with del d[key] or d.pop(key, default). Sort by value with sorted(d.items(), key=lambda kv: kv[1]). For counting, collections.Counter does the work for you.",
    code: 'from collections import Counter\n\na = {"x": 1}; b = {"y": 2}\nmerged = a | b\nd = merged.copy(); d.pop("x", None)\nCounter("banana")   # {"a": 3, "n": 2, "b": 1}',
  },
  {
    id: "iterators-generators",
    topic: "Iterators and generators",
    questions: [
      "What is a generator in Python?",
      "What does yield do?",
      "What is an iterator?",
      "What is the difference between a generator and a list?",
    ],
    keywords: ["generator", "yield", "iterator", "lazy", "next", "iter"],
    answer:
      "An iterator produces items one at a time via __next__. A generator is the easy way to write one: any function containing yield returns a generator that pauses and resumes, producing values lazily. Generators use almost no memory because they never build the whole sequence.",
    code: "def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nfor x in countdown(3):\n    print(x)     # 3 2 1",
  },
  {
    id: "decorators",
    topic: "Decorators",
    questions: [
      "What is a decorator in Python?",
      "How do I write a decorator?",
      "What does @property do?",
    ],
    keywords: ["decorator", "wrapper", "property", "staticmethod", "classmethod", "at"],
    answer:
      "A decorator is a function that takes a function and returns a replacement, applied with @name above a def. It is how you add logging, timing, or caching without editing the original body. Built-in ones include @property, @staticmethod, @classmethod, and functools.lru_cache.",
    code: "import functools\n\ndef logged(fn):\n    @functools.wraps(fn)\n    def wrapper(*args, **kwargs):\n        print(\"calling\", fn.__name__)\n        return fn(*args, **kwargs)\n    return wrapper\n\n@logged\ndef add(a, b):\n    return a + b",
  },
  {
    id: "scope",
    topic: "Scope",
    questions: [
      "What is variable scope in Python?",
      "What does global mean?",
      "Why can't I change a variable inside a function?",
      "What is a closure?",
    ],
    keywords: ["scope", "global", "nonlocal", "local", "closure", "lifetime"],
    answer:
      "Python looks names up local → enclosing → global → builtin (the LEGB rule). Assigning inside a function creates a new local name, which is why outer variables seem unchangeable; use global or nonlocal to rebind them, though returning a value is usually cleaner. A closure is an inner function that remembers its enclosing variables.",
    code: "count = 0\n\ndef bump():\n    global count\n    count += 1\n\ndef make_adder(n):\n    def add(x):\n        return x + n   # closure over n\n    return add",
  },
  {
    id: "oop-dunder",
    topic: "OOP basics",
    questions: [
      "What are dunder methods?",
      "What is __str__ and __repr__?",
      "How do I make my class printable or comparable?",
      "What is a dataclass?",
    ],
    keywords: ["dunder", "magic", "str", "repr", "eq", "len", "dataclass"],
    answer:
      "Dunder (double underscore) methods hook your class into Python syntax: __str__ for print, __repr__ for debugging, __eq__ for ==, __len__ for len(), __iter__ for looping. @dataclass generates __init__, __repr__, and __eq__ for you.",
    code: 'from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: int\n    y: int\n\nprint(Point(1, 2))   # Point(x=1, y=2)',
  },
  {
    id: "oop-encapsulation",
    topic: "OOP basics",
    questions: [
      "Does Python have private variables?",
      "What is encapsulation in Python?",
      "What is polymorphism?",
      "What is an abstract class?",
    ],
    keywords: ["private", "encapsulation", "polymorphism", "abstract", "underscore", "interface"],
    answer:
      "Python has no true private members: a single underscore means \"internal by convention\" and a double underscore triggers name mangling. Polymorphism comes from duck typing — if an object has the method, it works. For formal interfaces use abc.ABC with @abstractmethod.",
    code: "from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self): ...\n\nclass Square(Shape):\n    def __init__(self, s): self._s = s\n    def area(self): return self._s ** 2",
  },
  {
    id: "exceptions-custom",
    topic: "Exception handling",
    questions: [
      "How do I create a custom exception?",
      "How do I raise an error in Python?",
      "How do I catch multiple exceptions?",
    ],
    keywords: ["custom", "raise", "exception", "class", "multiple", "assert"],
    answer:
      "Subclass Exception to define your own error type, then raise it with a message. Catch several types with a tuple in one except clause. raise on its own re-raises the current exception, and raise X from e keeps the original cause.",
    code: 'class ValidationError(Exception):\n    pass\n\ntry:\n    raise ValidationError("bad email")\nexcept (ValidationError, ValueError) as e:\n    print(type(e).__name__, e)',
  },
  {
    id: "stdlib",
    topic: "Standard library",
    questions: [
      "What useful modules come with Python?",
      "How do I work with dates and times?",
      "How do I generate random numbers?",
      "How do I use regular expressions?",
    ],
    keywords: ["datetime", "random", "re", "os", "pathlib", "math", "itertools", "collections"],
    answer:
      "Batteries included: datetime for dates, random for randomness, re for regex, math for maths, os and pathlib for paths, json and csv for data, collections for Counter/defaultdict/deque, itertools for iterator tricks.",
    code: 'from datetime import datetime, timedelta\nimport random, re\n\ndatetime.now() + timedelta(days=7)\nrandom.randint(1, 6)\nre.findall(r"\\d+", "a1 b22")   # ["1", "22"]',
  },
  {
    id: "virtualenv-packages",
    topic: "Environments and packaging",
    questions: [
      "What is a virtual environment?",
      "What is requirements.txt?",
      "How do I manage dependencies?",
    ],
    keywords: ["venv", "virtualenv", "requirements", "dependency", "package", "pip"],
    answer:
      "A virtual environment is a project-local folder holding its own Python and packages so projects don't clash. Create it with python -m venv .venv, activate it, install packages, then freeze the exact versions into requirements.txt for others to reproduce.",
    code: "python -m venv .venv\nsource .venv/bin/activate\npip install -r requirements.txt\npip freeze > requirements.txt",
  },
  {
    id: "testing-debugging",
    topic: "Testing and debugging",
    questions: [
      "How do I test Python code?",
      "How do I debug Python?",
      "What is assert used for?",
      "How do I use print debugging or a debugger?",
    ],
    keywords: ["test", "unittest", "pytest", "debug", "assert", "breakpoint", "logging"],
    answer:
      "Write tests as functions starting with test_ and run them with pytest, or use the built-in unittest module. assert checks an expectation and raises AssertionError when it fails. For debugging, drop breakpoint() into the code to enter the interactive debugger, and prefer logging over scattered prints.",
    code: "def add(a, b):\n    return a + b\n\ndef test_add():\n    assert add(2, 3) == 5\n\n# breakpoint()  # starts pdb here",
  },
  {
    id: "typing",
    topic: "Type hints",
    questions: [
      "What are type hints in Python?",
      "How do I annotate function types?",
      "Does Python check types at runtime?",
    ],
    keywords: ["type", "hint", "annotation", "typing", "mypy", "optional"],
    answer:
      "Type hints document expected types and power editors and tools like mypy, but Python does not enforce them at runtime. Annotate parameters and return values with colons and an arrow; use list[int], dict[str, int], and X | None for optional values.",
    code: "def total(prices: list[float], tax: float = 0.0) -> float:\n    return sum(prices) * (1 + tax)\n\ndef find(name: str) -> str | None:\n    ...",
  },
  {
    id: "mutability-copy",
    topic: "Common errors",
    questions: [
      "Why did changing one list change another?",
      "What is the difference between shallow and deep copy?",
      "What does mutable mean?",
    ],
    keywords: ["mutable", "immutable", "copy", "deepcopy", "reference", "alias"],
    answer:
      "Assignment copies a reference, not the data, so two names can point at the same list. list(x) or x[:] makes a shallow copy — nested objects are still shared — and copy.deepcopy(x) copies everything. Lists, dicts, and sets are mutable; strings, numbers, and tuples are not.",
    code: "import copy\n\na = [[1], [2]]\nb = a[:]              # shallow: inner lists shared\nc = copy.deepcopy(a)  # fully independent",
  },
  {
    id: "float-precision",
    topic: "Common errors",
    questions: [
      "Why does 0.1 + 0.2 not equal 0.3?",
      "How do I round numbers properly?",
      "How do I work with money in Python?",
    ],
    keywords: ["float", "precision", "round", "decimal", "rounding"],
    answer:
      "Floats are binary approximations, so tiny errors appear in decimal maths. Compare with math.isclose instead of ==, round for display with round(x, 2) or an f-string format, and use the decimal module for money.",
    code: 'from decimal import Decimal\nimport math\n\n0.1 + 0.2                     # 0.30000000000000004\nmath.isclose(0.1 + 0.2, 0.3)  # True\nDecimal("0.1") + Decimal("0.2")  # Decimal("0.3")\nf"{3.14159:.2f}"              # "3.14"',
  },
  {
    id: "performance",
    topic: "Performance",
    questions: [
      "How do I make Python code faster?",
      "Why is my loop taking so long?",
      "How do I measure execution time?",
      "How do I optimize my code?",
    ],
    keywords: ["fast", "faster", "performance", "optimize", "timeit", "cache", "speed up"],
    answer:
      "Pick better data structures first: sets and dicts give O(1) lookups where a list scan is O(n). Prefer comprehensions and built-ins like sum or join over manual loops, cache repeated pure calls with functools.lru_cache, and measure with timeit before optimizing.",
    code: "import timeit, functools\n\n@functools.lru_cache(maxsize=None)\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\ntimeit.timeit(lambda: fib(30), number=10)",
  },
  {
    id: "recursion",
    topic: "Recursion",
    questions: [
      "What is recursion in Python?",
      "How do I write a recursive function?",
      "What is a RecursionError?",
    ],
    keywords: ["recursion", "recursive", "base case", "stack", "depth"],
    answer:
      "A recursive function calls itself on a smaller input and stops at a base case. Without a base case you hit RecursionError once the default depth limit (~1000) is exceeded. Many recursive problems are faster written as loops or with caching.",
    code: "def factorial(n):\n    if n <= 1:      # base case\n        return 1\n    return n * factorial(n - 1)",
  },
  {
    id: "args-unpacking",
    topic: "Functions",
    questions: [
      "What does the star mean in a function call?",
      "How do I unpack a list into arguments?",
      "What is the difference between positional and keyword arguments?",
    ],
    keywords: ["unpack", "star", "asterisk", "positional", "keyword", "spread"],
    answer:
      "In a call, *seq spreads a sequence into positional arguments and **d spreads a dict into keyword arguments — the mirror image of *args/**kwargs in a definition. Positional arguments match by order; keyword arguments match by name and must come last.",
    code: "def area(w, h):\n    return w * h\n\ndims = (3, 4)\narea(*dims)\nkw = {\"w\": 3, \"h\": 4}\narea(**kw)",
  },
  {
    id: "files-paths",
    topic: "File handling",
    questions: [
      "How do I check if a file exists?",
      "How do I list files in a folder?",
      "How do I join file paths?",
      "How do I delete or rename a file?",
    ],
    keywords: ["path", "pathlib", "exists", "listdir", "folder", "directory", "os"],
    answer:
      "pathlib is the modern way: Path objects join with /, and offer exists(), mkdir(), iterdir(), glob(), read_text(), write_text(), unlink() and rename(). The older os and os.path functions do the same with strings.",
    code: 'from pathlib import Path\n\np = Path("data") / "notes.txt"\np.exists()\np.parent.mkdir(parents=True, exist_ok=True)\nfor f in Path("data").glob("*.csv"):\n    print(f.name)',
  },
  {
    id: "http-api",
    topic: "Working with APIs",
    questions: [
      "How do I call an API in Python?",
      "How do I make an HTTP request?",
      "How do I parse a JSON response?",
    ],
    keywords: ["api", "http", "request", "requests", "urllib", "json", "get", "post"],
    answer:
      "The requests package is the usual choice: requests.get(url) returns a response whose .json() parses the body, and .status_code / raise_for_status() tell you whether it worked. The standard library alternative is urllib.request when you cannot add dependencies.",
    code: 'import requests\n\nr = requests.get("https://api.example.com/items", timeout=10)\nr.raise_for_status()\ndata = r.json()',
  },
  {
    id: "enumerate-zip",
    topic: "Loops",
    questions: [
      "What does enumerate do?",
      "How do I loop over two lists at once?",
      "How do I get index and value together?",
    ],
    keywords: ["enumerate", "zip", "index", "pair", "parallel"],
    answer:
      "enumerate(items, start=0) yields (index, item) pairs, so you never need a manual counter. zip(a, b) walks several sequences in lockstep and stops at the shortest one; zip(*pairs) unzips them again.",
    code: 'for i, name in enumerate(names, start=1):\n    print(i, name)\n\nfor name, score in zip(names, scores):\n    print(name, score)',
  },
  {
    id: "truthiness-none",
    topic: "Conditionals",
    questions: [
      "What is None in Python?",
      "What values are falsy?",
      "How do I check if a list is empty?",
    ],
    keywords: ["none", "null", "falsy", "truthy", "empty", "check"],
    answer:
      "None is Python's \"no value\" object; check it with is None. Falsy values are None, False, 0, 0.0, \"\", [], {}, set(), and (). So `if not items:` is the idiomatic empty check, and `if items:` means non-empty.",
    code: 'items = []\nif not items:\n    print("empty")\n\nvalue = None\nif value is None:\n    print("missing")',
  },
  {
    id: "style-pep8",
    topic: "Style and best practices",
    questions: [
      "What is PEP 8?",
      "How should I name things in Python?",
      "What are Python best practices?",
    ],
    keywords: ["pep8", "style", "naming", "convention", "clean", "format", "black"],
    answer:
      "PEP 8 is the official style guide: 4-space indentation, lines under ~79-99 characters, lower_snake_case for functions and variables, CapWords for classes, UPPER_CASE for constants. Keep functions short and named for what they do, prefer explicit over clever, and let a formatter like black or ruff handle the layout.",
    code: "MAX_RETRIES = 3\n\nclass OrderService:\n    def total_price(self, items):\n        return sum(i.price for i in items)",
  },
  {
    id: "concurrency",
    topic: "Concurrency",
    questions: [
      "What is async await in Python?",
      "How do I run things in parallel?",
      "What is the GIL?",
      "What is threading vs multiprocessing?",
    ],
    keywords: ["async", "await", "thread", "multiprocessing", "gil", "parallel", "asyncio"],
    answer:
      "The GIL lets only one thread run Python bytecode at a time, so threads help with I/O waiting, not CPU work. Use asyncio with async/await for many network calls, threading for blocking I/O, and multiprocessing for CPU-heavy work across cores.",
    code: "import asyncio\n\nasync def fetch(n):\n    await asyncio.sleep(1)\n    return n\n\nasync def main():\n    return await asyncio.gather(*(fetch(i) for i in range(3)))\n\nasyncio.run(main())",
  },
  {
    id: "with-context",
    topic: "Context managers",
    questions: [
      "What is a context manager?",
      "How does the with statement work?",
      "How do I write my own with block?",
    ],
    keywords: ["with", "context", "enter", "exit", "contextlib", "resource"],
    answer:
      "A context manager guarantees setup and cleanup around a block. Any object with __enter__ and __exit__ works with `with`, and contextlib.contextmanager turns a generator into one. Files, locks, and database connections all use this pattern.",
    code: "from contextlib import contextmanager\n\n@contextmanager\ndef timer():\n    import time\n    start = time.time()\n    yield\n    print(\"took\", time.time() - start)\n\nwith timer():\n    heavy_work()",
  },
];
