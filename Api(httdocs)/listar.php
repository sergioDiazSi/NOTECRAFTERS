<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
$con=new mysqli("localhost","root","","diario");
$notas = array();
$sql = $con->query("select * from notas");
while($fila = mysqli_fetch_assoc($sql))
 $notas[] = $fila;
$con->close();
print json_encode($notas);
?>