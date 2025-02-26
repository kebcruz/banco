$(document).ready(function() {
    // Generar un turno
    $("#generar-turno").click(function(event) { 
        event.preventDefault();
        $.ajax({
            url: 'ticket.php',
            type: 'POST', 
            dataType: 'json',
            success: function(response) {
                console.log('Respuesta del servidor:', response);
                if (response.success) {
                    $('#resultado').html("Tu turno es el siguiente: " + response.ticket);

                    localStorage.setItem('nuevoTurnoGenerado', Date.now());

                    window.localStorage.setItem('turnoGenerado', response.ticket);
                } else {
                    $('#resultado').html("Hubo un problema al generar tu turno.");
                }
            },
            error: function(xhr, status, error) {
                console.error("Error al generar el ticket:", error);
                $('#resultado').html('Error al generar el turno.');
            }
        });
    });

    // Monitor
    $("#monitor").click(function(event) {
        event.preventDefault(); 
        window.location.href = "monitor.html"; 
    });

    // Monitor
    if (window.location.pathname.includes("monitor.html")) {
        function cargarDatosMonitor() {
            $.ajax({
                url: 'monitor.php',
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    let tabla = '';
                    if (data.length > 0) {
                        tabla += '<table class="monitor-table">';
                        tabla += '<thead><tr><th>Turno</th><th>Caja</th><th>Hora</th><th>Estatus</th></tr></thead><tbody>';
                        data.forEach(function (monitor) {
                            tabla += `<tr>
                                <td>${monitor.ticket ?? 'No hay turnos por el momento'}</td>
                                <td>${monitor.caja ?? 'No hay cajas asignadas por el momento'}</td>
                                <td>${monitor.hora ?? 'No disponible'}</td>
                                <td>${monitor.estatus ?? 'No atendido'}</td>
                            </tr>`;
                        });
                        tabla += '</tbody></table>';
                    } else {
                        tabla = '<p>Por el momento no hay turnos.</p>';
                    }
                    $('#resultado').html(tabla);
                },
                error: function () {
                    $('#resultado').html('<p>Error al cargar los datos.</p>');
                }
            });
        }

        cargarDatosMonitor(); 
        window.addEventListener('storage', function(event) {
            if (event.key === 'nuevoTurnoGenerado' || event.key === 'turnoActualizado') {
                cargarDatosMonitor();
            }
        });
        
    }
});
