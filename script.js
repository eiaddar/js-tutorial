// JavaScript Learning Journey - Interactive Tutorial
// Main application logic

class JavaScriptTutorial {
    constructor() {
        this.currentLevel = 'beginner';
        this.completedLessons = new Set();
        this.totalLessons = 9;
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupProgressTracking();
        this.setupCodeExecution();
        this.setupPlayground();
        this.loadProgress();
        this.updateProgress();
    }

    setupNavigation() {
        // Handle both old nav-link and new sidebar-nav-link elements
        const navLinks = document.querySelectorAll('.nav-link, .sidebar-nav-link');
        const sections = document.querySelectorAll('.lesson-section');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Check if it's an external link (not a hash link and no data-level)
                const href = link.getAttribute('href');
                const level = link.dataset.level;
                
                if (!href.startsWith('#') && !level) {
                    // Allow external links to work normally
                    return;
                }
                
                // Only prevent default for internal section links
                if (level) {
                    e.preventDefault();
                    this.switchLevel(level);
                }
            });
        });
    }

    switchLevel(level) {
        // Update navigation - handle both old and new navigation elements
        document.querySelectorAll('.nav-link, .sidebar-nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to the clicked link
        const activeLink = document.querySelector(`[data-level="${level}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Update sections
        document.querySelectorAll('.lesson-section').forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(level);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        this.currentLevel = level;
    }

    setupProgressTracking() {
        // Track lesson completion
        const lessons = document.querySelectorAll('.lesson');
        lessons.forEach(lesson => {
            const lessonNumber = lesson.dataset.lesson;
            const runButton = lesson.querySelector('.run-code-btn');
            
            if (runButton) {
                runButton.addEventListener('click', () => {
                    this.markLessonComplete(lessonNumber);
                });
            }
        });
    }

    markLessonComplete(lessonNumber) {
        this.completedLessons.add(lessonNumber);
        this.updateProgress();
        this.saveProgress();
        
        // Add visual feedback
        const lesson = document.querySelector(`[data-lesson="${lessonNumber}"]`);
        if (lesson) {
            lesson.style.borderLeft = '5px solid #27ae60';
            lesson.style.background = 'linear-gradient(90deg, #d5f4e6 0%, #f8f9fa 100%)';
        }
    }

    updateProgress() {
        const progress = (this.completedLessons.size / this.totalLessons) * 100;
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (progressFill && progressText) {
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}% Complete`;
        }
    }

    saveProgress() {
        localStorage.setItem('jsTutorialProgress', JSON.stringify({
            completedLessons: Array.from(this.completedLessons),
            currentLevel: this.currentLevel
        }));
    }

    loadProgress() {
        const saved = localStorage.getItem('jsTutorialProgress');
        if (saved) {
            const data = JSON.parse(saved);
            this.completedLessons = new Set(data.completedLessons || []);
            this.currentLevel = data.currentLevel || 'beginner';
            
            // Restore visual state
            this.completedLessons.forEach(lessonNumber => {
                const lesson = document.querySelector(`[data-lesson="${lessonNumber}"]`);
                if (lesson) {
                    lesson.style.borderLeft = '5px solid #27ae60';
                    lesson.style.background = 'linear-gradient(90deg, #d5f4e6 0%, #f8f9fa 100%)';
                }
            });
        }
    }

    setupCodeExecution() {
        // Override console.log to capture output
        this.originalConsoleLog = console.log;
        this.originalConsoleError = console.error;
        
        console.log = (...args) => {
            this.originalConsoleLog(...args);
            this.captureOutput(args.join(' '), 'log');
        };
        
        console.error = (...args) => {
            this.originalConsoleError(...args);
            this.captureOutput(args.join(' '), 'error');
        };
    }

    captureOutput(message, type = 'log') {
        // This will be used by individual lesson functions
        if (this.currentOutputElement) {
            const timestamp = new Date().toLocaleTimeString();
            const className = type === 'error' ? 'error' : 'success';
            this.currentOutputElement.innerHTML += `<div class="${className}">[${timestamp}] ${message}</div>`;
            this.currentOutputElement.scrollTop = this.currentOutputElement.scrollHeight;
        }
    }

    setupPlayground() {
        // Setup code editor features
        const playgroundCode = document.getElementById('playgroundCode');
        if (playgroundCode) {
            // Add basic syntax highlighting
            playgroundCode.addEventListener('input', () => {
                this.highlightSyntax(playgroundCode);
            });
        }
    }

    highlightSyntax(textarea) {
        // Basic syntax highlighting for playground
        const code = textarea.value;
        const keywords = ['function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return', 'async', 'await'];
        const highlighted = code.replace(
            new RegExp(`\\b(${keywords.join('|')})\\b`, 'g'),
            '<span style="color: #ff6b6b;">$1</span>'
        );
        // This is a simplified version - in a real app you'd use a proper syntax highlighter
    }
}

