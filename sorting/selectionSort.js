export default async function selectionSort(array) {
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