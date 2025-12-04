package ec.edu.espe.ms_clientes.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonaRequestDto {

    @NotBlank(message = "Rellene los campos vacios")
    @Size(min = 10, max = 13, message = "La idnetificacion es min 10 (CC) o 13 (ruc)")
    @Pattern(regexp = "\\d+", message = "La identificacion debe contener solo numeros")
    private String identificacion;
    private String nombre;
    private String email;

    @Pattern(regexp = "[0-9+\\-]+" , message = "El telefono tiene caracteres invalidos")
    private String telefono;



    @Size(max = 100, message = "Se permiten solo 100 caracteres")
    private String direccion;
}
