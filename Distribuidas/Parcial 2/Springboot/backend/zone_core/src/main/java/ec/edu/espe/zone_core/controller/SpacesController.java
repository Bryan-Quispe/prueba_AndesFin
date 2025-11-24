package ec.edu.espe.zone_core.controller;

import ec.edu.espe.zone_core.dto.SpacesRequestDto;
import ec.edu.espe.zone_core.dto.SpacesResponseDto;
import ec.edu.espe.zone_core.model.Spaces;
import ec.edu.espe.zone_core.service.SpacesServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/spaces")
public class SpacesController {

    @Autowired
    private SpacesServices spacesServices;

    @GetMapping("/")
    public ResponseEntity<List<SpacesResponseDto>> getAllSpaces(){
        return ResponseEntity.ok(spacesServices.getAllSpaces());
    }

    @PostMapping("/")
    public ResponseEntity<SpacesResponseDto> createSpaces(@RequestBody SpacesRequestDto spacesRequestDto){
        return ResponseEntity.ok(spacesServices.createSpace(spacesRequestDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SpacesResponseDto> updateSpaces(
            @PathVariable UUID id,
            @RequestBody SpacesRequestDto request){
        return ResponseEntity.ok(spacesServices.updateSpace(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSpaces(@PathVariable UUID id){
        spacesServices.deleteSpace(id);
        return ResponseEntity.noContent().build();
    }

    public ResponseEntity<SpacesResponseDto> getById(@PathVariable UUID id){
        return ResponseEntity.ok(spacesServices.getSpaceById(id));
    }
}
