<?php 
	include("cabecalho.php");
	include("menu.php");
	include("conexao.php");

	echo "<h1> Exibir produtos </h1>";

?>

<section>

	<form method="post" action="produto-inserir.php">
		<div>
			<input type="text" placeholder="Produto" name="txProduto" />
		</div>

		<!-- Categorias -->
		<?php
			$stmtCat = $pdo->prepare("select * from tbCategoria");	
			$stmtCat ->execute();				
		?>
		<div>
			<select name="txIdCategoria">
				<option value='0'> Escolha uma categoria </option>
				<?php 
					while($rowCat = $stmtCat ->fetch(PDO::FETCH_BOTH)){
						echo "<option value='$rowCat[0]'> $rowCat[1] </option>";					
					}
				?>				
			</select>
			<!-- <input type="text" placeholder="idCategoria" name="txIdCategoria" />-->
		</div>
		<!-- Fim Categorias -->

		<div>
			<input type="text" placeholder="Valor" name="txValor" />
		</div>

		<div>
			<input type="submit" value="Salvar" />
		</div>
	</form>

</section>

<section>
	
	<table border="1">
		<!--<th>Id</th> -->
		<th>Produto</th>
		<th>Categoria</th>
		<th>Valor</th>
		<th> &nbsp; </th>

			<tbody>
				<?php
					$stmt = $pdo->prepare("select p.idProduto,p.produto,c.categoria,p.valor
					from tbproduto p
					inner join tbcategoria c
					on p.idCategoria = c.idCategoria");	
					$stmt ->execute();
					
					while($row = $stmt ->fetch(PDO::FETCH_BOTH)){

						echo "<tr>";
							//echo "<td> $row[0] </td>";
							echo "<td> $row[1] </td>";
							echo "<td> $row[2] </td>";
							echo "<td> $row[3] </td>";
							echo "<td>";
								echo "<a href='produto-excluir.php?id=$row[0]'> Excluir </a>"; 
							echo "</td>";
						echo "</tr>";					
					}	
				?>
		</tbody>
	</table>

</section>

<?php include("rodape.php");?>