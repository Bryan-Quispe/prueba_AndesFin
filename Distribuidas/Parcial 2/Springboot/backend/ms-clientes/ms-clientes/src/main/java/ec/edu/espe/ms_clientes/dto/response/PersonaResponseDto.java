package ec.edu.espe.ms_clientes.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PersonaResponseDto {
    private UUID id;
    private String nombre; //nombre completo pn - razon social pj
    private String identificacion;
    private String tipoPersona;
    private String telefono;
    private String direccion;
    private String email;
    private String activo;
    private LocalDate fechaCreacion;
}
