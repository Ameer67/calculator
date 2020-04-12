const calculator = document.getElementById('calculator');
const buttons = Array.from(document.getElementsByTagName('button'));

let inputArray = [];

function input() {
    let inputValue = event.target.value;
    console.log(inputValue);

    // Check if enter button was pressed.
    if (inputValue == 'enter') {
        event.preventDefault();
        return inputArray;
    }
    
    // Check if clear button was pressed.
    if (inputValue == 'c') {
        inputArray = [];
        updateDisplay(inputArray);
        return inputArray;
    }

    function foundDot(arrayIndex) {
        for (let i = 0; i < arrayIndex.length; i++) {
            if (arrayIndex[i] == '.') {
                return true;
            }
        }

        return false;
    }

    // Check if . dot was pressed
    if (inputValue == '.') {
        if (inputArray.length == 0 || isNumber(inputArray[inputArray.length - 1]) == false) {
            inputArray.push(inputValue);
        } else {
            if (isNumber(inputArray[inputArray.length - 1]) && foundDot(inputArray[inputArray.length - 1]) == false) {
                inputArray[inputArray.length - 1] += inputValue;
            }
        }

        updateDisplay(inputArray);
        return inputArray;
    }

    function isNumber(a) {
        if (a != '/' && a != '*' && a != '-' && a != '+' && a != 'c'&& a != 'enter') {
            return true;
        } else {
            return false;
        }
    }

    
    
    if (inputArray.length == 0 ) {
        if (isNumber(inputValue)) {
            inputArray.push(inputValue);
        }
    } else {
        // Check if previous value is number
        if (isNumber(inputArray[inputArray.length - 1])) {
            if (isNumber(inputValue)) {
                inputArray[inputArray.length - 1] += inputValue;
            } else {
                inputArray.push(inputValue);
            }
        
        /* If previous is not a number, then either push 
        it to the array or replace previous. */
        } else {
            if (isNumber(inputValue)) {
                inputArray.push(inputValue);
            } else {
                inputArray[inputArray.length - 1] = inputValue;
            }
        }
    }

    console.log(inputArray);
    updateDisplay(inputArray);
    return inputArray;
}

function updateDisplay(arr){
    const display = document.getElementById('answer-container');
    display.textContent = ''; // Clear 

    arr.forEach(function(value) {
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

function add(arr, i = 0) {
    let a = arr[i];
    if (i >= arr.length - 1) {
        return a;
    }

    return a + add(arr, ++i);
}

function subtract(arr, i = arr.length) {
    let a = arr[i - 1];
    if (i == 1) {
        return a;
    }

    return subtract(arr, --i) - a;
}

function multiply(arr, i = 0) {
    let a = arr[i];
    if (i >= arr.length - 1) {
        return a;
    }

    return a * multiply(arr, ++i);
}

function divide(arr, i = arr.length) {
    let a = arr[i - 1];
    if (i == 1) {
        return a;
    }

    return divide(arr, --i) / a;
}

buttons.forEach(function(btn) {
    btn.addEventListener('click', input)
})

function simplify() {    
    while (inputArray.length > 1) {
        operationToFind('*');
        operationToFind('/');
        operationToFind('+');
        operationToFind('-');
    }

    if (inputArray[0] === Infinity) {
        inputArray = ['Cannot divide by zero'];
    }

    return inputArray;
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