// Lesson-specific code execution functions
function runLessonCode(lessonId) {
    const outputElement = document.getElementById(`output${lessonId.slice(-1)}`);
    if (!outputElement) return;

    // Clear previous output
    outputElement.innerHTML = '';
    
    // Set current output element for console capture
    tutorial.currentOutputElement = outputElement;

    try {
        switch (lessonId) {
            case 'lesson1':
                runLesson1();
                break;
            case 'lesson2':
                runLesson2();
                break;
            case 'lesson3':
                runLesson3();
                break;
            case 'lesson4':
                runLesson4();
                break;
            case 'lesson5':
                runLesson5();
                break;
            case 'lesson6':
                runLesson6();
                break;
            case 'lesson7':
                runLesson7();
                break;
            case 'lesson8':
                runLesson8();
                break;
            case 'lesson9':
                runLesson9();
                break;
        }
    } catch (error) {
        tutorial.captureOutput(`Error: ${error.message}`, 'error');
    }
}

// Lesson 1: Variables and Data Types
function runLesson1() {
    console.log("=== VARIABLES AND DATA TYPES DEMO ===");
    
    // VARIABLE DECLARATIONS
    console.log("\n--- Variable Declarations ---");
    let name = "John";
    const age = 25;
    var city = "New York";
    
    console.log("Variables:");
    console.log("Name (let):", name);
    console.log("Age (const):", age);
    console.log("City (var):", city);
    
    // Demonstrating const immutability
    console.log("\n--- Const vs Let ---");
    let score = 0;
    score = 100; // This works with let
    console.log("Score (let) - can be reassigned:", score);
    
    // age = 26; // This would cause an error with const
    console.log("Age (const) - cannot be reassigned:", age);
    
    // DATA TYPES
    console.log("\n--- Data Types ---");
    let string = "Hello World";
    let anotherString = 'Single quotes also work';
    let templateString = `Template literals with ${name}`;
    
    let number = 42;
    let decimal = 3.14;
    let negative = -10;
    
    let boolean = true;
    let isStudent = false;
    
    let array = [1, 2, 3];
    let fruits = ["apple", "banana", "orange"];
    let mixed = [1, "hello", true];
    
    let object = { 
        name: "John", 
        age: 25, 
        isStudent: true 
    };
    
    let undefinedVar;
    let nullVar = null;
    
    console.log("1. String types:");
    console.log("  - Double quotes:", string, "- Type:", typeof string);
    console.log("  - Single quotes:", anotherString, "- Type:", typeof anotherString);
    console.log("  - Template literal:", templateString, "- Type:", typeof templateString);
    
    console.log("\n2. Number types:");
    console.log("  - Integer:", number, "- Type:", typeof number);
    console.log("  - Decimal:", decimal, "- Type:", typeof decimal);
    console.log("  - Negative:", negative, "- Type:", typeof negative);
    
    console.log("\n3. Boolean types:");
    console.log("  - True:", boolean, "- Type:", typeof boolean);
    console.log("  - False:", isStudent, "- Type:", typeof isStudent);
    
    console.log("\n4. Array types:");
    console.log("  - Numbers:", array, "- Type:", typeof array);
    console.log("  - Strings:", fruits, "- Type:", typeof fruits);
    console.log("  - Mixed:", mixed, "- Type:", typeof mixed);
    
    console.log("\n5. Object types:");
    console.log("  - Object:", object, "- Type:", typeof object);
    console.log("  - Object name:", object.name, "- Type:", typeof object.name);
    console.log("  - Object age:", object.age, "- Type:", typeof object.age);
    
    console.log("\n6. Special types:");
    console.log("  - Undefined:", undefinedVar, "- Type:", typeof undefinedVar);
    console.log("  - Null:", nullVar, "- Type:", typeof nullVar);
    
    // TYPE CHECKING
    console.log("\n--- Type Checking ---");
    console.log("Is '42' a number?", typeof "42" === "number");
    console.log("Is 42 a number?", typeof 42 === "number");
    console.log("Is array an object?", typeof array === "object");
    console.log("Is null an object?", typeof null === "object"); // JavaScript quirk!
}

