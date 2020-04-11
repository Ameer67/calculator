const calculator = document.getElementById('calculator');
const buttons = Array.from(document.getElementsByTagName('button'));

let inputArray = [];

function input() {
    let inputValue = event.target.value;
    console.log(inputValue);

    function isNumber(a) {
        if (a != '/' && a != '*' && a != '-' && a != '+' && a != 'c') {
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
    return inputArray;
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
