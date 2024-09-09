// script.js

document.getElementById('imc-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        alert('Por favor, insira valores válidos para peso e altura.');
        return;
    }

    try {
        const response = await fetch('http://localhost/imc_calculator/index.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ peso, altura })
        });

        const data = await response.json();

        if (response.ok) {
            displayResults(data);
        } else {
            displayError(data.erro);
        }
    } catch (error) {
        console.error('Erro ao comunicar com a API:', error);
        displayError('Ocorreu um erro ao se comunicar com o servidor.');
    }
});

function displayResults(data) {
    const resultDiv = document.getElementById('result');
    let resultHTML = `<h2>Resultados</h2>
                      <p><strong>IMC:</strong> ${data.imc}</p>
                      <p><strong>Classificação:</strong> ${data.classificacao}</p>`;

    if (data.peso_perder > 0) {
        resultHTML += `<p><strong>Peso a perder:</strong> ${data.peso_perder} kg</p>`;
    } else {
        resultHTML += `<p><strong>Peso a perder:</strong> Não é necessário</p>`;
    }

    resultDiv.innerHTML = resultHTML;
}

function displayError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p style="color: red;">${message}</p>`;
}
