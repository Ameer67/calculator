const calculator = document.getElementById('calculator');
const buttons = Array.from(document.getElementsByTagName('button'));

document.addEventListener('keypress', input);
buttons.forEach(function(btn) {
    btn.addEventListener('click', input)
})

let inputArray = [];
let answer;

function input() {
    // Check if on-screen button was pressed or keyboard
    const inputValue = event.type == 'keypress' ? event.key.toLowerCase() : event.target.value;
    const previousElementIndex = inputArray.length - 1;
    let previousElement = inputArray[previousElementIndex];

    // Check if clear button was pressed.
    if (inputValue == 'c') {
        clearInput();
    }

    // Check if input is operation +-*/
    if (isOperation(inputValue) && (answer != undefined || inputArray.length > 0)) {
        // Check if previous element ends with a dot, if it does, add 0 after dot
        if (hasDot(previousElement[previousElement.length - 1])) {
            inputArray[previousElementIndex] += 0;
        }

        // Now check if previous element is a number
        if (isNumber(previousElement)) { 
            answer = undefined;
            inputArray.push(inputValue);
        } else { 
            inputArray[previousElementIndex] = inputValue;
        }
    }

    /* Undefine answer variable (if it is defined) since either an operator 
    has already been applied to inputArray or we will be typing a number
    after the answer has been given */
    if (answer != undefined) {
        answer = undefined;
        clearInput();
    }
    
    // Check if enter button was pressed.
    if (inputValue == 'enter') {
        event.preventDefault();
        if (inputArray.length > 2) {
            getAnswer();
        }
        return;
    }

    // Check if input is number
    if (isNumber(inputValue)) {
        inputArray.length == 0 || isOperation(previousElement) ? 
            inputArray.push(inputValue) :
            inputArray[previousElementIndex] += inputValue;
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

function getAnswer() { 
    /* Check if there's an operator at the end. Example: 4 * 5 +
    Will remove the + sign */
    if (isOperation(inputArray[inputArray.length -1])) {
        removeExtraOperations();
    }

    if (inputArray.length > 2) {
        ['*', '/', '+', '-'].forEach((operator) => operationToFind(operator))
    }
    
    inputArray[0] = parseFloat(inputArray[0].toPrecision(15));
    answer = inputArray[0];
    updateDisplay(answer);

    return;
}


function updateDisplay(){
    const display = document.getElementById('answer-container');
    display.textContent = ''; // Clear 

    if (arguments.length == 1) {
        isFinite(arguments[0]) ? 
            display.textContent = arguments[0] : 
            display.textContent = 'Cannot divide by zero!';
    } else {
        inputArray.forEach((element) => {
            switch (element) {
                case '*':
                    element = '\u00D7';
                    break;
                case '/':
                    element = '\u00F7';
                    break;
                case '-':
                    element = '\u2212'
                    break;
            }
    
            display.textContent += element + ' ';
        });
    }
}

