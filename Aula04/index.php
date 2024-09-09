<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Função para calcular o IMC
function calcularIMC($peso, $altura) {
    return $peso / ($altura * $altura);
}

// Função para obter a classificação do IMC
function obterClassificacaoIMC($imc) {
    if ($imc < 18.5) {
        return 'Abaixo do peso';
    } elseif ($imc < 24.9) {
        return 'Peso saudável';
    } elseif ($imc < 29.9) {
        return 'Sobrepeso';
    } else {
        return 'Obesidade';
    }
}

// Função para calcular a perda de peso necessária para alcançar o IMC saudável
function calcularPesoIdeal($altura) {
    $imcIdeal = 24.9;
    return $imcIdeal * ($altura * $altura);
}

// Verifica se o método de requisição é POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    // Valida os dados recebidos
    if (!isset($data['peso']) || !isset($data['altura'])) {
        echo json_encode(['erro' => 'Peso e altura são necessários']);
        http_response_code(400);
        exit;
    }

    $peso = floatval($data['peso']);
    $altura = floatval($data['altura']);

    if ($peso <= 0 || $altura <= 0) {
        echo json_encode(['erro' => 'Peso e altura devem ser positivos']);
        http_response_code(400);
        exit;
    }

    $imc = calcularIMC($peso, $altura);
    $classificacao = obterClassificacaoIMC($imc);

    $response = [
        'imc' => round($imc, 2),
        'classificacao' => $classificacao
    ];

    if ($imc >= 24.9) {
        $pesoIdeal = calcularPesoIdeal($altura);
        $pesoPerder = $peso - $pesoIdeal;
        $response['peso_perder'] = round($pesoPerder, 2);
    } else {
        $response['peso_perder'] = 0;
    }

    echo json_encode($response);
} else {
    echo json_encode(['erro' => 'Método de requisição não permitido']);
    http_response_code(405);
}
?>
