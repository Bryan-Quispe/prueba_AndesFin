package ec.edu.espe.ms_clientes.dto.request;
//aqui se valida todo

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;


@Data@NoArgsConstructor
@AllArgsConstructor
public class PersonaRequestDto {
    @Size(min=10 ,max= 36, message = "El id no puede tener más de 36 ni menos de 10 caracteres") 
    @NotBlank(message = "El id no puede estar en blanco")
    private String id;
    @Pattern(regexp = "^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\\s]+$", message = "El nombre solo puede contener letras y espacios")
    private String nombre;
    @Pattern(regexp = "^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\\s]+$", message = "El apellido solo puede contener letras y espacios")
    private String apellido;

  

    @Pattern(regexp = "\\d+", message = "La identificación debe tener exactamente numeros")
    private String identificacion;

    @Size(max = 100, message = "La dirección no puede tener más de 100 caracteres")
    private String direccion;
    @Pattern(regexp = "\\+?\\d{10,15}\\[0-9+\\-]", message = "El teléfono debe tener entre 10 y 15 dígitos, puede incluir un '+' al inicio")
    private String telefono;
    @Pattern(regexp = "^[\\w.-]+@[\\w.-]+\\.\\w{2,}$", message = "El email debe tener un formato válido")
    private String email;
}