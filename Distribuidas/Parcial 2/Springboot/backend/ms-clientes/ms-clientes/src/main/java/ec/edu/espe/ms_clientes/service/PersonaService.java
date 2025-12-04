package ec.edu.espe.ms_clientes.service;

import ec.edu.espe.ms_clientes.dto.request.PersonaJuridicaRequestDto;
import ec.edu.espe.ms_clientes.dto.request.PersonaNaturalRequestDto;
import ec.edu.espe.ms_clientes.dto.request.PersonaRequestDto;
import ec.edu.espe.ms_clientes.dto.response.PersonaResponseDto;
import ec.edu.espe.ms_clientes.model.PersonaJuridica;

import java.util.UUID;


public interface PersonaService {

    PersonaResponseDto createPersonaNatual(PersonaNaturalRequestDto dtoNatural);
    PersonaResponseDto createPersonaJuridica(PersonaJuridicaRequestDto dtoJuridica);

    PersonaResponseDto updatePersonaNatural(UUID id, PersonaNaturalRequestDto dtoNatural);
    PersonaResponseDto updatePersonaJuridica(UUID id, PersonaNaturalRequestDto dtoNatural);





}
