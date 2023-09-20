export const mergeSortAnimations = array => {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
};

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        animations.push([i, j, true]); 
        animations.push([i, j, true]);  
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push([k, auxiliaryArray[i], false]);  
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            animations.push([k, auxiliaryArray[j], false]); 
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        animations.push([i, i, true]);  
        animations.push([i, i, true]);  
        animations.push([k, auxiliaryArray[i], false]);  
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        animations.push([j, j, true]);  
        animations.push([j, j, true]);  
        animations.push([k, auxiliaryArray[j], false]);  
        mainArray[k++] = auxiliaryArray[j++];
    }
}

export const quickSortAnimations = array => {
    const animations = [];
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
};

function quickSortHelper(array, startIdx, endIdx, animations) {
    if (startIdx >= endIdx) return;
    const pivotIdx = partition(array, startIdx, endIdx, animations);
    quickSortHelper(array, startIdx, pivotIdx - 1, animations);
    quickSortHelper(array, pivotIdx + 1, endIdx, animations);
}

function partition(array, startIdx, endIdx, animations) {
    const pivotValue = array[endIdx];
    let pivotIdx = startIdx;
    for (let i = startIdx; i < endIdx; i++) {
        animations.push([i, endIdx, true]);  
        animations.push([i, endIdx, true]);  
        if (array[i] < pivotValue) {
            animations.push([i, array[pivotIdx], false]);
            animations.push([pivotIdx, array[i], false]);
            [array[i], array[pivotIdx]] = [array[pivotIdx], array[i]];
            pivotIdx++;
        }
    }
    animations.push([pivotIdx, endIdx, true]);
    animations.push([pivotIdx, endIdx, true]);
    animations.push([pivotIdx, array[endIdx], false]);
    [array[pivotIdx], array[endIdx]] = [array[endIdx], array[pivotIdx]];
    return pivotIdx;
}



export const heapSortAnimations = array => {
    const animations = [];
    let length = array.length;

    for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
        heapify(array, length, i, animations);
    }

    for (let i = length - 1; i > 0; i--) {
        animations.push([0, i, true]);  
        animations.push([0, i, true]);  

        animations.push([0, array[i], false]);
        animations.push([i, array[0], false]);
        [array[0], array[i]] = [array[i], array[0]];

        heapify(array, i, 0, animations);
    }
    return animations;
};

function heapify(array, length, i, animations) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < length && array[left] > array[largest]) {
        largest = left;
    }

    if (right < length && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        animations.push([i, largest, true]);  
        animations.push([i, largest, true]);  

        animations.push([i, array[largest], false]);
        animations.push([largest, array[i], false]);
        [array[i], array[largest]] = [array[largest], array[i]];

        heapify(array, length, largest, animations);
    }
}

export const bubbleSortAnimations = array => {
    const animations = [];
    let n = array.length;
    
    for (let i = 0; i < n-1; i++) {
        for (let j = 0; j < n-i-1; j++) {
            animations.push([j, j+1, true]); 
            animations.push([j, j+1, true]); 
            if (array[j] > array[j+1]) {
                animations.push([j, array[j+1], false]);
                animations.push([j+1, array[j], false]);
                [array[j], array[j+1]] = [array[j+1], array[j]];
            }
        }
    }
    return animations;
};
