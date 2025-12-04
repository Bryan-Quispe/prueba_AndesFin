package ec.edu.espe.ms_clientes.dto.request;

import ec.edu.espe.ms_clientes.model.TipoAuto;
import ec.edu.espe.ms_clientes.model.TipoCombustible;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AutoFamiliarRequestDto extends VehiculoRequestDto{

    @NotBlank(message = "El tipo de auto es obligatorio")
    private TipoAuto tipo;


    @NotBlank(message = "El tipo de combustible es obligatorio")
    private TipoCombustible combustible;

    @Min(value = 2 , message = "El numero dep uertas no puede ser menor a 2")
    @NotBlank(message = "El numero de puertas es obligatorio")
    private Integer puertas;

    @NotBlank(message = "La capacidad del maletero es obligatorio")
    private Integer capacidadMaletero;

    @NotBlank(message = "El numero de ocupantes es obligatorio")
    private Integer ocupantes;
}
