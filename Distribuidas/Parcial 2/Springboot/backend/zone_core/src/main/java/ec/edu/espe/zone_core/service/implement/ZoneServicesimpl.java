package ec.edu.espe.zone_core.service.implement;

import ec.edu.espe.zone_core.dto.ZoneRequestDto;
import ec.edu.espe.zone_core.dto.ZoneResponseDto;
import ec.edu.espe.zone_core.model.Zone;
import ec.edu.espe.zone_core.repository.ZoneRepository;
import ec.edu.espe.zone_core.service.ZoneService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ZoneServicesimpl implements ZoneService {

    private final ZoneRepository zoneRepository;

    @Override
    public ZoneResponseDto createZone(ZoneRequestDto dto) {
        Zone zone = Zone.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .capacity(dto.getCapacity())
                .type(dto.getType())
                .isActive(dto.getIsActive())
                .build();

        Zone savedZone = zoneRepository.save(zone);

        return convertToDto(savedZone);
    }

    @Override
    public ZoneResponseDto updateZone(UUID id, ZoneRequestDto dto) {
        Zone zone = zoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Zone not found"));

        zone.setName(dto.getName());
        zone.setDescription(dto.getDescription());
        zone.setCapacity(dto.getCapacity());
        zone.setType(dto.getType());
        zone.setIsActive(dto.getIsActive());

        Zone updatedZone = zoneRepository.save(zone);

        return convertToDto(updatedZone);
    }

    @Override
    public void deleteZone(UUID id) {
        Zone zone = zoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Zone not found"));

        zoneRepository.delete(zone);
    }

    @Override
    public List<ZoneResponseDto> getAllZones() {
        return zoneRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ZoneResponseDto getZone(UUID id) {
        Zone zone = zoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Zone not found"));

        return convertToDto(zone);
    }

    private ZoneResponseDto convertToDto(Zone objzone) {
        return ZoneResponseDto.builder()
                .id(objzone.getId())
                .Name(objzone.getName())
                .Description(objzone.getDescription())
                .capacity(objzone.getCapacity())
                .type(objzone.getType())
                .isActive(objzone.getIsActive())
                .build();
    }
}
