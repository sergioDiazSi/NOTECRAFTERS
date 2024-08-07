<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

// Verificar que la solicitud sea del tipo POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener los datos de la solicitud en formato JSON
    $data = json_decode(file_get_contents("php://input"), true);

    // Validar y obtener los campos título y descripción
    if (isset($data['titulo']) && isset($data['descripcion'])) {
        $titulo = $data['titulo'];
        $descripcion = $data['descripcion'];

        $con = new mysqli("localhost", "root", "", "diario");

        if ($con->connect_error) {
            die("Error de conexión: " . $con->connect_error);
        }

        $sql = "INSERT INTO notas (titulo, descripcion) VALUES (?, ?)";
        $consulta = $con->prepare($sql);
        $consulta->bind_param("ss", $titulo, $descripcion);

        if ($consulta->execute()) {
            echo json_encode(array('message' => 'Nota agregada con éxito'));
        } else {
            echo json_encode(array('error' => 'Error al agregar la nota'));
        }

        $con->close();
    } else {
        echo json_encode(array('error' => 'Falta el título o la descripción'));
    }
} else {
    echo json_encode(array('error' => 'Método no permitido'));
}
?>