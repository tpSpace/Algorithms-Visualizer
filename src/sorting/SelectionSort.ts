import Book from '../Book';

type Move = {
  indices: number[],
  type: string
}

export default function selectionSort(bookshelf: Book[]) {
  const moves: Move[] = [];
  for (let i = 0; i < bookshelf.length; i++) {
    let minIndex = i;
    moves.push({
      indices: [i, minIndex],
      type: "compare"
    });
    for (let j = i + 1; j < bookshelf.length; j++) {
      if (bookshelf[j].name < bookshelf[minIndex].name) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      moves.push({
        indices: [i, minIndex],
        type: "swap"
      });
      [bookshelf[i], bookshelf[minIndex]] = [bookshelf[minIndex], bookshelf[i]];
    }
  }
  return moves;
}
