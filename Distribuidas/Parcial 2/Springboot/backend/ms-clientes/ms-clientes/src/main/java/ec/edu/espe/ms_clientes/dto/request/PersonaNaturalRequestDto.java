package ec.edu.espe.ms_clientes.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PersonaNaturalRequestDto extends PersonaRequestDto{
    @NotBlank(message = "El apellido es obligatorio")
    @Size(min = 2,max = 30, message = "El apellido debe tener entre 2 y 30 caracteres")
    private String apellido;

    @Pattern(regexp = "[MFO]", message = "El gebero puede ser M, F u O")
    @NotBlank(message = "El genero es obligatorio")
    private String genero;

    @Past(message = "La fecha de nacimiento debe ser menor a la actual")
    private String fechaNacimiento;
}
