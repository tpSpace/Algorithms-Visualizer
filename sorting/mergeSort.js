export default async function mergeSort(array) {
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