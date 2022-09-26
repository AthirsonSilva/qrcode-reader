<?php
	$nome = $_POST['txNome'];
	$email = $_POST['txEmail'];
	$assunto = $_POST['txAssunto'];
	$mensagem = $_POST['txMensagem'];	
	
	include("conexao.php");
	
	try{
		$stmt = $pdo->prepare("insert into tbcontato values(
			null,'$nome','$email','$assunto','$mensagem'
		)");
		$stmt->execute();
	}
	catch(PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }		
?>