package ec.edu.espe.zone_core.dto;

import ec.edu.espe.zone_core.model.SpaceStatus;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class SpacesResponseDto {
    private UUID id;
    private String codigo;
    private SpaceStatus status;
    private Boolean isReserved;
    private Integer priority;
    private UUID idZone;
    private String zoneName;
}
