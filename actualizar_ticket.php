<?php
// Incluir el archivo de conexión a la base de datos
include('conexionbd.php');

// Obtener los datos enviados por POST
$ticket = $_POST['ticket'];  
$estatus = $_POST['estatus'];
$caja = $_POST['caja'];  

// Consulta SQL para actualizar el estatus y la caja del ticket
$query = "UPDATE monitor SET estatus = :estatus, caja = :caja WHERE ticket = :ticket";

// Preparar y ejecutar la consulta
$stmt = $pdo->prepare($query);
$stmt->bindParam(':estatus', $estatus);
$stmt->bindParam(':caja', $caja);
$stmt->bindParam(':ticket', $ticket, PDO::PARAM_INT);

// Ejecutar la consulta y verificar si fue exitosa
if ($stmt->execute()) {
    // Si la actualización fue exitosa, devolver una respuesta exitosa
    echo json_encode(['success' => true, 'message' => 'Ticket actualizado correctamente']);
} else {
    // Si ocurrió un error, devolver un mensaje de error
    echo json_encode(['success' => false, 'message' => 'Error al actualizar el ticket']);
}
?>
