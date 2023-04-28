export default function bubbleSort(bookshelf) {
    const moves = [];
    do {
        var swapped = false;
        for (let i = 1; i < bookshelf.length; i++) {
            moves.push({
                indices: [i - 1, i],
                type: "compare"
            });
            if (bookshelf[i - 1].name > bookshelf[i].name) {
                swapped = true;
                moves.push({
                    indices: [i - 1, i],
                    type: "swap"
                });
                [bookshelf[i - 1], bookshelf[i]] = [bookshelf[i], bookshelf[i - 1]];
            }
        }
    } while (swapped);
    return moves;
}
