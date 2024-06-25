<?php
$servername = "localhost";
$username = "root"; // Cambia esto si tienes un nombre de usuario diferente
$password = ""; // Cambia esto si tienes una contraseña diferente
$dbname = "trabajohtml";

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("La conexión ha fallado: " . $conn->connect_error);
}
?>