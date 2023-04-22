export default async function quickSort(array) {
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