// Lesson 2: Functions
function runLesson2() {
    console.log("=== FUNCTIONS DEMO ===");
    
    // 1. FUNCTION DECLARATION
    console.log("\n--- Function Declaration ---");
    function greet(name) {
        return "Hello, " + name + "!";
    }
    
    // 2. FUNCTION EXPRESSION
    console.log("\n--- Function Expression ---");
    const add = function(a, b) {
        return a + b;
    };
    
    // 3. ARROW FUNCTION
    console.log("\n--- Arrow Function ---");
    const multiply = (a, b) => a * b;
    
    // Arrow function with multiple statements
    const divide = (a, b) => {
        if (b === 0) {
            return "Cannot divide by zero!";
        }
        return a / b;
    };
    
    // Arrow function with single parameter
    const square = x => x * x;
    
    // Arrow function with no parameters
    const getCurrentTime = () => new Date().toLocaleTimeString();
    
    // 4. FUNCTION WITH DEFAULT PARAMETERS
    console.log("\n--- Default Parameters ---");
    function greetWithDefault(name = "Guest") {
        return `Welcome, ${name}!`;
    }
    
    // 5. FUNCTION WITH MULTIPLE PARAMETERS
    function createUser(name, age, email, isActive = true) {
        return {
            name: name,
            age: age,
            email: email,
            isActive: isActive,
            createdAt: new Date()
        };
    }
    
    // CALLING FUNCTIONS
    console.log("\n--- Function Calls ---");
    console.log("Function Declaration:", greet("Alice"));
    console.log("Function Expression (5 + 3):", add(5, 3));
    console.log("Arrow Function (4 * 6):", multiply(4, 6));
    console.log("Division (10 / 2):", divide(10, 2));
    console.log("Division by zero:", divide(10, 0));
    console.log("Square of 5:", square(5));
    console.log("Current time:", getCurrentTime());
    console.log("Default parameter:", greetWithDefault());
    console.log("With argument:", greetWithDefault("John"));
    console.log("User object:", createUser("Jane", 25, "jane@email.com"));
    
    // 6. FUNCTION WITH MULTIPLE PARAMETERS AND SWITCH
    console.log("\n--- Advanced Function ---");
    const calculate = (operation, a, b) => {
        switch(operation) {
            case 'add': return a + b;
            case 'subtract': return a - b;
            case 'multiply': return a * b;
            case 'divide': return a / b;
            default: return "Invalid operation";
        }
    };
    
    console.log("Calculate add(10, 5):", calculate('add', 10, 5));
    console.log("Calculate subtract(10, 3):", calculate('subtract', 10, 3));
    console.log("Calculate multiply(4, 7):", calculate('multiply', 4, 7));
    console.log("Calculate divide(20, 4):", calculate('divide', 20, 4));
    console.log("Invalid operation:", calculate('power', 2, 3));
    
    // 7. HIGHER-ORDER FUNCTIONS
    console.log("\n--- Higher-Order Functions ---");
    function createMultiplier(factor) {
        return function(number) {
            return number * factor;
        };
    }
    
    const double = createMultiplier(2);
    const triple = createMultiplier(3);
    
    console.log("Double 5:", double(5));
    console.log("Triple 4:", triple(4));
    
    // 8. RECURSIVE FUNCTION
    console.log("\n--- Recursive Function ---");
    function factorial(n) {
        if (n <= 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }
    
    console.log("Factorial of 5:", factorial(5));
    console.log("Factorial of 3:", factorial(3));
}

// Lesson 3: Loops and Conditionals
function runLesson3() {
    // If-else statements
    let score = 85;
    console.log("Score:", score);
    if (score >= 90) {
        console.log("Grade: A");
    } else if (score >= 80) {
        console.log("Grade: B");
    } else {
        console.log("Grade: C");
    }
    
    // For loop
    console.log("\nFor loop (1 to 5):");
    for (let i = 1; i <= 5; i++) {
        console.log("Count: " + i);
    }
    
    // While loop
    console.log("\nWhile loop:");
    let count = 0;
    while (count < 3) {
        console.log("While count: " + count);
        count++;
    }
    
    // For...of loop with array
    const fruits = ["apple", "banana", "orange"];
    console.log("\nFor...of loop with fruits:");
    for (const fruit of fruits) {
        console.log("Fruit:", fruit);
    }
    
    // Switch statement
    const day = "Monday";
    console.log("\nSwitch statement for day:", day);
    switch (day) {
        case "Monday":
            console.log("Start of work week");
            break;
        case "Friday":
            console.log("TGIF!");
            break;
        default:
            console.log("Regular day");
    }
}

// Lesson 4: Objects and Arrays
function runLesson4() {
    // Object
    const person = {
        name: "John",
        age: 30,
        hobbies: ["reading", "coding"],
        greet: function() {
            return `Hello, I'm ${this.name}`;
        }
    };
    
    console.log("Person object:", person);
    console.log("Greeting:", person.greet());
    console.log("Name:", person.name);
    console.log("Hobbies:", person.hobbies.join(", "));
    
    // Array methods
    const numbers = [1, 2, 3, 4, 5];
    console.log("\nOriginal array:", numbers);
    
    const doubled = numbers.map(n => n * 2);
    console.log("Doubled:", doubled);
    
    const evens = numbers.filter(n => n % 2 === 0);
    console.log("Even numbers:", evens);
    
    const sum = numbers.reduce((acc, n) => acc + n, 0);
    console.log("Sum:", sum);
    
    const found = numbers.find(n => n > 3);
    console.log("First number > 3:", found);
    
    // Object methods
    const calculator = {
        result: 0,
        add: function(x) {
            this.result += x;
            return this;
        },
        multiply: function(x) {
            this.result *= x;
            return this;
        },
        getResult: function() {
            return this.result;
        }
    };
    
    const calcResult = calculator.add(5).multiply(3).getResult();
    console.log("\nCalculator result (5 + 0) * 3:", calcResult);
}

// Lesson 5: DOM Manipulation
function runLesson5() {
    console.log("DOM Manipulation Demo");
    
    // Find elements
    const button = document.getElementById('demoButton');
    const output = document.getElementById('demoOutput');
    
    if (button && output) {
        console.log("Found demo button and output elements");
        
        // Add event listener
        button.addEventListener('click', function() {
            const currentTime = new Date().toLocaleTimeString();
            output.innerHTML = `Button clicked at: ${currentTime}`;
            output.style.color = 'green';
            console.log("Button clicked! Time:", currentTime);
        });
        
        // Create new element
        const newDiv = document.createElement('div');
        newDiv.textContent = 'This is a new element created by JavaScript!';
        newDiv.className = 'new-element';
        newDiv.style.cssText = 'background: #e3f2fd; padding: 1rem; margin: 1rem 0; border-radius: 8px; border-left: 4px solid #2196f3;';
        document.querySelector('.lesson-content').appendChild(newDiv);
        
        console.log("New element created and added to DOM");
    } else {
        console.log("Demo elements not found");
    }
}

// Lesson 6: Event Handling
function runLesson6() {
    console.log("Event Handling Demo");
    
    // DOM ready event
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM is ready!');
    });
    
    // Mouse events
    const hoverDiv = document.getElementById('hoverDiv');
    if (hoverDiv) {
        hoverDiv.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'lightblue';
            console.log('Mouse entered hover div');
        });
        
        hoverDiv.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'lightgray';
            console.log('Mouse left hover div');
        });
        
        hoverDiv.addEventListener('click', function() {
            console.log('Hover div was clicked!');
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }
    
    // Keyboard events
    document.addEventListener('keydown', function(event) {
        console.log('Key pressed:', event.key, 'Code:', event.code);
    });
    
    // Form events (if any forms exist)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
        });
    });
}

