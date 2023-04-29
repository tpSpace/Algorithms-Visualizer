export default function quickSort(bookshelf) {
    const moves = [];
    const stack = [{ left: 0, right: bookshelf.length - 1 }];
    while (stack.length) {
        const item = stack.pop();
        if (!item) {
            continue;
        }
        const { left, right } = item;
        if (right - left < 1) {
            continue;
        }
        const pivotIndex = partition(left, right);
        stack.push({ left, right: pivotIndex - 1 });
        stack.push({ left: pivotIndex, right });
    }
    return moves;
    function partition(left, right) {
        const pivotIndex = Math.floor((left + right) / 2);
        const pivotValue = bookshelf[pivotIndex].name;
        let i = left;
        let j = right;
        while (i <= j) {
            while (bookshelf[i].name < pivotValue) {
                i++;
                moves.push({
                    indices: [i],
                    type: "compare",
                });
            }
            while (bookshelf[j].name > pivotValue) {
                j--;
                moves.push({
                    indices: [j],
                    type: "compare",
                });
            }
            if (i <= j) {
                moves.push({
                    indices: [i, j],
                    type: "swap",
                });
                [bookshelf[i], bookshelf[j]] = [bookshelf[j], bookshelf[i]];
                i++;
                j--;
            }
        }
        return i;
    }
}
