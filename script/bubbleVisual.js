document.getElementById('sizeForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    let size = document.getElementById('size').value;
    size = parseInt(size);

    // Error handling
    if (isNaN(size) || size <= 0) {
        alert("Please enter a valid size.");
        return;
    }

    let inputContainer = document.getElementById('inputContainer');
    inputContainer.innerHTML = ''; // Clear previous inputs if any

    for (let i = 0; i < size; i++) {
        let inputElement = document.createElement('input');
        inputElement.className = 'px-3 py-2 rounded-md bg-transparent border-2 outline-none border-zinc-800';
        inputElement.type = 'text';
        inputElement.placeholder = 'Input';
        inputElement.name = 'input[]'; // Use array notation for inputs
    inputContainer.appendChild(inputElement);
    }

    document.getElementById('inputForm').style.display = 'block'; // Show input form
});

document.getElementById('inputForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    let inputs = document.getElementsByName('input[]');
    let array = [];

    for (let input of inputs) {
        let value = parseInt(input.value);
        if (!isNaN(value)) {
            array.push(value);
        }
    }

    visualizeBubbleSort(array);
});

async function visualizeBubbleSort(array) {
    let visualization = document.getElementById('visualization');
    let info = document.getElementById('info');
    let complexity = document.getElementById('complexity');
    visualization.innerHTML = ''; // Clear previous visualization
    info.innerHTML = ''; // Clear previous info
    complexity.innerHTML = ''; // Clear previous complexity info

    let elements = [];
    let totalSwaps = 0;
    let totalMovements = 0;

    function createVisualization() {
        let container = document.createElement('div');
        container.className = 'element-container';
        visualization.appendChild(container);

        array.forEach((value, index) => {
            let element = document.createElement('div');
            element.className = 'element';
            element.textContent = value;
            element.style.left = `${index * 60}px`; // Adjust spacing as needed
            container.appendChild(element);
            elements.push(element);
        });
    }

    function updateSwapInfo(iteration, swaps) {
        let iterationInfo = document.createElement('div');
        iterationInfo.className = 'iteration';
        iterationInfo.innerHTML = `<h4 class="text-xl mb-2">Iteration ${iteration}:</h4>`;
        info.appendChild(iterationInfo);

        let swapInfo = document.createElement('div');
        swapInfo.className = 'swap-info';
        swapInfo.textContent = `Swaps: ${swaps}`;
        iterationInfo.appendChild(swapInfo);
    }

    function displaySwapCount(swaps) {
        let swapCountDiv = document.createElement('div');
        swapCountDiv.className = 'swap-count';
        swapCountDiv.textContent = `Total Swaps in this iteration: ${swaps}`;
        info.appendChild(swapCountDiv);
    }

    function logMovement(iteration, movements) {
        let movementLog = document.createElement('div');
        movementLog.className = 'movement-log';
        movementLog.innerHTML = `<h4 class="text-xl mb-2">Movements for Iteration ${iteration}:</h4><pre>${movements.join('\n')}</pre>`;
        info.appendChild(movementLog);
    }

    createVisualization();

    let startTime = performance.now(); // Start time for time complexity analysis
    for (let i = 0; i < array.length - 1; i++) {
        let swaps = 0;
        let movements = [];
        for (let j = 0; j < array.length - 1 - i; j++) {
            elements[j].classList.add('swapped');
            elements[j + 1].classList.add('swapped');

            if (array[j] > array[j + 1]) {
                // Log the swap
                movements.push(`Swap elements at index ${j} and ${j + 1}`);

                // Swap values in the array
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                // Swap visual elements
                await sleep(500); // Wait for animation
                let tempLeft = elements[j].style.left;
                elements[j].style.left = elements[j + 1].style.left;
                elements[j + 1].style.left = tempLeft;

                // Swap elements in the DOM
                elements[j].classList.remove('swapped');
                elements[j + 1].classList.remove('swapped');

                [elements[j], elements[j + 1]] = [elements[j + 1], elements[j]];

                swaps++;
                totalSwaps++;
            } else {
                await sleep(500); // Wait for animation
                elements[j].classList.remove('swapped');
                elements[j + 1].classList.remove('swapped');
            }
        }

        totalMovements += movements.length;

        updateSwapInfo(i + 1, swaps);
        displaySwapCount(swaps);
        logMovement(i + 1, movements);

        // Create updated visualization for the next iteration
        elements = [];
        createVisualization();
    }
    let endTime = performance.now(); // End time for time complexity analysis

    // Display time complexity
    let timeComplexity = document.createElement('div');
    timeComplexity.className = 'complexity-info';
    timeComplexity.innerHTML = `<h3>Time Complexity:</h3><p>O(n^2) - The bubble sort algorithm has a quadratic time complexity.</p>`;
    complexity.appendChild(timeComplexity);

    // Display space complexity
    let spaceComplexity = document.createElement('div');
    spaceComplexity.className = 'complexity-info';
    spaceComplexity.innerHTML = `<h3>Space Complexity:</h3><p>O(1) - The bubble sort algorithm has a constant space complexity as it only requires a few extra variables.</p>`;
    complexity.appendChild(spaceComplexity);

    // Display time taken
    let timeTaken = document.createElement('div');
    timeTaken.className = 'complexity-info';
    timeTaken.innerHTML = `<h3>Time Taken:</h3><p>${(endTime - startTime).toFixed(2)} milliseconds</p>`;
    complexity.appendChild(timeTaken);

    // Display total swaps and movements
    let totalSwapsDiv = document.createElement('div');
    totalSwapsDiv.className = 'complexity-info';
    totalSwapsDiv.innerHTML = `<h3>Total Swaps:</h3><p>${totalSwaps}</p>`;
    complexity.appendChild(totalSwapsDiv);

    let totalMovementsDiv = document.createElement('div');
    totalMovementsDiv.className = 'complexity-info';
    totalMovementsDiv.innerHTML = `<h3>Total Movements:</h3><p>${totalMovements}</p>`;
    complexity.appendChild(totalMovementsDiv);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
