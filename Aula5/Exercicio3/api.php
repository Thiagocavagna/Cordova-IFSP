<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['image'])) {
        $imageData = $_POST['image'];
        $decodedImage = base64_decode($imageData);

        $imageName = uniqid() . '.jpg';
        $imagePath = 'images/' . $imageName;

        if (!file_exists('images')) {
            mkdir('images', 0777, true);
        }

        file_put_contents($imagePath, $decodedImage);

        echo json_encode(["message" => "Sucesso", "imagePath" => $imagePath]);
    } else {
        echo json_encode(["message" => "Falha"]);
    }
} else {
    echo json_encode(["message" => "Requisição inválida"]);
}
