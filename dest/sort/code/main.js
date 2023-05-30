import Book from './Book.js';
import createText from './popup.js';
import bubbleSort from './sortingAlgorithms/BubbleSort.js';
import selectionSort from './sortingAlgorithms/SelectionSort.js';
import insertionSort from './sortingAlgorithms/InsertionSort.js';
import quickSort from './sortingAlgorithms/QuickSort.js';
// import mergeSort from './sortingAlgorithms/MergeSort';
const bookshelfContainer = document.getElementById('bookshelf_container');
const above = document.getElementById('augmented_container');
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
    // merge:{
    //   name: 'Merge Sort',
    //   algo: mergeSort,
    // }
};
let books = DEFAULT_NUM_BOOKS;
let bookshelf = [];
let bookshelfStack = [];
let timeOut = DEFAULT_TIMEOUT;
let selectedAlgo = "";
createBookshelf();
//Add event listeners to DOM elements
document.getElementById('go-button').addEventListener('click', () => {
    go();
});
document.getElementById('random-button').addEventListener('click', () => {
    random();
});
document.getElementById('reset-button').addEventListener('click', () => {
    reset();
});
document.getElementById('worst-case-button').addEventListener('click', () => {
    createWorstBookshelf();
});
document.querySelector('#slider_books input').addEventListener('input', function () {
    books = Number(this.value);
    document.querySelector('#value_books').textContent = this.value + " books.";
    createBookshelf();
});
document.querySelector('#slider_time input').addEventListener('input', function () {
    timeOut = Number(this.value);
    document.querySelector('#value_time').textContent = this.value + "ms";
});
document.getElementById('format').addEventListener('change', function () {
    selectedAlgo = this.value;
});
//Helper functions
function go() {
    const copy = [...bookshelf];
    const sort = sortingBooks[selectedAlgo];
    if (sort == undefined) {
        createText("Please select an algorithm.", "red");
        return;
    }
    featureEnabling(false);
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
        const book = visualizeBook(bookshelf[i]);
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
        createText("The bookshelf is sorted!", "lime");
        featureEnabling(true);
        return;
    }
    const move = moves.shift();
    const [i, j] = move.indices;
    if (move.type === "swap") {
        [bookshelf[i], bookshelf[j]] = [bookshelf[j], bookshelf[i]];
    }
    visualizeBookshelf(move);
    // setTimeout(function () {
    //   visualizeBookshelf();
    // }, timeOut);
    setTimeout(function () {
        animate(moves);
    }, timeOut);
}
function visualizeBook(book) {
    const newBook = document.createElement('div');
    newBook.classList.add('book');
    newBook.style.backgroundColor = book.color;
    const newBookName = document.createElement('span');
    newBookName.textContent = book.name;
    newBook.appendChild(newBookName);
    return newBook;
}
function displayBookshelfConsole(bookshelf) {
    const bookNames = bookshelf.map((book) => book.name);
    console.log(bookNames.join(", "));
}
displayBookshelfConsole(bookshelf);
function featureEnabling(bool) {
    if (!bool) {
        document.getElementById('go-button').setAttribute('disabled', String(bool));
        document.getElementById('random-button').setAttribute('disabled', String(bool));
        document.getElementById('reset-button').setAttribute('disabled', String(bool));
        document.getElementById('worst-case-button').setAttribute('disabled', String(bool));
        document.getElementById('number_book_input').setAttribute('disabled', String(bool));
    }
    else {
        document.getElementById('go-button').removeAttribute('disabled');
        document.getElementById('random-button').removeAttribute('disabled');
        document.getElementById('reset-button').removeAttribute('disabled');
        document.getElementById('worst-case-button').removeAttribute('disabled');
        document.getElementById('number_book_input').removeAttribute('disabled');
    }
}
