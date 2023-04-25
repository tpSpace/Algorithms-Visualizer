export default async function bubbleSort(array) {
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