document.addEventListener('deviceready', onLoad, false);

function onLoad() {
    generateRandomOperation();
}

let correctResult;

function generateRandomOperation() {

    const operators = ['+', '-', '*', '/'];

    const operator = operators[Math.floor(Math.random() * operators.length)];

    document.getElementById('message').innerHTML = " ";
    document.getElementById('result').value = "";

    let num1 = Math.floor(Math.random() * 9) + 1;
    let num2 = Math.floor(Math.random() * 9) + 1;

    if (operator === '/') {
        while (num2 === 0) {
            num2 = Math.floor(Math.random() * 9) + 1;
        }
    }

    let result;
    if (operator === '+') {
    result = num1 + num2;
	} else if (operator === '-') {
		result = num1 - num2;
	} else if (operator === '*') {
		result = num1 * num2;
	} else if (operator === '/') {
		result = (num1 / num2).toFixed(2);
	}


    document.getElementById("operation").textContent = `Resolva: ${num1} ${operator} ${num2}`;
    correctResult = result;
}

function checkAnswer() {
    const userAnswer = parseFloat(document.getElementById('result').value);
    const message = document.getElementById('message');

    if (isNaN(userAnswer)) {
        message.innerText = 'Insira um número válido.';
        navigator.vibrate(1000);
    } else if (userAnswer === correctResult) {
        navigator.vibrate(2000);
        message.innerText = 'Resposta certa';
        generateRandomOperation();
    } else {
        message.innerText = 'Resposta errada. Tente novamente.';
        navigator.vibrate(1000);
    }
}
