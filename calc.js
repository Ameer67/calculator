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
    display.textContent = '';
    arr.forEach(function(value) {
        display.textContent += value;
    });
}

function doMath(...args) {
    args = args.reduce(function(acc, current) {
        return acc + current;
    })
    return args;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

buttons.forEach(function(btn) {
    btn.addEventListener('click', input)
})
