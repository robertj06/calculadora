const display = document.getElementById('display');
let firstValue = '';
let operator = '';
let secondValue = '';
let isResultDisplayed = false;

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const action = button.getAttribute('data-action');
        const value = button.textContent;

        if (!action) {
            if (isResultDisplayed) {
                firstValue = '';
                isResultDisplayed = false;
            }
            if (operator === '') {
                firstValue += value;
                display.textContent = firstValue;
            } else {
                secondValue += value;
                display.textContent = secondValue;
            }
        } else {
            handleAction(action);
        }
    });
});

function handleAction(action) {
    switch (action) {
        case 'clear':
            firstValue = '';
            secondValue = '';
            operator = '';
            display.textContent = '0';
            break;
        case 'backspace':
            if (operator === '') {
                firstValue = firstValue.slice(0, -1);
                display.textContent = firstValue || '0';
            } else {
                secondValue = secondValue.slice(0, -1);
                display.textContent = secondValue || '0';
            }
            break;
        case 'percentage':
            if (operator === '') {
                firstValue = String(parseFloat(firstValue) / 100);
                display.textContent = firstValue;
            } else {
                secondValue = String(parseFloat(secondValue) / 100);
                display.textContent = secondValue;
            }
            break;
        case 'add':
        case 'subtract':
        case 'multiply':
        case 'divide':
            if (firstValue !== '') {
                operator = action;
            }
            break;
        case 'decimal':
            if (operator === '') {
                if (!firstValue.includes('.')) {
                    firstValue += '.';
                    display.textContent = firstValue;
                }
            } else {
                if (!secondValue.includes('.')) {
                    secondValue += '.';
                    display.textContent = secondValue;
                }
            }
            break;
        case 'calculate':
            if (firstValue !== '' && secondValue !== '') {
                calculateResult();
            }
            break;
    }
}

function calculateResult() {
    let result;
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(secondValue);

    switch (operator) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            result = num1 / num2;
            if (num2 === 0) {
                alert("Error: División por cero");
                result = 0;
            }
            break;
        default:
            result = 0;
    }

    display.textContent = result;
    firstValue = String(result);
    secondValue = '';
    operator = '';
    isResultDisplayed = true;
}
