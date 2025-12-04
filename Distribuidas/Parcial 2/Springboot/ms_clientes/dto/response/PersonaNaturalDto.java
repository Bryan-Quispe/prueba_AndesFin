package ec.edu.espe.ms_clientes.dto.response;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PersonaNaturalDto {
    private Long id;
    private String identificacion;
    private String nombre;
    private String apellido;
    private String telefono;
    private String email;
    private String direccion;
    private String genero;
    private LocalDate fechaNacimiento;
    private String estadoCivil;
}
