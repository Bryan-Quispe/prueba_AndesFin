package ec.edu.espe.ms_clientes.dto.request;

import ec.edu.espe.ms_clientes.model.TipoMoto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class MotoRequestDto extends VehiculoRequestDto {

    @NotBlank(message = "El tipo de Moto es obligatoria")
    @Pattern(
            regexp = "^(Trail|Naked|Custom|Enduro|Otro)$",
            message = "La actividad económica debe ser válida"
    )
    private TipoMoto tipo;

    @NotBlank(message = "El campo de si tiene casco es obligatorio")
    private Boolean tieneCasco;



}
