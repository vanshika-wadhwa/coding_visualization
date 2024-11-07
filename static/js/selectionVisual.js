// selectionVisual.js
document.getElementById("sizeForm").addEventListener('submit',function(event){
    event.preventDefault();   //preventing from submission of form

    //fetching size n typecasting
    let size=document.getElementById('size').value;
    size=parseInt(size);

    //error handling
    if(isNaN(size) || size<=0){
        alert("enter a valid size")
        return;
    }

    //strting with main course
    let inputContainer=document.getElementById('inputContainer');
    inputContainer.innerHTML='';          //clear previous input if any

    for (let i=0; i<size; i++) {
        let inputElement=document.createElement('input');
        inputElement.className='px-3 py-2 rounded-md bg-transparent border-2 outline-none border-zinc-800';
        inputElement.type = 'text';
        inputElement.placeholder = 'Input';
        inputElement.name = 'input[]'; // Use array notation for inputs
        inputContainer.appendChild(inputElement);
    }
    document.getElementById('inputForm').style.display = 'block'; // Show input form
});

document.getElementById('inputForm').addEventListener('submit', function(event){
    event.preventDefault(); //again preventing from form submission
    let inputs=document.getElementsByName('input[]');
    let array=[];

    for(let input of inputs){
        let value=parseInt(input.value);
        if(!isNaN){
            array.push(value);
        }
    }
    visualizeSelectionSort(array);
});

async function visualizeSelectionSort(array) {
    let visualization=document.getElementById("visualization");
    let info=document.getElementById("info");
    let complexity=document.getElementById("complexity");

    visualization.innerHTML = ''; // Clear previous visualization
    info.innerHTML = ''; // Clear previous info
    complexity.innerHTML = ''; // Clear previous complexity info
    
    let elements = [];
    let totalSwaps = 0;
    let totalMovements = 0;

    function createVisualization(){
        let container=document.getElementsByName('div');
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
    


}