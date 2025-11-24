package ec.edu.espe.zone_core.service;

import ec.edu.espe.zone_core.dto.SpacesRequestDto;
import ec.edu.espe.zone_core.dto.SpacesResponseDto;

import java.util.List;
import java.util.UUID;

public interface SpacesServices {

SpacesResponseDto createSpace(SpacesRequestDto dto);

SpacesResponseDto updateSpace(UUID id,SpacesRequestDto dto);

void deleteSpace(UUID id);

List<SpacesResponseDto> getAllSpaces();

SpacesResponseDto getSpaceById(UUID id);


}
