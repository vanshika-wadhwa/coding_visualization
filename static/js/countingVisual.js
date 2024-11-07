document.getElementById('sizeForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const size = document.getElementById('size').value;
    createInputFields(size);
});

document.getElementById('inputForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const array = [];
    const inputs = document.querySelectorAll('.array-input');
    inputs.forEach(input => {
        array.push(parseInt(input.value));
    });
    countingSort(array);
});

function createInputFields(size) {
    const inputContainer = document.getElementById('inputContainer');
    inputContainer.innerHTML = '';
    for (let i = 0; i < size; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'array-input px-3 py-2 rounded-md bg-transparent border-2 outline-none border-zinc-800 m-1';
        inputContainer.appendChild(input);
    }
    document.getElementById('inputForm').style.display = 'block';
}

async function countingSort(array) {
    const originalArrayContainer = document.getElementById('originalArray');
    const countingArrayContainer = document.getElementById('countingArray');
    const sortedArrayContainer = document.getElementById('sortedArray');
    const info = document.getElementById('info');

    let maxElement = Math.max(...array);
    let countArray = new Array(maxElement + 1).fill(0);
    let sortedArray = new Array(array.length).fill(0);

    // Display the original array
    displayArray(array, originalArrayContainer);

    // Step 1: Count occurrences
    info.textContent = "Counting occurrences of each element...";
    array.forEach(num => {
        countArray[num]++;
        displayArray(countArray, countingArrayContainer, "array-element");
    });
    await delay(1000);

    // Step 2: Accumulate counts
    info.textContent = "Accumulating counts in the counting array...";
    for (let i = 1; i < countArray.length; i++) {
        countArray[i] += countArray[i - 1];
        displayArray(countArray, countingArrayContainer, "array-element");
        await delay(1000);
    }

    // Step 3: Place elements in sorted order
    info.textContent = "Placing elements in sorted order...";
    for (let i = array.length - 1; i >= 0; i--) {
        const num = array[i];
        sortedArray[countArray[num] - 1] = num;
        countArray[num]--;
        displayArray(sortedArray, sortedArrayContainer, "sorted-element");
        await delay(1000);
    }

    info.textContent = "Array has been sorted!";
}

function displayArray(arr, container, className = "array-element") {
    container.innerHTML = '';
    arr.forEach(value => {
        const element = document.createElement('div');
        element.className = className;
        element.textContent = value !== undefined ? value : '';
        container.appendChild(element);
    });
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
