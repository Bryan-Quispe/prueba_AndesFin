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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor //Inyeccion de dependencias
public class PersonaServiceImpl implements PersonaService {

    private final PersonaRepository personaRepository;

    private final PersonaMapper personaMapper;

    @Override
    public PersonaResponseDto createPersonaNatual(PersonaNaturalRequestDto dtoNatural) {
        PersonaNatural personaNatural = personaMapper.toEntity(dtoNatural);//Creo a Entidad
        if(personaNatural.validarIdentificacion()){ //Valido la cedula
            throw new RuntimeException("Identificacion incorrecta");
        }

        Persona guardado = personaRepository.save(personaNatural); //GUARDO EN EL RPOSITORIO

        return personaMapper.toDto(guardado); //retorno el dto
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
