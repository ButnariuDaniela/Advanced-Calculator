const buttons = [];
for (let i = 0; i < 10; i++){
    const digit = document.querySelector(`#digit${i}`);
    buttons.push(digit);
}
const digitPoint = document.querySelector('#point')
const multiply = document.querySelector('#multiply');
const divide = document.querySelector('#divide');
const add = document.querySelector('#add');
const subtract = document.querySelector('#subtract');
const resultDiv = document.querySelector('.result');
const operationSign = document.querySelector('#operation-sign');
const equals = document.querySelector("#equals");

let firstNumber = 0;
let secondNumber = 0;
let operator = '0';
let result = 0;
let startBuildingSecondNumber = false;
let float = 0;

function buildNumber(digit) {
    if (float === 0) {
        if (startBuildingSecondNumber === false) {
            firstNumber = firstNumber * 10 + digit;
            if (firstNumber.toString().length < 10){
                resultDiv.innerHTML = firstNumber
            }else {
                resultDiv.innerHTML = science(firstNumber)
            }   
        } else {
            secondNumber = secondNumber * 10 + digit;
            if (secondNumber.toString().length < 10){
                resultDiv.innerHTML = secondNumber
            }else {
                resultDiv.innerHTML = science(secondNumber)
            }
        }
    } else { 
        if (startBuildingSecondNumber === false) {
            firstNumber = firstNumber + digit / (10 ** float);
            resultDiv.innerHTML = science(firstNumber);
            float++
        }  else {
            secondNumber = secondNumber + digit / (10 ** float);
            resultDiv.innerHTML = science(secondNumber);
            float++
        }
    }    
}

function science(results) {
        let numberContent = results.toString().split('.');
        let power = numberContent[0].length - 1;
        let totalL = results.toString().length - 1;
        if (power > 10) {
            results = results / (10 ** Number (power));
            results = results.toString().substr(0, 7) + 'E+' + power;
            return results;
        }else if (numberContent.length === 2 && totalL > 10) {
            results = results.toFixed(numberContent[1].length - totalL + 10);
            return results;
        } else {
            return results;
        }
    }

digitPoint.addEventListener('click', () => {
    float = 1;
});

for (let i = 0; i < 10; i++){
    buttons[i].addEventListener('click', () => {
        buildNumber(i);
    });   
}

multiply.addEventListener('click', () => {
    float = 0;
    operationSign.innerText = '*';
    if (operator !== "=" && operator !== '') {
        executeOperation(operator);
        secondNumber = 0;
    }
    operator = '*';
    startBuildingSecondNumber = true;  
});

divide.addEventListener('click', () => {
    float = 0;
    operationSign.innerText = '/';
    if (operator !== "=" && operator !== '') {
        executeOperation(operator);
        secondNumber = 0;
    }
    operator = '/';
    startBuildingSecondNumber = true;  
});

add.addEventListener('click', () => {
    float = 0;
    operationSign.innerText = '+';
    if (operator !== "=" && operator !== '') {
        executeOperation(operator);
        secondNumber = 0;
    }
    startBuildingSecondNumber = true;
    operator = '+';
});

subtract.addEventListener('click', () => {
    float = 0;
    operationSign.innerText = '-';
    if (operator !== "=" && operator !== '') {
        executeOperation(operator);
        secondNumber = 0;
    }
    startBuildingSecondNumber = true;
    operator = '-';
});

cancel.addEventListener('click', () => {
    reset()
    resultDiv.innerHTML = '0';
});

equals.addEventListener('click', () => {
    executeOperation(operator);
    float = 0;
    operationSign.innerHTML = '=';
    operator = "=";
    firstNumber = result;
    secondNumber = 0;
});

function executeOperation(operator){
    switch (operator) {
        case '*':
            result = firstNumber * secondNumber;
            resultDiv.innerHTML = science(result);
            startBuildingSecondNumber = false;
            firstNumber = result;
            secondNumber = 0;
            return result;
        case '/':
            result = firstNumber / secondNumber;
            resultDiv.innerHTML = science(result);
            startBuildingSecondNumber = false;
            firstNumber = result;
            secondNumber = 0;
            return result;
        case '+':
            result = firstNumber + secondNumber;
            resultDiv.innerHTML = science(result);
            startBuildingSecondNumber = false;
            firstNumber = result;
            secondNumber = 0;
            return result;
        case '-':
            result = firstNumber - secondNumber;
            resultDiv.innerHTML = science(result);
            startBuildingSecondNumber = false;
            firstNumber = result;
            secondNumber = 0;
            return result;
    } 
}

function reset() {
    float = 0;
    firstNumber = 0;
    secondNumber = 0;
    result = 0;
    resultDiv.innerHTML = 0;
    operator = '';
    startBuildingSecondNumber = false;
    operationSign.innerHTML = ' ';
}
