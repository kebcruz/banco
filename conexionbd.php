<?php
class ConexionBD {
    private $host = '127.0.0.1';
    private $dbname = 'banco';
    private $user = 'root';
    private $pass = '';
    private $pdo = null;

    public function __construct() {
        // Establecer conexión PDO
        try {
            $this->pdo = new PDO("mysql:host=$this->host;dbname=$this->dbname;charset=utf8", $this->user, $this->pass);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Error de conexión con PDO: " . $e->getMessage();
        }
    }

    // Método para obtener la conexión PDO
    public function getPdo() {
        return $this->pdo;
    }

    // Cerrar conexión PDO
    public function closeConnections() {
        if ($this->pdo !== null) {
            $this->pdo = null;
        }
    }
}

$conexion = new ConexionBD();
$pdo = $conexion->getPdo();
$conexion->closeConnections();
?>
