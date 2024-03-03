function merge(a, aux, lo, mid, hi, animation) {
    const mini_animation = []
    // Copy value to auxiliary array
    for (let k = lo; k <= hi; k++) {
        aux[k] = a[k];
    }
    let i = lo
    let j = mid + 1;

    for (let k = lo; k <= hi; k++) {
        if (i > mid) {
            mini_animation.push({ "position": k, "old_value": a[k], "new_value": aux[j] })
            a[k] = aux[j++]
        } else if (j > hi) {
            mini_animation.push({ "position": k, "old_value": a[k], "new_value": aux[i] })
            a[k] = aux[i++]
        } else if (aux[j] < aux[i]) {
            mini_animation.push({ "position": k, "old_value": a[k], "new_value": aux[j] })
            a[k] = aux[j++]
        } else {
            mini_animation.push({ "position": k, "old_value": a[k], "new_value": aux[i] })
            a[k] = aux[i++]
        }
    }
    animation.push(mini_animation)

}

export function Mergesort(a) {
    const n = a.length
    const animation = []
    const aux = new Array(n);
    let arr = new Array(n)
    for (let i = 0; i < n; i++) {
        arr[i] = a[i].old_value
    }

    for (let len = 1; len < n; len *= 2) {
        for (let lo = 0; lo < n - len; lo += len + len) {
            const mid = lo + len - 1;
            const hi = Math.min(lo + len + len - 1, n - 1);
            merge(arr, aux, lo, mid, hi, animation);
        }
    }
    return animation

}

