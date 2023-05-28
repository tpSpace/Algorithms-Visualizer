export default function insertionSort(bookshelf) {
    const moves = [];
    for (let i = 1; i < bookshelf.length; i++) {
        const current = bookshelf[i];
        let j = i - 1;
        while (j >= 0 && bookshelf[j].name > current.name) {
            bookshelf[j + 1] = bookshelf[j];
            moves.push({
                indices: [j, j + 1],
                type: "swap"
            });
            j--;
        }
        bookshelf[j + 1] = current;
        moves.push({
            indices: [j + 1],
            type: "compare"
        });
    }
    return moves;
}
