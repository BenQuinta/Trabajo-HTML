<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "trabajohtml";

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("La conexión ha fallado: " . $conn->connect_error);
}

// Obtener los datos del formulario (asegúrate de sanitizar estas entradas)
$review = $_POST['review'];
$rating = $_POST['rating'];
$gameName = $_POST['gameName'];

// Asignar el ID de usuario directamente
$usuario_id = 9; // ID de usuario proporcionado

// Insertar la reseña en la base de datos
$sql = "INSERT INTO reseñas (usuario_id, juego, calificacion, texto) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("isss", $usuario_id, $gameName, $calificacion, $texto);

// Asignar valores a los parámetros
$calificacion = $rating;
$texto = $review;

$response = [];

// Ejecutar la consulta preparada
if ($stmt->execute()) {
    $response['success'] = true;
} else {
    $response['success'] = false;
}

// Devolver la respuesta como JSON
header('Content-Type: application/json');
echo json_encode($response);

// Cerrar la conexión
$stmt->close();
$conn->close();
?>