// Lesson 7: Promises and Async/Await
async function runLesson7() {
    console.log("Promises and Async/Await Demo");
    
    // Promise
    function fetchData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Data fetched successfully!");
            }, 2000);
        });
    }
    
    // Async/Await
    async function getData() {
        try {
            console.log("Fetching data...");
            const result = await fetchData();
            console.log(result);
            return result;
        } catch (error) {
            console.error("Error:", error);
        }
    }
    
    // Fetch API
    async function fetchUserData() {
        try {
            console.log("Fetching user data from API...");
            const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const user = await response.json();
            console.log("User data:", user.name, "-", user.email);
        } catch (error) {
            console.error("Fetch error:", error.message);
        }
    }
    
    // Run async functions
    await getData();
    await fetchUserData();
    
    // Promise.all example
    console.log("\nPromise.all example:");
    const promises = [
        fetch('https://jsonplaceholder.typicode.com/posts/1'),
        fetch('https://jsonplaceholder.typicode.com/posts/2'),
        fetch('https://jsonplaceholder.typicode.com/posts/3')
    ];
    
    try {
        const responses = await Promise.all(promises);
        const data = await Promise.all(responses.map(r => r.json()));
        console.log("Multiple posts fetched:", data.map(post => post.title));
    } catch (error) {
        console.error("Promise.all error:", error.message);
    }
}

