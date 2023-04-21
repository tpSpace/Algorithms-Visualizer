import * as sorting from './sorting.js';

// Constants
const DEFAULT_NUM_BARS = 50;
const MIN_NUM_BARS = 3;
const MAX_NUM_BARS = 200;
const MAX_BAR_HEIGHT = 300;
const MIN_BAR_HEIGHT = 5;

// Variables
let array = [];
let arrayStack = []; // Stack to store array states
let numBars = DEFAULT_NUM_BARS;
const arrayContainer = document.getElementById('canvas');
const numBarsInput = document.getElementById('numBars');
const resetButton = document.getElementById('reset-button');
const goButton = document.getElementById('go-button');
const worstCaseButton = document.getElementById('worst-case-button');
const randomizeButton = document.getElementById('randomize-button');
const algorithmSelect = document.getElementById('algorithm-select');


const algorithms = {
  'selection': sorting.selectionSort,
  'merge': sorting.mergeSort,
  'bubble': sorting.bubbleSort,
  'quick': sorting.quickSort,
  'insertion': sorting.insertionSort,
};

// Functions
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isValidNumBars(numBars) {
  if (numBars < MIN_NUM_BARS || numBars > MAX_NUM_BARS) {
    alert('Invalid number. Please enter a value between 3 and 200.');
    return false;
  }
  return true;
}

function updateNumBarsInput() {
  if(!isNaN(parseInt(numBarsInput.value))){
    numBars = parseInt(numBarsInput.value);
    generateArray(numBars);
  } else {
    numBars = DEFAULT_NUM_BARS;
  }
}

function updateSelectedAlgorithm() {
  const selectedAlgorithm = algorithmSelect.value;
  const algorithmFunction = algorithms[selectedAlgorithm];
  console.log(algorithmFunction)
  console.log(`Selected algorithm: ${selectedAlgorithm}`)

  if (algorithmFunction) {
    algorithmFunction(array);
  } else {
    console.log(`Invalid algorithm: ${selectedAlgorithm}`);
    alert("Please choose a valid algorithm!");
  }
  
}

function displayArray() {
  arrayContainer.innerHTML = '';
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement('div');
    bar.className = 'array-bar';
    bar.style.height = `${array[i]}px`;
    arrayContainer.appendChild(bar);
  }
}

function generateArray(numBars) {
  arrayStack.length = 0 // clear the stack
  array = Array.from({length: numBars}, () => getRandomInt(MIN_BAR_HEIGHT, MAX_BAR_HEIGHT));
  arrayStack = [...array];
  displayArray();
}

function generateWorstCaseArray(numBars = DEFAULT_NUM_BARS) {
  array = Array.from({length: numBars}, (_, i) => MAX_BAR_HEIGHT - MAX_BAR_HEIGHT * (i / numBars));
  arrayStack = [...array];
  displayArray();
}

function resetArray() {
  if (arrayStack.length > 0) {
    array = [...arrayStack]; // get the original array from the top of the stack
    displayArray(); // display the original array
  } else {
    generateArray(); // generate a new random array with default value
  }
}

// Event listeners
window.onload = () => {
  generateArray(DEFAULT_NUM_BARS);
};
  
resetButton.addEventListener('click', () => {
  resetArray()
});
  
randomizeButton.addEventListener('click', () => {
  if (isValidNumBars(numBars)) generateArray(numBars);
});
  
worstCaseButton.addEventListener('click', () => {
  if (isValidNumBars(numBars)) generateWorstCaseArray(numBars);
});
  
numBarsInput.addEventListener('input', () => {
  updateNumBarsInput;
});

numBars = numBarsInput.addEventListener('input', updateNumBarsInput);
  
goButton.addEventListener('click', () => {
  if (isValidNumBars(numBars)) updateSelectedAlgorithm();
});
  
algorithmSelect.addEventListener('change', () => {
  updateSelectedAlgorithm();
});
