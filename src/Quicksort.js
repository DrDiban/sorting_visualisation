function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function sort(a, lo, hi, animation) {

    if (hi <= lo) {

        if (lo < a.length && lo >= 0) {
            animation.push([{ "position": lo, "old_value": a[lo], "new_value": 0, "type": "start_point" }, {
                "position_lo": lo, "old_value_lo": a[lo], "new_value_lo": a[lo], "type": "swap_position_lo_j",
                "position_j": lo, "old_value_j": a[lo], "new_value_j": a[lo]
            }])
        }

        return;

    }
    const j = partition(a, lo, hi, animation);

    sort(a, lo, j - 1, animation);
    sort(a, j + 1, hi, animation);
}

function partition(a, lo, hi, animation) {
    const mini_animation = []
    mini_animation.push({ "position": lo, "old_value": a[lo], "new_value": 0, "type": "start_point" })
    var i = lo + 1;
    var j = hi;
    const v = a[lo];
    while (true) {
        // find item on lo to swap

        while (a[i] < v) {
            mini_animation.push({ "position": i, "old_value": a[i], "new_value": 0, "type": "i_pos_value_check" })
            if (i === hi) {
                break
            }

            i += 1
        }
        if (i >= lo + 1 && i < j) {
            mini_animation.push({ "position": i, "old_value": a[i], "new_value": 0, "type": "i_pos_value_check" })
        }

        // find item on hi to swap
        while (v < a[j]) {
            mini_animation.push({ "position": j, "old_value": a[j], "new_value": 0, "type": "j_pos_value_check" })
            if (j === lo) { break }

            j -= 1
        }
        if (j > i && j <= hi) {
            mini_animation.push({ "position": j, "old_value": a[j], "new_value": 0, "type": "j_pos_value_check" })
        }

        // check if pointers cross
        if (i >= j) { break }
        a = exch(a, i, j);
        mini_animation.push({
            "position_i": i, "old_value_i": a[i], "new_value_i": a[j], "type": "swap_position_i_j",
            "position_j": j, "old_value_j": a[j], "new_value_j": a[i],



        })
        i++
        j--
    }

    // put partitioning item v at a[j]
    a = exch(a, lo, j);
    mini_animation.push({
        "position_lo": lo, "old_value_lo": a[lo], "new_value_lo": a[j], "type": "swap_position_lo_j",
        "position_j": j, "old_value_j": a[j], "new_value_j": a[lo]
    })

    // now, a[lo .. j-1] <= a[j] <= a[j+1 .. hi]
    animation.push(mini_animation)
    return j;
}

function exch(a, i, j) {
    const swap = a[i];
    a[i] = a[j];
    a[j] = swap;
    return a
}


export function Quicksort(a) {
    const n = a.length
    const animation = []
    let arr = new Array(n)
    for (let i = 0; i < n; i++) {
        arr[i] = a[i].old_value
    }
    // arr = shuffleArray(arr)


    sort(arr, 0, arr.length - 1, animation)
    return animation
}