// Lesson 8: ES6+ Features
function runLesson8() {
    console.log("ES6+ Features Demo");
    
    // Destructuring
    const person = { name: "John", age: 30, city: "NYC" };
    const { name, age } = person;
    const [first, second, ...rest] = [1, 2, 3, 4, 5];
    
    console.log("Destructuring - Name:", name, "Age:", age);
    console.log("Array destructuring - First:", first, "Second:", second, "Rest:", rest);
    
    // Template literals
    const greeting = `Hello, ${name}! You are ${age} years old.`;
    console.log("Template literal:", greeting);
    
    // Spread operator
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];
    const combined = [...arr1, ...arr2];
    console.log("Spread operator - Combined arrays:", combined);
    
    // Object spread
    const obj1 = { a: 1, b: 2 };
    const obj2 = { c: 3, d: 4 };
    const merged = { ...obj1, ...obj2 };
    console.log("Object spread - Merged objects:", merged);
    
    // Classes
    class Animal {
        constructor(name) {
            this.name = name;
        }
        
        speak() {
            return `${this.name} makes a sound`;
        }
    }
    
    class Dog extends Animal {
        speak() {
            return `${this.name} barks`;
        }
        
        fetch() {
            return `${this.name} fetches the ball`;
        }
    }
    
    const dog = new Dog("Buddy");
    console.log("Class inheritance - Dog speaks:", dog.speak());
    console.log("Class method - Dog fetches:", dog.fetch());
    
    // Arrow functions with this
    const obj = {
        name: "Arrow Function Demo",
        regularFunction: function() {
            console.log("Regular function this:", this.name);
        },
        arrowFunction: () => {
            console.log("Arrow function this:", this); // undefined in strict mode
        }
    };
    
    obj.regularFunction();
    obj.arrowFunction();
}

