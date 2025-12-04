package ec.edu.espe.ms_clientes.dto.request;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;



@Data
public class PersonaNaturalRequestDto extends PersonaRequestDto {
    @NotBlank(message = "El nombre no puede estar vacío")
    @Size(min=2,max = 50, message = "El nombre no puede tener más de 50 , ni menos de 2 caracteres")
    private String apellido;
    private String numeroIdentificacion;
        @Pattern(regexp = "M|F|OTRO", message = "El género debe ser 'M', 'F' o 'OTRO'")
    private String genero;
    @Pattern(regexp = "SOLTERO|CASADO|DIVORCIADO|VIUDO|UNION_LIBRE", message = "El estado civil debe ser 'SOLTERO', 'CASADO', 'DIVORCIADO' o 'VIUDO'")
    private String estadoCivil;
    @Past(message = "La fecha de nacimiento debe ser una fecha pasada")
    private String fechaNacimiento;
    
}
