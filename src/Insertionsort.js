function sort(a, animation) {
    const length = a.length
    for (let i = 1; i < length; i++) {
        const mini_animation = []
        for (let j = i; j > 0; j--) {
            mini_animation.push({ "position": j, "old_value": a[j], "new_value": 0, "type": "value_check" })
            if (a[j] < a[j - 1]) {
                a = exch(a, j, j - 1);
                mini_animation.push({
                    "position_j": j, "old_value_j": a[j], "new_value_j": a[j - 1], "type": "swap_position_j_and_j_1",
                    "position_j_minus_1": j - 1, "old_value_j_minus_1": a[j - 1], "new_value_j_minus_1": a[j]
                })

            }
            else {
                break
            }


        }
        animation.push(mini_animation)

    }
}


function exch(a, i, j) {
    const swap = a[i];
    a[i] = a[j];
    a[j] = swap;
    return a
}


export function Insertionsort(a) {

    const n = a.length
    const animation = []
    let arr = new Array(n)
    for (let i = 0; i < n; i++) {
        arr[i] = a[i].old_value
    }


    sort(arr, animation)
    return animation
}