// Lesson 9: Modules and Error Handling
function runLesson9() {
    console.log("Modules and Error Handling Demo");
    
    // Error handling
    function divide(a, b) {
        if (b === 0) {
            throw new Error("Division by zero is not allowed");
        }
        return a / b;
    }
    
    try {
        const result = divide(10, 2);
        console.log("Division result (10/2):", result);
        
        const errorResult = divide(10, 0);
        console.log("This won't print");
    } catch (error) {
        console.error("Error caught:", error.message);
    } finally {
        console.log("Finally block always runs");
    }
    
    // Custom error class
    class ValidationError extends Error {
        constructor(message) {
            super(message);
            this.name = "ValidationError";
        }
    }
    
    function validateAge(age) {
        if (typeof age !== 'number') {
            throw new ValidationError("Age must be a number");
        }
        if (age < 0) {
            throw new ValidationError("Age cannot be negative");
        }
        if (age > 150) {
            throw new ValidationError("Age seems unrealistic");
        }
        return true;
    }
    
    try {
        validateAge(25);
        console.log("Age validation passed for 25");
        validateAge(-5);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error("Validation error:", error.message);
        } else {
            console.error("Unexpected error:", error.message);
        }
    }
    
    // Module pattern (simulated)
    const Calculator = (function() {
        let result = 0;
        
        return {
            add: function(x) {
                result += x;
                return this;
            },
            multiply: function(x) {
                result *= x;
                return this;
            },
            getResult: function() {
                return result;
            },
            reset: function() {
                result = 0;
                return this;
            }
        };
    })();
    
    const calcResult = Calculator.add(5).multiply(3).getResult();
    console.log("Calculator result (5 * 3):", calcResult);
    
    Calculator.reset().add(10).multiply(2);
    console.log("Calculator result after reset (10 * 2):", Calculator.getResult());
    
    // Try-catch with async
    async function asyncErrorHandling() {
        try {
            const response = await fetch('https://invalid-url-that-does-not-exist.com');
            const data = await response.json();
            console.log("This won't print");
        } catch (error) {
            console.error("Async error caught:", error.message);
        }
    }
    
    asyncErrorHandling();
}

// Playground functions
function runPlaygroundCode() {
    const code = document.getElementById('playgroundCode').value;
    const output = document.getElementById('playgroundOutput');
    
    if (!output) return;
    
    // Clear previous output
    output.innerHTML = '';
    
    // Set up console capture for playground
    const originalLog = console.log;
    const originalError = console.error;
    
    console.log = (...args) => {
        originalLog(...args);
        output.innerHTML += args.join(' ') + '\n';
    };
    
    console.error = (...args) => {
        originalError(...args);
        output.innerHTML += 'ERROR: ' + args.join(' ') + '\n';
    };
    
    try {
        // Execute the code
        eval(code);
    } catch (error) {
        console.error('Execution error:', error.message);
    } finally {
        // Restore original console methods
        console.log = originalLog;
        console.error = originalError;
    }
}

function clearPlayground() {
    document.getElementById('playgroundCode').value = '// Write your JavaScript code here\nconsole.log(\'Hello, World!\');';
    document.getElementById('playgroundOutput').innerHTML = '';
}

// Initialize the tutorial when DOM is loaded
let tutorial;
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu on all pages
    initializeMobileMenu();
    
    // Check if we're on a tutorial page
    if (document.querySelector('.lesson-section')) {
        tutorial = new JavaScriptTutorial();
        console.log('Tutorial initialized!');
        
        // Add some interactive features
        addInteractiveFeatures();
    } else {
        // Initialize basic features for index page
        initializeIndexPage();
    }
});

function initializeIndexPage() {
    console.log('Index page initialized!');
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add animation to stats on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe stat items
    document.querySelectorAll('.stat-item').forEach(item => {
        observer.observe(item);
    });
}

