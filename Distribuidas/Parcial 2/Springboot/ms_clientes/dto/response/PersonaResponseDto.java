package ec.edu.espe.ms_clientes.dto.response;

import java.time.LocalDate;
import java.util.UUID;

public class PersonaResponseDto {
    private UUID id;
    private String nombre; // NOMBRE COMPLETO PN / RAZON SOCIAL PJ
    private String identificacion; // CEDULA / RUC
    private String tipoPersona; // NATURAL / JURIDICA
    private String correoElectronico;
    private String telefono;
    private String direccion;
    private boolean activo;
    private String genero; // SOLO PERSONA NATURAL
    private LocalDate fechaCreacion;
}
