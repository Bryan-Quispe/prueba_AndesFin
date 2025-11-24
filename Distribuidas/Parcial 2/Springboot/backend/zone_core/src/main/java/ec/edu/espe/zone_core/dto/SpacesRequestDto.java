package ec.edu.espe.zone_core.dto;

import ec.edu.espe.zone_core.model.SpaceStatus;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data  //Creacion automatica de getter y setter
@Builder  // Inatansacion de objetos
public class SpacesRequestDto {  //Unicamente los atirbutos que mandare
    private String codigo;
    private SpaceStatus status;
    private Boolean isReserved;
    private Integer priority;
    private UUID idZone;
}