// Mobile Menu Functionality
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navigation = document.querySelector('.navigation');
    
    if (mobileMenuToggle && navigation) {
        mobileMenuToggle.addEventListener('click', function() {
            // Toggle active class on navigation
            navigation.classList.toggle('active');
            
            // Toggle active class on button
            this.classList.toggle('active');
            
            // Change icon
            const icon = this.querySelector('i');
            if (navigation.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link, .sidebar-nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navigation.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navigation.contains(e.target)) {
                navigation.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close menu on window resize if screen becomes larger
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navigation.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
    }
}

function animateStats(statItem) {
    const statNumber = statItem.querySelector('.stat-number');
    const finalValue = statNumber.textContent;
    
    // Remove non-numeric characters and get the number
    const numericValue = parseInt(finalValue.replace(/\D/g, ''));
    
    if (numericValue && numericValue > 0) {
        let currentValue = 0;
        const increment = numericValue / 50; // 50 steps
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
                statNumber.textContent = finalValue;
                clearInterval(timer);
            } else {
                statNumber.textContent = Math.floor(currentValue) + (finalValue.includes('%') ? '%' : '+');
            }
        }, 30);
    }
}

function addInteractiveFeatures() {
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+Enter to run code in playground
        if (e.ctrlKey && e.key === 'Enter') {
            const activeSection = document.querySelector('.lesson-section.active');
            if (activeSection && activeSection.id === 'playground') {
                // Check which playground is active
                if (document.getElementById('playgroundCode')) {
                    runPlaygroundCode();
                } else if (document.getElementById('htmlPlaygroundCode')) {
                    runHTMLPlayground();
                } else if (document.getElementById('cssPlaygroundCode')) {
                    runCSSPlayground();
                } else if (document.getElementById('phpPlaygroundCode')) {
                    runPHPPlayground();
                }
            }
        }
    });
    
    // Add tooltips for code blocks
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        block.title = 'Click "Run Code" to execute this example';
    });
    
    // Add copy to clipboard functionality
    const runButtons = document.querySelectorAll('.run-code-btn');
    runButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add a small animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// HTML Playground Functions
function runHTMLPlayground() {
    const code = document.getElementById('htmlPlaygroundCode').value;
    const output = document.getElementById('htmlPlaygroundOutput');
    
    if (!output) return;
    
    try {
        // Create a complete HTML document
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>HTML Playground</title>
                <style>
                    body {
                        font-family: 'Tajawal', Arial, sans-serif;
                        margin: 0;
                        padding: 20px;
                        background: #f8f9fa;
                        direction: rtl;
                    }
                </style>
            </head>
            <body>
                ${code}
            </body>
            </html>
        `;
        
        // Write to iframe
        output.srcdoc = htmlContent;
        
        // Add success feedback
        showPlaygroundFeedback('HTML تم تنفيذه بنجاح!', 'success');
    } catch (error) {
        showPlaygroundFeedback('خطأ في HTML: ' + error.message, 'error');
    }
}

function clearHTMLPlayground() {
    document.getElementById('htmlPlaygroundCode').value = `<!DOCTYPE html>
<html lang="ar">
<head>
    <title>صفحتي الأولى</title>
</head>
<body>
    <h1>مرحباً بالعالم!</h1>
    <p>هذه صفحتي الأولى</p>
</body>
</html>`;
    document.getElementById('htmlPlaygroundOutput').srcdoc = '';
}

// CSS Playground Functions
function runCSSPlayground() {
    const code = document.getElementById('cssPlaygroundCode').value;
    const output = document.getElementById('cssPlaygroundOutput');
    
    if (!output) return;
    
    try {
        // Create a style element and apply the CSS
        const style = document.createElement('style');
        style.textContent = code;
        
        // Clear previous styles
        const existingStyle = output.querySelector('style');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        // Add new styles
        output.appendChild(style);
        
        // Add success feedback
        showPlaygroundFeedback('CSS تم تطبيقه بنجاح!', 'success');
    } catch (error) {
        showPlaygroundFeedback('خطأ في CSS: ' + error.message, 'error');
    }
}

function clearCSSPlayground() {
    document.getElementById('cssPlaygroundCode').value = `/* اكتب أنماط CSS هنا */
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 20px;
}

h1 {
    color: #333;
    text-align: center;
}

.box {
    width: 200px;
    height: 200px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    margin: 20px auto;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    transition: transform 0.3s ease;
}

.box:hover {
    transform: scale(1.1) rotate(5deg);
}`;
    
    // Reset the preview
    const output = document.getElementById('cssPlaygroundOutput');
    const existingStyle = output.querySelector('style');
    if (existingStyle) {
        existingStyle.remove();
    }
}

// Playground Feedback Function
function showPlaygroundFeedback(message, type) {
    // Remove existing feedback
    const existingFeedback = document.querySelector('.playground-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = `playground-feedback ${type}`;
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background: #27ae60;' : 'background: #e74c3c;'}
    `;
    
    document.body.appendChild(feedback);
    
    // Remove after 3 seconds
    setTimeout(() => {
        feedback.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 300);
    }, 3000);
}

