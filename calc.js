const calculator = document.getElementById('calculator');
const buttons = Array.from(document.getElementsByTagName('button'));

document.addEventListener('keypress', input);
buttons.forEach(function(btn) {
    btn.addEventListener('click', input)
})

let inputArray = [];

function input() {
    // Check if on-screen button was pressed or keyboard
    const inputValue = event.type == 'keypress' ? event.key.toLowerCase() : event.target.value;
    const previousElementIndex = inputArray.length - 1;
    let previousElement = inputArray[previousElementIndex];

    // Check if enter button was pressed.
    if (inputValue == 'enter') {
        event.preventDefault();
        if (inputArray.length > 2) {
            answer();
        }
        return;
    }
    
    // Check if clear button was pressed.
    if (inputValue == 'c') {
        clearInput();
    }

    // Check if input is number
    if (isNumber(inputValue)) {
        inputArray.length == 0 || isOperation(previousElement) ? 
            inputArray.push(inputValue) :
            inputArray[previousElementIndex] += inputValue;
    }
    
    // Check if input is operation +-*/
    if (isOperation(inputValue)) {
        if (hasDot(previousElement[previousElement.length - 1])) {
            inputArray[previousElementIndex] += 0;
        }
        isNumber(previousElement) ? 
            inputArray.push(inputValue) : inputArray[previousElementIndex] = inputValue;
    }

    // Check if . dot was pressed
    if (inputValue == '.') {
        if (inputArray.length == 0 || !isNumber(previousElement)) {
            inputArray.push(0 + inputValue);
        } else {
            if (isNumber(previousElement) && !hasDot(previousElement)) {
                inputArray[previousElementIndex] += inputValue;
            }
        }
    }

    console.log(inputArray);
    updateDisplay();
    return inputArray;
}

hasDot = arrayElement => /\./.test(arrayElement);

isNumber = a => /[\d]/.test(a);

isOperation = a => /[\/\*\+\-]/.test(a);

clearInput = () => inputArray = [];

add = (arr, i = 0) => {
    let a = arr[i];
    if (i >= arr.length - 1) {
        return a;
    }

    return a + add(arr, ++i);
}

subtract = (arr, i = arr.length) => {
    let a = arr[i - 1];
    if (i == 1) {
        return a;
    }

    return subtract(arr, --i) - a;
}

multiply = (arr, i = 0) => {
    let a = arr[i];
    if (i >= arr.length - 1) {
        return a;
    }

    return a * multiply(arr, ++i);
}

divide = (arr, i = arr.length) => {
    let a = arr[i - 1];
    if (i == 1) {
        return a;
    }

    return divide(arr, --i) / a;
}

function operationToFind(operation) {
    for (let i = 0; i < inputArray.length; i++) {
        let newArr = [];
        if (inputArray[i] === operation) {
            newArr.push(parseFloat(inputArray.splice(i - 1, 1)));
            newArr.push(parseFloat(inputArray.splice(i, 1)));
            inputArray.splice(i - 1, 1);
    
            if (operation === '*') {
                inputArray.splice(i - 1, 0, multiply(newArr));
            }

            if (operation === '/') {
                inputArray.splice(i - 1, 0, divide(newArr));
            }

            if (operation === '+') {
                inputArray.splice(i - 1, 0, add(newArr));
            }

            if (operation === '-') {
                inputArray.splice(i - 1, 0, subtract(newArr));
            }
            
        }
    }
}

function removeExtraOperations() {
    inputArray.pop();
}

function answer() { 
    if (isOperation(inputArray[inputArray.length -1])) {
        removeExtraOperations();
    }

    while (inputArray.length > 2) {
        operationToFind('*');
        operationToFind('/');
        operationToFind('+');
        operationToFind('-');
    }

    inputArray[0] === Infinity ? 
        inputArray = ['Cannot divide by zero'] : 
        inputArray[0] = parseFloat(inputArray[0].toPrecision(15));

    updateDisplay();
    //clearInput();
    return inputArray;
}


function updateDisplay(){
    const display = document.getElementById('answer-container');
    display.textContent = ''; // Clear 

    inputArray.forEach(function(value) {
        if (value == '*') {
            value = '\u00D7';
        }

        if (value == '/') {
            value = '\u00F7';
        }

        if (value == '-') {
            value = '\u2212';
        }

        display.textContent += value + ' ';
    });
}

