import Book from '../Book';

type Move = {
  indices: number[],
  type: string
}

export default function bubbleSort(bookshelf: Book[]) {
  const moves:Move[] = [];
  do{
    var swapped:boolean = false;
    for (let i=1; i<bookshelf.length; i++) {
      moves.push({
        indices: [i-1,i],
        type: "compare"
      });
      if(bookshelf[i-1].name > bookshelf[i].name) {
        swapped = true;
        moves.push({
          indices: [i-1,i],
          type: "swap"
        });
        [bookshelf[i-1], bookshelf[i]] = [bookshelf[i], bookshelf[i-1]];
      }
    }
  } while(swapped);
  return moves;
}
