package ec.edu.espe.zone_core.service.implement;

import ec.edu.espe.zone_core.dto.SpacesRequestDto;
import ec.edu.espe.zone_core.dto.SpacesResponseDto;
import ec.edu.espe.zone_core.model.Spaces;
import ec.edu.espe.zone_core.model.Zone;
import ec.edu.espe.zone_core.repository.SpacesRepository;
import ec.edu.espe.zone_core.repository.ZoneRepository;
import ec.edu.espe.zone_core.service.SpacesServices;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SpacesServicesimpl implements SpacesServices {

    private final ZoneRepository zoneRepository;
    private final SpacesRepository spacesRepository;

    @Override
    public SpacesResponseDto createSpace(SpacesRequestDto dto) {
        Zone zone = zoneRepository.findById(dto.getIdZone())
                .orElseThrow(() -> new RuntimeException("Zone no existente"));

        Spaces objSpace = Spaces.builder()
                .code(dto.getCodigo())
                .status(dto.getStatus())
                .isReserved(dto.getIsReserved())
                .priority(dto.getPriority())
                .zone(zone)
                .build();

        Spaces savedSpace = spacesRepository.save(objSpace);
        return convertToDto(savedSpace);
    }

    @Override
    public SpacesResponseDto updateSpace(UUID id, SpacesRequestDto dto) {
        Spaces objSpace = spacesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Space no existente"));

        Zone zone = zoneRepository.findById(dto.getIdZone())
                .orElseThrow(() -> new RuntimeException("Zone no existente"));

        objSpace.setCode(dto.getCodigo());
        objSpace.setStatus(dto.getStatus());
        objSpace.setIsReserved(dto.getIsReserved());
        objSpace.setPriority(dto.getPriority());
        objSpace.setZone(zone);

        return convertToDto(spacesRepository.save(objSpace));
    }

    @Override
    public void deleteSpace(UUID id) {
        Spaces objSpace = spacesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Space no existente"));
        spacesRepository.delete(objSpace);
    }

    @Override
    public List<SpacesResponseDto> getAllSpaces() {
        return spacesRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public SpacesResponseDto getSpaceById(UUID id) {
        Spaces objSpace = spacesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Space not found"));
        return convertToDto(objSpace);
    }

    private SpacesResponseDto convertToDto(Spaces objSpaces) {
        return SpacesResponseDto.builder()
                .id(objSpaces.getId())
                .codigo(objSpaces.getCode())
                .status(objSpaces.getStatus())
                .isReserved(objSpaces.getIsReserved())
                .priority(objSpaces.getPriority())
                .idZone(objSpaces.getZone().getId())
                .zoneName(objSpaces.getZone().getName())
                .build();
    }
}
