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

// Obtener el juego de la solicitud (asegúrate de sanitizar esta entrada)
$juego = $_GET['juego'];

// Consultar las reseñas de la base de datos
$sql = "SELECT usuarios.nombre AS username, reseñas.calificacion AS rating, reseñas.texto AS texto
        FROM reseñas
        JOIN usuarios ON reseñas.usuario_id = usuarios.id
        WHERE reseñas.juego = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $juego);
$stmt->execute();
$result = $stmt->get_result();

$reviews = [];
while ($row = $result->fetch_assoc()) {
    $reviews[] = $row;
}

// Devolver las reseñas como JSON
header('Content-Type: application/json');
echo json_encode($reviews);

// Cerrar la conexión
$stmt->close();
$conn->close();
?>
