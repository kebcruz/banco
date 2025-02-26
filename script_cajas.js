$(document).ready(function() {
    const cajaId = $('.caja-box').data('caja-id');

    cargarTurnos(cajaId);

    // Función para cargar turnos
    function cargarTurnos(cajaId) {
        $.ajax({
            url: 'caja.php',
            type: 'GET',
            data: {caja: cajaId}, 
            dataType: 'json',
            success: function(data) {
                let tabla = '';
                if (data.length > 0) {
                    tabla += '<table class="caja-table">';
                    tabla += '<thead><tr><th>Turno</th><th>Hora</th><th>Estatus</th><th>Acciones</th></tr></thead><tbody>';
                    let turnosDisponibles = false;

                    data.forEach(function(turno) {
                        if (turno.estatus === 'pendiente' || turno.estatus === 'asistiendo') {
                            if (turno.caja === null || turno.caja === cajaId) {
                                turnosDisponibles = true; // Si hay turnos disponibles
                                tabla += `<tr data-ticket="${turno.ticket}" data-estatus="${turno.estatus}">
                                    <td>${turno.ticket}</td>
                                    <td>${turno.hora}</td>
                                    <td>${turno.estatus}</td>
                                    <td>`;
                                if (turno.estatus === 'pendiente' && turno.caja === null) {
                                    tabla += `<button class="atender-btn" data-ticket="${turno.ticket}" data-caja="${cajaId}">Atender</button>`;
                                }
                                if (turno.estatus === 'asistiendo' || (turno.estatus === 'pendiente' && turno.caja === cajaId)) {
                                    tabla += `<button class="atendido-btn" data-ticket="${turno.ticket}" data-caja="${cajaId}">Atendido</button>`;
                                }
                                tabla += `</td></tr>`;
                            }
                        }
                    });

                    tabla += '</tbody></table>';

                    if (!turnosDisponibles) {
                        tabla = '<p>No hay turnos disponibles para esta caja.</p>';
                    }
                } else {
                    tabla = '<p>No hay turnos por el momento.</p>';
                }
                $('#resultado').html(tabla);
            },
            error: function() {
                $('#resultado').html('<p>Error al cargar los datos.</p>');
            }
        });
    }

    // Escuchar el evento de localStorage para actualizar la vista de las cajas
    window.addEventListener('storage', function(event) {
        if (event.key === 'nuevoTurnoGenerado') {
            cargarTurnos(cajaId);
        }

        if (event.key === 'turnoActualizado') {
            cargarTurnos(cajaId);  
        }
    });

    $(document).on('click', '.atender-btn', function() {
        const ticket = $(this).data('ticket');
        const cajaId = $(this).data('caja');
        actualizarEstatus(ticket, 'asistiendo', cajaId);
    });

    $(document).on('click', '.atendido-btn', function() {
        const ticket = $(this).data('ticket');
        const cajaId = $(this).data('caja');
        actualizarEstatus(ticket, 'atendido', cajaId);
    });

    function actualizarEstatus(ticket, estatus, cajaId) {
        $.ajax({
            url: 'actualizar_ticket.php',
            type: 'POST',
            data: {ticket: ticket, estatus: estatus, caja: cajaId},
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    localStorage.setItem('turnoActualizado', Date.now());
                    cargarTurnos(cajaId); 
                } else {
                    alert('Error al actualizar el turno.');
                }
            },
            error: function(xhr, status, error) {
                console.error("Error al actualizar el turno:", error);
                alert('Error en la solicitud AJAX.');
            }
        });
    }
});
