export default function selectionSort(bookshelf) {
    const moves = [];
    var swapped;
    do {
        swapped = false;
        for (let i = 0; i < bookshelf.length - 1; i++) {
            moves.push({
                indices: [i, i + 1],
                type: "compare"
            });
            if (bookshelf[i].name > bookshelf[i + 1].name) {
                swapped = true;
                moves.push({
                    indices: [i, i + 1],
                    type: "swap"
                });
                [bookshelf[i], bookshelf[i + 1]] = [bookshelf[i + 1], bookshelf[i]];
            }
        }
    } while (swapped);
    return moves;
}
