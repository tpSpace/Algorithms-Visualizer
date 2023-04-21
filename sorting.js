export async function selectionSort(array) {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < array.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }

        // Swap elements
        let temp = array[minIdx];
        array[minIdx] = array[i];
        array[i] = temp;

        // Visualize swap
        bars[i].style.height = `${array[i]}px`;
        bars[minIdx].style.height = `${array[minIdx]}px`;
        bars[i].style.backgroundColor = '#dc3545'; // Red
        bars[minIdx].style.backgroundColor = '#28a745'; // Green
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 100)
        );
        bars[i].style.backgroundColor = '#007bff'; // Blue
        bars[minIdx].style.backgroundColor = '#007bff'; // Blue
    }
}

export async function bubbleSort(array) {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
  
          // Visualize swap
          bars[j].style.height = `${array[j]}px`;
          bars[j + 1].style.height = `${array[j + 1]}px`;
          bars[j].style.backgroundColor = '#dc3545'; // Red
          bars[j + 1].style.backgroundColor = '#28a745'; // Green
          await new Promise((resolve) => 
            setTimeout(() => {
                resolve();
            }, 100)
        );
          bars[j].style.backgroundColor = '#007bff'; // Blue
          bars[j + 1].style.backgroundColor = '#007bff'; // Blue
        }
      }
    }
  }

export async function insertionSort(array) {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 1; i < array.length; i++) {
      let key = array[i];
      let j = i - 1;
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        bars[j + 1].style.height = `${array[j + 1]}px`;
        j--;
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      array[j + 1] = key;
      bars[j + 1].style.height = `${array[j + 1]}px`;
      bars[i].style.backgroundColor = '#28a745'; // Green
      await new Promise((resolve) => setTimeout(resolve, 100));
      bars[i].style.backgroundColor = '#007bff';
    }
  }

export async function mergeSort(array) {
    const bars = document.getElementsByClassName('array-bar');
    array = await mergeSortHelper(array, 0, array.length - 1, bars);
}
  
async function mergeSortHelper(array, start, end, bars) {
    if (start === end) return [array[start]];


    const mid = Math.floor((start + end) / 2);
    bars[mid].style.backgroundColor = '#ffc107'; // Yellow
    const leftArr = await mergeSortHelper(array, start, mid, bars);
    const rightArr = await mergeSortHelper(array, mid + 1, end, bars);
    bars[mid].style.backgroundColor = '#007bff'; // Blue

    let leftIdx = 0;
    let rightIdx = 0;
    let output = [];

    while (leftIdx < leftArr.length && rightIdx < rightArr.length) {
        if (leftArr[leftIdx] < rightArr[rightIdx]) {
        output.push(leftArr[leftIdx]);
        bars[start + output.length - 1].style.height = `${leftArr[leftIdx]}px`;
        leftIdx++;
        } else {
        output.push(rightArr[rightIdx]);
        bars[start + output.length - 1].style.height = `${rightArr[rightIdx]}px`;
        rightIdx++;
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
    }

    while (leftIdx < leftArr.length) {
        output.push(leftArr[leftIdx]);
        bars[start + output.length - 1].style.height = `${leftArr[leftIdx]}px`;
        leftIdx++;
        await new Promise((resolve) => setTimeout(resolve, 100));
    }

    while (rightIdx < rightArr.length) {
        output.push(rightArr[rightIdx]);
        bars[start + output.length - 1].style.height = `${rightArr[rightIdx]}px`;
        rightIdx++;
        await new Promise((resolve) => setTimeout(resolve, 100));
    }

    for (let i = 0; i < output.length; i++) {
        array[start + i] = output[i];
    }
    return output;
}
  
export async function quickSort(array) {
    const bars = document.getElementsByClassName('array-bar');
    
    async function partition(low, high) {
      let i = low - 1;
      let pivot = array[high];
      bars[high].style.backgroundColor = '#ffc107'; // Yellow
      for (let j = low; j <= high - 1; j++) {
        bars[j].style.backgroundColor = '#dc3545'; // Red
        await new Promise((resolve) => setTimeout(resolve, 100));
        if (array[j] < pivot) {
          i++;
          let temp = array[j];
          array[j] = array[i];
          array[i] = temp;
          bars[i].style.height = `${array[i]}px`;
          bars[j].style.height = `${array[j]}px`;
        }
        bars[j].style.backgroundColor = '#007bff'; // Blue
      }
      let temp = array[i + 1];
      array[i + 1] = array[high];
      array[high] = temp;
      bars[i + 1].style.height = `${array[i + 1]}px`;
      bars[high].style.height = `${array[high]}px`;
      bars[high].style.backgroundColor = '#007bff'; // Blue
      return i + 1;
    }
    
    async function sort(low, high) {
      if (low < high) {
        let pi = await partition(low, high);
        await sort(low, pi - 1);
        await sort(pi + 1, high);
      }
    }
    
    await sort(0, array.length - 1);
    for (let i = 0; i < array.length; i++) {
      //bars[i].style.backgroundColor = '#28a745'; // Green
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }