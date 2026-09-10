import type { KbEntry } from "./knowledge-base";

// Broader, conversational and comparison-style questions people ask a Python
// helper: opinions, career advice, tooling, and small talk. Answers stay
// grounded and factual — no invented facts, no external AI calls.
export const generalKnowledge: KbEntry[] = [
  {
    id: "gen-best-language",
    topic: "Programming general",
    questions: [
      "Which is the best programming language?",
      "What is the best language to learn first?",
      "Which programming language should I learn?",
      "Is Python the best programming language?",
      "What language is most popular?",
    ],
    keywords: ["best", "language", "learn", "first", "popular", "choose", "top"],
    answer:
      "There is no single best language — the best one is the one that fits the job. Python is usually the best first language because the syntax reads like English and it covers scripting, data, AI, and web backends. Pick JavaScript for anything in the browser, Java or C# for large enterprise systems, C or C++ when you need raw speed and memory control, SQL for data, and Go or Rust for high-performance services. Learn one language properly first; the second one is far easier.",
  },
  {
    id: "gen-python-vs-java",
    topic: "Programming general",
    questions: [
      "Python vs Java, which is better?",
      "Difference between Python and Java",
      "Is Python faster than Java?",
    ],
    keywords: ["java", "versus", "vs", "compare", "difference", "faster"],
    answer:
      "Python is dynamically typed, shorter to write, and great for scripting, data, and prototyping. Java is statically typed, verbose but strict, runs on the JVM, and is faster for raw CPU work and big long-lived codebases. Java catches type mistakes at compile time; Python catches them at run time unless you add type hints. Both are excellent — Python wins on speed of writing, Java on speed of running.",
    code: '# Python\nprint("Hello")\n\n// Java\n// public class Main {\n//   public static void main(String[] a){ System.out.println("Hello"); }\n// }',
  },
  {
    id: "gen-python-vs-c",
    topic: "Programming general",
    questions: [
      "Python vs C++ which is better?",
      "Why is Python slower than C?",
      "Should I learn C before Python?",
      "Should I learn C++ or Python?",
      "Is C++ better than Python?",
      "Difference between Python and C++",
    ],
    keywords: ["c", "c++", "cpp", "slow", "fast", "compiled", "interpreted",
      "memory", "performance", "learn"],
    answer:
      "C and C++ compile straight to machine code and give you manual memory control, so they run much faster but take far longer to write and debug. Python is interpreted and manages memory for you, trading speed for productivity. You do not need C first — most people start with Python and reach for C extensions or libraries like NumPy when a specific part needs to be fast.",
  },
  {
    id: "gen-why-python-slow",
    topic: "Programming general",
    questions: [
      "Why is Python slow?",
      "Why is Python slower than other languages?",
      "Is Python a slow language?",
    ],
    keywords: ["slow", "slower", "speed", "interpreted", "gil", "bytecode"],
    answer:
      "Python is slow mainly because it is interpreted rather than compiled: each line is turned into bytecode and executed by a virtual machine, every value is a full object with type information checked at run time, and the Global Interpreter Lock stops plain threads from using several CPU cores at once. In practice this rarely matters — the heavy work usually happens inside NumPy, pandas, or other libraries written in C, and you can move hot code into C extensions, PyPy, or multiprocessing when speed really counts.",
  },
  {
    id: "gen-python-vs-js",
    topic: "Programming general",
    questions: [
      "Python vs JavaScript?",
      "Should I learn JavaScript or Python?",
      "Can Python run in the browser?",
    ],
    keywords: ["javascript", "js", "browser", "web", "frontend"],
    answer:
      "JavaScript is the language of the browser, so anything with a web interface needs it. Python cannot run natively in a browser (Pyodide compiles it to WebAssembly, but that is a niche setup). If you want websites, learn JavaScript. If you want automation, data, AI, or backends, learn Python. Many developers use both: Python on the server, JavaScript on the page.",
  },
  {
    id: "gen-learn-python",
    topic: "Learning Python",
    questions: [
      "How do I learn Python?",
      "How long does it take to learn Python?",
      "What is the best way to start with Python?",
      "I am a beginner, where should I start?",
    ],
    keywords: ["learn", "beginner", "start", "roadmap", "how long", "study"],
    answer:
      "Learn the basics in this order: variables and data types, strings, lists and dictionaries, conditionals, loops, functions, modules, file handling, exceptions, then classes. Expect a few weeks to get comfortable and several months to feel fluent. The key is building small things — a calculator, a file renamer, a scraper — instead of only reading. Type every example yourself and read the error messages carefully.",
  },
  {
    id: "gen-python-jobs",
    topic: "Learning Python",
    questions: [
      "Is Python good for jobs?",
      "What jobs can I get with Python?",
      "Is Python worth learning in 2026?",
      "Is Python good for a career?",
    ],
    keywords: ["job", "career", "salary", "worth", "future", "demand"],
    answer:
      "Python is one of the most in-demand languages. Common roles are data analyst, data scientist, machine learning engineer, backend developer, automation/QA engineer, DevOps, and scientific computing. For most of these you also need SQL, Git, and either a web framework (Django/FastAPI) or the data stack (pandas, NumPy, scikit-learn).",
  },
  {
    id: "gen-python-ai",
    topic: "Learning Python",
    questions: [
      "Is Python good for AI and machine learning?",
      "Why is Python used for data science?",
      "What libraries are used for machine learning in Python?",
    ],
    keywords: ["ai", "machine learning", "data science", "ml", "numpy", "pandas"],
    answer:
      "Python dominates AI and data work because its libraries are mature and its syntax stays out of the way: NumPy for arrays, pandas for tables, matplotlib for charts, scikit-learn for classic machine learning, and PyTorch or TensorFlow for deep learning. The heavy math inside those libraries is written in C or CUDA, so you get readable code with fast execution.",
    code: "import pandas as pd\n\ndf = pd.read_csv('data.csv')\nprint(df.head())\nprint(df['score'].mean())",
  },
  {
    id: "gen-web-frameworks",
    topic: "Python ecosystem",
    questions: [
      "Which Python web framework should I use?",
      "Django vs Flask vs FastAPI",
      "Can I build a website with Python?",
    ],
    keywords: ["django", "flask", "fastapi", "web", "framework", "website", "api"],
    answer:
      "Django is batteries-included: ORM, admin panel, auth, forms — best for full sites. Flask is minimal and flexible — best for small apps where you pick your own pieces. FastAPI is modern and async, built around type hints, with automatic API docs — best for JSON APIs. All three are production-ready; pick Django for a product, FastAPI for an API.",
  },
  {
    id: "gen-editor",
    topic: "Python ecosystem",
    questions: [
      "Which editor or IDE is best for Python?",
      "Should I use VS Code or PyCharm?",
      "What tools do Python developers use?",
    ],
    keywords: ["ide", "editor", "vscode", "pycharm", "jupyter", "tools"],
    answer:
      "VS Code with the Python extension is the common free choice; PyCharm gives deeper refactoring and debugging out of the box; Jupyter notebooks suit data exploration. Alongside the editor, most Python developers use a virtual environment (venv), a formatter (black or ruff format), a linter (ruff or flake8), and pytest for tests.",
  },
  {
    id: "gen-python-2-3",
    topic: "Python ecosystem",
    questions: [
      "Python 2 vs Python 3?",
      "Which Python version should I use?",
      "Is Python 2 still supported?",
    ],
    keywords: ["version", "python 2", "python 3", "upgrade", "supported"],
    answer:
      "Always use Python 3. Python 2 reached end of life in 2020 and receives no fixes. Install the latest stable Python 3 release unless a library you depend on lags behind, in which case use the newest version that library supports.",
    code: "python3 --version",
  },
  {
    id: "gen-scripting-vs-programming",
    topic: "Programming general",
    questions: [
      "What is programming?",
      "What is the difference between a script and a program?",
      "What is an algorithm?",
    ],
    keywords: ["programming", "script", "algorithm", "code", "software"],
    answer:
      "Programming is writing precise instructions a computer can execute. An algorithm is the step-by-step plan behind those instructions, independent of language. A script usually means a shorter program run top-to-bottom to automate a task, while a 'program' or 'application' suggests something larger and long-running — in Python the distinction is only about size and intent, not technology.",
  },
  {
    id: "gen-debugging-mindset",
    topic: "Learning Python",
    questions: [
      "How do I get better at debugging?",
      "My code does not work, what should I do?",
      "How do I fix an error I do not understand?",
    ],
    keywords: ["debug", "stuck", "broken", "not working", "fix", "help"],
    answer:
      "Work bottom-up: read the last line of the traceback, it names the error type and the line. Print or breakpoint() the values just before that line — most bugs are a variable holding something you did not expect. Shrink the code to the smallest piece that still fails, then search the exact error message. If you paste the error text and the failing lines here, I can point at the likely cause.",
    code: "def total(items):\n    breakpoint()  # inspect items here\n    return sum(items)",
  },
  {
    id: "gen-identity",
    topic: "About this assistant",
    questions: [
      "Who are you?",
      "What can you do?",
      "What are your capabilities?",
      "How can you help me?",
      "What do you know?",
      "What questions can I ask?",
      "Hello",
      "Hi there",
      "Help",
    ],
    keywords: ["you", "bot", "assistant", "help", "hello", "hi", "hey",
      "capabilities", "know", "do", "chatbot", "pyquery"],
    answer:
      "I am PyQuery, a Python question-answering assistant. I match your question against a built-in Python knowledge base — no external AI — and return the closest answer with its topic and match score. Ask me about syntax, data types, lists, dictionaries, loops, functions, classes, files, errors, libraries, or general programming and learning advice.",
  },
];
