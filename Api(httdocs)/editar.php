<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT");
header("Access-Control-Allow-Headers: Content-Type");


$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id']) || !isset($data['titulo']) || !isset($data['descripcion'])) {
  $response = array("message" => "Faltan parámetros");
  echo json_encode($response);
  exit();
}

$id = $data['id'];
$titulo = $data['titulo'];
$descripcion = $data['descripcion'];

$con = new mysqli("localhost", "root", "", "diario");

if ($con->connect_error) {
  $response = array("message" => "Error de conexión: " . $con->connect_error);
  echo json_encode($response);
  exit();
}

$sql = "UPDATE notas SET titulo = ?, descripcion = ? WHERE id = ?";

$consulta = $con->prepare($sql);
$consulta->bind_param("ssi", $titulo, $descripcion, $id);

if ($consulta->execute()) {
  $response = array("message" => "Los datos se guardaron correctamente");
  echo json_encode($response);
} else {
  $response = array("message" => "Error al guardar los datos: " . $con->error);
  echo json_encode($response);
}

$con->close();
?>






