<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT,DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$id = $_GET['id'];

$con = new mysqli("localhost", "root", "", "diario");

if ($con->connect_error) {
  die('{"message": "Error de conexión: ' . $con->connect_error . '"}');
}

$sql = "DELETE FROM notas WHERE id = ?";

$consulta = $con->prepare($sql);
$consulta->bind_param("i", $id);

if ($consulta->execute()) {
  echo '{"message": "La fila se eliminó correctamente"}';
} else {
  echo '{"message": "Error al eliminar la fila: ' . $con->error . '"}';
}

$con->close();
?>