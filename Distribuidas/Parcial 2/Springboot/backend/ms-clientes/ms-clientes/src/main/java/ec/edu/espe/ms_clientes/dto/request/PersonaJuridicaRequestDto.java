package ec.edu.espe.ms_clientes.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PersonaJuridicaRequestDto {

    @NotBlank(message = "La razon social es obligatoria")
    private String razonSocial;

    @Pattern(
            regexp = "^(pesca|agricultura|ganaderia|otro)$",
            message = "La actividad económica debe ser válida"
    )
    @NotBlank(message = "La actividad económica es obligatoria")
    private String actividadEconomica;

    @NotBlank(message = "El representante legal es obligatorio")
    private String representanteLegal;

    @NotBlank(message = "Fecha de constitucion es obligatorio")
    @Past(message = "La fecha no puede ser mayor a la actual")
    private LocalDate fechaConstitucion;
}
