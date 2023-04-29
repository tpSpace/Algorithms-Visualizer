import Book from './Book.js';
import bubbleSort from './sorting/BubbleSort.js';
import selectionSort from './sorting/SelectionSort.js';
import insertionSort from './sorting/InsertionSort.js';
import quickSort from './sorting/QuickSort.js';
const bookshelfContainer = document.getElementById('bookshelf_container');
const above = document.getElementById('augmented_container_above');
//DEFAULT
const DEFAULT_NUM_BOOKS = 20;
const DEFAULT_TIMEOUT = 100;
const sortingBooks = {
    bubble: {
        name: 'Bubble Sort',
        algo: bubbleSort,
    },
    selection: {
        name: 'Selection Sort',
        algo: selectionSort,
    },
    insertion: {
        name: 'Insertion Sort',
        algo: insertionSort,
    },
    quick: {
        name: 'Quick Sort',
        algo: quickSort,
    },
};
let books = DEFAULT_NUM_BOOKS;
let bookshelf = [];
let bookshelfStack = [];
let timeOut = DEFAULT_TIMEOUT;
let selectedAlgo = "";
createBookshelf();
//DOM elements
const goButton = document.getElementById('go-button');
const randomButton = document.getElementById('random-button');
const resetButton = document.getElementById('reset-button');
const worstCaseButton = document.getElementById('worst-case-button');
const sortingAlgoSelection = document.getElementById('format');
const sliderBooks = document.querySelector('.slider_books input');
const valueBooks = document.querySelector('.value_books');
const sliderTime = document.querySelector('.slider_time input');
const valueTime = document.querySelector('.value_time');
//Add event listeners
goButton.addEventListener('click', () => {
    go();
});
randomButton.addEventListener('click', () => {
    random();
});
resetButton.addEventListener('click', () => {
    reset();
});
worstCaseButton.addEventListener('click', () => {
    createWorstBookshelf();
});
sliderBooks.addEventListener('input', function () {
    books = Number(this.value);
    valueBooks.textContent = this.value + " books.";
    createBookshelf();
});
sliderTime.addEventListener('input', function () {
    timeOut = Number(this.value);
    valueTime.textContent = this.value + "ms";
});
sortingAlgoSelection.addEventListener('change', () => {
    selectedAlgo = sortingAlgoSelection.value;
});
//Helper functions
function go() {
    const copy = [...bookshelf];
    const sort = sortingBooks[selectedAlgo];
    if (sort == undefined)
        alert("Please select a sorting algorithm");
    const moves = sort.algo(copy);
    animate(moves);
}
function random() {
    createBookshelf();
}
function reset() {
    if (bookshelf.length > 0) {
        bookshelf = [...bookshelfStack]; // get the original array from the top of the stack
        visualizeBookshelf(); // display the original array
    }
    else {
        createBookshelf(); // generate a new random array with default value
    }
}
function createBookshelf() {
    bookshelf.length = 0;
    bookshelfStack.length = 0; // clear the stack
    for (let i = 0; i < books; i++) {
        const randomName = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        bookshelf.push(new Book(randomName));
    }
    bookshelfStack = [...bookshelf]; // save the original array to the stack
    visualizeBookshelf();
}
function createWorstBookshelf() {
    bookshelf.length = 0;
    bookshelfStack.length = 0; // clear the stack
    let characterCode = 90; // ASCII code for 'Z'
    for (let i = 0; i < books; i++) {
        const randomName = String.fromCharCode(characterCode);
        bookshelf.push(new Book(randomName));
        characterCode--;
        if (characterCode < 65) { // ASCII code for 'A'
            characterCode = 90; // wrap around to 'Z'
        }
    }
    bookshelfStack = [...bookshelf]; // save the original array to the stack
    visualizeBookshelf();
}
function visualizeBookshelf(move) {
    bookshelfContainer.innerHTML = '';
    above.innerHTML = '';
    for (let i = 0; i < bookshelf.length; i++) {
        const book = document.createElement('div');
        const bookName = document.createElement('span');
        book.classList.add('book');
        book.style.backgroundColor = bookshelf[i].color;
        bookName.textContent = bookshelf[i].name;
        book.appendChild(bookName);
        let bookAbove = document.createElement('div');
        if (move && move.indices.includes(i)) {
            book.style.opacity = '0';
            bookAbove = book.cloneNode(true);
            bookAbove.style.opacity = '1';
        }
        else {
            bookAbove.classList.add('book');
            bookAbove.style.opacity = '0';
            book.style.opacity = '1';
        }
        above.appendChild(bookAbove);
        bookshelfContainer.appendChild(book);
    }
}
function animate(moves) {
    if (moves.length == 0) {
        visualizeBookshelf();
        return;
    }
    const move = moves.shift();
    const [i, j] = move.indices;
    if (move.type === "swap") {
        [bookshelf[i], bookshelf[j]] = [bookshelf[j], bookshelf[i]];
    }
    visualizeBookshelf(move);
    setTimeout(function () {
        visualizeBookshelf();
    }, timeOut);
    setTimeout(function () {
        animate(moves);
    }, timeOut);
}
function displayBookshelfConsole(bookshelf) {
    const bookNames = bookshelf.map((book) => book.name);
    console.log(bookNames.join(", "));
}
displayBookshelfConsole(bookshelf);
