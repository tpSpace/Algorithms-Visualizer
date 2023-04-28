import Book from '../Book';

type Move = {
  indices: number[],
  type: string
}

export default function insertionSort(bookshelf: Book[]) {
  const moves: Move[] = [];
  for (let i = 1; i < bookshelf.length; i++) {
    const current = bookshelf[i];
    let j = i - 1;
    while (j >= 0 && bookshelf[j].name > current.name) {
      moves.push({
        indices: [j, j + 1],
        type: "shift"
      });
      bookshelf[j + 1] = bookshelf[j];
      j--;
    }
    moves.push({
      indices: [i, j + 1],
      type: "swap"
    });
    bookshelf[j + 1] = current;
  }
  return moves;
}
