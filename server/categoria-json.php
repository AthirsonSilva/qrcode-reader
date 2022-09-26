<?php
    header("Access-Control-Allow-Origin: *");

    include("./conexao.php");

    $stmt = $pdo->prepare("select categoria from tbCategoria where idCategoria = " . $_GET['idCategoria']);	
    $stmt ->execute();

    $data = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode($data);
?>