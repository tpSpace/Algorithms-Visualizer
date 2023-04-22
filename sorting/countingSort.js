export default async function countingSort(array) {
  const bars = document.getElementsByClassName('array-bar');
  let max = array[0], min = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
    if (array[i] < min) {
      min = array[i];
    }
  }
  let countArray = new Array(max - min + 1).fill(0);
  for (let i = 0; i < array.length; i++) {
    countArray[array[i] - min]++;
  }
  let idx = 0;
  for (let i = 0; i < countArray.length; i++) {
    while (countArray[i] > 0) {
      array[idx] = i + min;
      bars[idx].style.height = `${array[idx]}px`;
      bars[idx].style.backgroundColor = '#28a745'; // Green
      await new Promise((resolve) => setTimeout(() => resolve(), 50));
      countArray[i]--;
      idx++;
    }
  }
}

