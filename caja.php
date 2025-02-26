<?php
// Incluir el archivo de conexión a la base de datos
include('conexionbd.php');

// Consulta SQL para obtener todos los turnos
$query = "SELECT ticket, caja, hora, estatus FROM monitor"; 

// Ejecutar la consulta
$stmt = $pdo->query($query);

// Verificar si hubo un error en la consulta
if (!$stmt) {
    die(json_encode(['error' => 'Error en la consulta']));
}

// Obtener los datos de la tabla "monitor"
$turnos = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Devolver los datos en formato JSON
header('Content-Type: application/json');
echo json_encode($turnos);
?>
