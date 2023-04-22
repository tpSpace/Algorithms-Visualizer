export default async function insertionSort(array) {
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