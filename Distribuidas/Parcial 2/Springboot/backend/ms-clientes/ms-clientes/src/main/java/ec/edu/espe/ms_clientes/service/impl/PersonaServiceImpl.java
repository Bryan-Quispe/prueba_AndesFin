package ec.edu.espe.ms_clientes.service.impl;

import ec.edu.espe.ms_clientes.dto.mapper.PersonaMapper;
import ec.edu.espe.ms_clientes.dto.request.PersonaJuridicaRequestDto;
import ec.edu.espe.ms_clientes.dto.request.PersonaNaturalRequestDto;
import ec.edu.espe.ms_clientes.dto.response.PersonaResponseDto;
import ec.edu.espe.ms_clientes.model.Persona;
import ec.edu.espe.ms_clientes.model.PersonaNatural;
import ec.edu.espe.ms_clientes.repository.PersonaRepository;
import ec.edu.espe.ms_clientes.service.PersonaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class PersonaServiceImpl implements PersonaService {

    private final PersonaRepository personaRepository;
    private final PersonaMapper personaMapper;

    @Override
    public PersonaResponseDto createPersonaNatual(PersonaNaturalRequestDto dtoNatural) {

        if (personaRepository.existsByIdentificacion(dtoNatural.getIdentificacion())) {
            log.error("Ya existe una persona con la identificación {}", dtoNatural.getIdentificacion());
            throw new RuntimeException("Ya existe una persona con la identificación " + dtoNatural.getIdentificacion());
        }

        PersonaNatural personaNatural = personaMapper.toEntity(dtoNatural);

        if (!personaNatural.validarIdentificacion()) {
            throw new RuntimeException("La identificación es incorrecta");
        }

        Persona guardado = personaRepository.save(personaNatural);
        log.info("Persona guardada exitosamente");

        return personaMapper.toDto(guardado);
    }

    @Override
    public PersonaResponseDto createPersonaJuridica(PersonaJuridicaRequestDto dtoJuridica) {
        return null;
    }

    @Override
    public PersonaResponseDto updatePersonaNatural(UUID id, PersonaNaturalRequestDto dtoNatural) {
        return null;
    }

    @Override
    public PersonaResponseDto updatePersonaJuridica(UUID id, PersonaNaturalRequestDto dtoNatural) {
        return null;
    }
}
