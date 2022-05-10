const display = document.getElementById('display');
const buttons = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
let operator;
let numeroAnterior;

function updateDisplay(numero) {
    if(novoNumero) {
        display.textContent = numero.toLocaleString('BR');
        novoNumero = false;
    }
    else display.textContent += numero.toLocaleString('BR');
}

const insertNumber = (event) => {
    updateDisplay(event.target.textContent);
}

buttons.forEach((button) => button.addEventListener('click', insertNumber));

const selectOperator = (event) => {
    novoNumero = true;
    operator = event.target.textContent;
    numeroAnterior = parseFloat(display.textContent.replace('.','').replace(',', '.'));
}

operadores.forEach((operator) => operator.addEventListener('click', selectOperator));

const calculate = () => {
    const actualNumber = parseFloat(display.textContent.replace('.','').replace(',', '.'));
    const result = eval(`${numeroAnterior}${operator}${actualNumber}`); 
    novoNumero = true;
    updateDisplay(result);
}

document.querySelector("#igual").addEventListener('click', calculate);

const clearDisplay = () => (display.textContent = "");

document.querySelector("#limparDisplay").addEventListener("click", clearDisplay);

const clearCalc = () => {
  clearDisplay();
  novoNumero = true;
  operator = undefined;
  numeroAnterior = undefined;
};

document.querySelector("#limparCalculo").addEventListener("click", clearCalc);

const removeLastNumber = () => 
    (display.textContent = display.textContent.slice(0,-1));

document.querySelector("#backspace").addEventListener("click", removeLastNumber);

const invertSignal = () => {
    novoNumero = true;
    updateDisplay(display.textContent * -1);
}

document.querySelector("#inverter").addEventListener("click", invertSignal);


const integer = () => display.textContent.indexOf(',') !== -1;
const checkValue = () => display.textContent.length > 0;

const decimal = () => {
        if (!integer()) {
            if (novoNumero) {
                updateDisplay('0,');
            } else {
                updateDisplay(',');
            }
        }
    };

document.querySelector("#decimal").addEventListener("click", decimal);