// PHP Playground Functions
function runPHPPlayground() {
    const code = document.getElementById('phpPlaygroundCode').value;
    const output = document.getElementById('phpPlaygroundOutput');

    if (!output) return;

    try {
        // Since we can't execute PHP directly in the browser, we'll simulate it
        // In a real environment, this would send the code to a PHP server
        output.innerHTML = '<div class="php-simulation">';
        output.innerHTML += '<p><strong>ملاحظة:</strong> هذا محاكي لـ PHP. في البيئة الحقيقية، سيتم إرسال الكود إلى خادم PHP.</p>';
        output.innerHTML += '<div class="code-output">';
        
        // Simple PHP simulation for basic echo statements
        let simulatedOutput = simulatePHPOutput(code);
        output.innerHTML += simulatedOutput;
        output.innerHTML += '</div></div>';
        
        showPlaygroundFeedback('تم تشغيل الكود بنجاح!', 'success');
    } catch (error) {
        showPlaygroundFeedback('خطأ في PHP: ' + error.message, 'error');
    }
}

function simulatePHPOutput(code) {
    let output = '';
    
    // Remove PHP tags for simulation
    let cleanCode = code.replace(/<\?php/g, '').replace(/\?>/g, '');
    
    // Simple echo simulation
    const echoMatches = cleanCode.match(/echo\s+['"]([^'"]*)['"];?/g);
    if (echoMatches) {
        echoMatches.forEach(match => {
            const text = match.match(/echo\s+['"]([^'"]*)['"];?/);
            if (text) {
                output += text[1] + '<br>';
            }
        });
    }
    
    // Simulate variable output
    const varMatches = cleanCode.match(/echo\s+['"]([^'"]*)\s*\.\s*\$(\w+)/g);
    if (varMatches) {
        varMatches.forEach(match => {
            const parts = match.match(/echo\s+['"]([^'"]*)\s*\.\s*\$(\w+)/);
            if (parts) {
                output += parts[1] + '[قيمة المتغير: ' + parts[2] + ']<br>';
            }
        });
    }
    
    // Simulate for loop
    if (cleanCode.includes('for')) {
        output += 'نتائج الحلقة:<br>';
        for (let i = 1; i <= 5; i++) {
            output += i + '<br>';
        }
    }
    
    if (!output) {
        output = 'لا يوجد مخرجات للعرض. جرب استخدام echo لطباعة النتائج.';
    }
    
    return output;
}

function clearPHPPlayground() {
    document.getElementById('phpPlaygroundCode').value = `<?php
// اكتب كود PHP هنا
echo 'مرحباً بالعالم!';
echo '<br>';
echo 'أهلاً وسهلاً في ملعب PHP';

// مثال على المتغيرات
$name = 'أحمد';
$age = 25;
echo '<br><br>';
echo 'الاسم: ' . $name;
echo '<br>';
echo 'العمر: ' . $age;

// مثال على الحلقات
echo '<br><br>الأرقام من 1 إلى 5:<br>';
for ($i = 1; $i <= 5; $i++) {
    echo $i . '<br>';
}
?>`;
    document.getElementById('phpPlaygroundOutput').innerHTML = '';
}
