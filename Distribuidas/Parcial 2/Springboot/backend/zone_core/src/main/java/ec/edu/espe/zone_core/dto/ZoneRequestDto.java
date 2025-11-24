package ec.edu.espe.zone_core.dto;

import ec.edu.espe.zone_core.model.ZoneType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ZoneRequestDto {
    @NotBlank(message= "Name is required")
    private String name;
    private String description;

    @Min(value = 5, message= "The min value is 5")
    @Max(value = 25, message = "The max value is 25")
    private Integer capacity;
    private ZoneType type;
    private Boolean isActive;

}
