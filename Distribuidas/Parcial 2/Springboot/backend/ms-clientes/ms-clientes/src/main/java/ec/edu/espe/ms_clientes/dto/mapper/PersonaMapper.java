package ec.edu.espe.ms_clientes.dto.mapper;

import ec.edu.espe.ms_clientes.dto.request.PersonaNaturalRequestDto;
import ec.edu.espe.ms_clientes.dto.request.PersonaRequestDto;
import ec.edu.espe.ms_clientes.dto.response.PersonaResponseDto;
import ec.edu.espe.ms_clientes.model.Persona;
import ec.edu.espe.ms_clientes.model.PersonaJuridica;
import ec.edu.espe.ms_clientes.model.PersonaNatural;
import org.springframework.stereotype.Component;

@Component
public class PersonaMapper {

    public PersonaNatural toEntity(PersonaNaturalRequestDto personadto){
        if(personadto == null){
            return null;
        }
        return  PersonaNatural.builder()
                .identificacion(personadto.getIdentificacion())
                .build();
    }

    public PersonaResponseDto toDto(Persona persona){
        if(persona == null){
            return null;
        }

        return PersonaResponseDto.builder()
                .identificacion(persona.getIdentificacion())
                .tipoPersona(determinarTipo(persona))
                .build();
    }

    private String determinarTipo(Persona p){
        if(p instanceof PersonaNatural){
            return "PersonaNatural";
        }else if(p instanceof PersonaJuridica){
            return "PersonaJuridica";
        }else {
            return null;
        }
    }
}
