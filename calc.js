let decimalBtn = document.getElementById('calc-decimal')
let clearBtn = document.getElementById('calc-clear')
let backspaceBtn = document.getElementById('calc-backspace')
let displayValElement = document.getElementById('calc-display')

let calcNumBtns = document.getElementsByClassName('calc-btn-num')
let calcOperatorBtns = document.getElementsByClassName('calc-btn-operator')

let displayVal = '0'
let pendingVal
let evalStringArray = []

let updateDisplayVal = (clickObj) => {
    let btnText = clickObj.target.innerHTML
    if (displayVal === '0') {
        displayVal = ''
    }
    displayVal += btnText
    displayValElement.innerHTML = displayVal
}
let performOperation = (clickObj) => {
    function perform(operation) {
        pendingVal = displayVal
        displayVal = '0'
        displayValElement.innerHTML = displayVal
        evalStringArray.push(pendingVal)
        evalStringArray.push(operation)
    }
    let operator = clickObj.target.innerHTML
    switch (operator) {
        case '+':
            perform('+')
            break
        case '－':
            perform('-')
            break
        case 'x':
            perform('*')
            break
        case '÷':
            perform('/')
            break
        case '=':
            evalStringArray.push(displayVal)
            let evaluation = eval(evalStringArray.join(' '))
            displayVal = evaluation
            displayValElement.innerHTML = displayVal
            evalStringArray = []
            // pendingVal = undefined
            break
        default:
            break
    }
}

for (let button of calcNumBtns) {
    button.addEventListener('click', updateDisplayVal, false)
}
for (let operator of calcOperatorBtns) {
    operator.addEventListener('click', performOperation, false)
}

clearBtn.onclick = () => {
    displayVal = '0'
    pendingVal = undefined
    evalStringArray = []
    displayValElement.innerHTML = displayVal
}

backspaceBtn.onclick = () => {
    displayVal = displayVal.slice(0, -1)
    if (displayVal.charAt(displayVal.length - 1) === '.')
    displayVal = displayVal.slice(0, -1)
    if (displayVal === '')
        displayVal = '0'
    displayValElement.innerHTML = displayVal
}
decimalBtn.onclick = () => {
    if (!displayVal.includes('.')) {
        displayVal += '.'
    }
    displayValElement.innerHTML = displayVal
}

