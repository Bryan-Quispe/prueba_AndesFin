package ec.edu.espe.zone_core.dto;

import ec.edu.espe.zone_core.model.ZoneType;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data  //Creacion automatica de getter y setter
@Builder  // Inatansacion de objetos
public class ZoneResponseDto {
    private UUID id;
    private String Name;
    private String Description;
    private Integer capacity;
    private Boolean isActive;
    private ZoneType type;
}
