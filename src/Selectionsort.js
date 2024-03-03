function sort(a, animation) {
    const length = a.length
    for (let i = 0; i < length - 1; i++) {
        let cur_best = i
        const mini_animation = []
        for (let j = i + 1; j < length; j++) {
            mini_animation.push({ "position": j, "old_value": a[j], "new_value": 0, "type": "value_check" })
            if (a[j] < a[cur_best]) {
                mini_animation.push({ "position": j, "old_value": a[j], "new_value": 0, "type": "cur_best" })
                cur_best = j
            }


        }
        a = exch(a, i, cur_best);
        mini_animation.push({
            "position_i": i, "old_value_i": a[i], "new_value_i": a[cur_best], "type": "swap_position_i_j",
            "position_j": cur_best, "old_value_j": a[cur_best], "new_value_j": a[i]
        })
        animation.push(mini_animation)
    }
}


function exch(a, i, j) {
    const swap = a[i];
    a[i] = a[j];
    a[j] = swap;
    return a
}


export function Selectionsort(a) {
    const n = a.length
    const animation = []
    let arr = new Array(n)
    for (let i = 0; i < n; i++) {
        arr[i] = a[i].old_value
    }
    sort(arr, animation)
    return animation
}