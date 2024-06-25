<?php
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'];
    $apellido_paterno = $_POST['apellidoPaterno'];
    $apellido_materno = $_POST['apellidoMaterno'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Encriptar la contraseña
    $telefono = $_POST['telefono'];

    // Verificar si el correo electrónico ya está registrado
    $sql = "SELECT * FROM usuarios WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo "Ya existe una cuenta registrada con este correo electrónico.";
    } else {
        $sql = "INSERT INTO usuarios (nombre, apellido_paterno, apellido_materno, email, contrasena, telefono) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssss", $nombre, $apellido_paterno, $apellido_materno, $email, $password, $telefono);

        if ($stmt->execute()) {
            echo "Cuenta creada correctamente.";
        } else {
            echo "Hubo un error al crear la cuenta. Inténtalo de nuevo.";
        }
    }
    
    $stmt->close();
    $conn->close();
}
?>
