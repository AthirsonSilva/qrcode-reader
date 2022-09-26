<?php

    $produto = $_POST['txProduto'];
    $idCategoria = $_POST['txIdCategoria'];
    $valor = $_POST['txValor'];    

    include("conexao.php");

    $stmt = $pdo->prepare("insert into tbProduto values(null,'$produto','$idCategoria','$valor');");	
	$stmt ->execute();

    header("location:produto-exibir.php");

?>