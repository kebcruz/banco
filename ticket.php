<?php
include_once 'conexionbd.php';
$conexion = new ConexionBD();
$pdo = $conexion->getPdo();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener el siguiente número de ticket
    $stmt = $pdo->query("SELECT MAX(ticket) AS max_ticket FROM monitor");
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $nextTicket = $row['max_ticket'] + 1; 

    // Insertar el nuevo ticket en la base de datos
    $sql = "INSERT INTO monitor (ticket, hora) VALUES (:ticket, NOW())"; 
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':ticket', $nextTicket, PDO::PARAM_INT);
    $stmt->execute();

    // Devolver el ticket generado como respuesta en formato JSON
    echo json_encode(['success' => true, 'ticket' => $nextTicket]);
} else {
    // En caso de no ser una solicitud POST, devolver un error
    echo json_encode(['success' => false]);
}

// Cerrar la conexión
$conexion->closeConnections();
?>