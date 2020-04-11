const calculator = document.getElementById('calculator');
const buttons = Array.from(document.getElementsByTagName('button'));

function input() {
    console.log(event.target.value);
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
