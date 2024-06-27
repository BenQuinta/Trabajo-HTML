<?php
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM usuarios WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        // Verificar la contraseña
        if (password_verify($password, $user['contrasena'])) {
            session_start();
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_email'] = $user['email'];

            // Redirigir a index.html
            header("Location: index.html");
            exit(); // Asegurar que no se ejecute más código después de la redirección
        } else {
            echo "Correo electrónico o contraseña incorrectos.";
        }
    } else {
        echo "Correo electrónico o contraseña incorrectos.";
    }
    
    $stmt->close();
    $conn->close();
}
?>
