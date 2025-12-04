package ec.edu.espe.ms_clientes.dto.mapper;

import org.springframework.stereotype.Component;

import ec.edu.espe.ms_clientes.dto.request.PersonaJuridicaRequest;
import ec.edu.espe.ms_clientes.dto.response.PersonaNaturalDto;
import ec.edu.espe.ms_clientes.dto.response.PersonaJuridicaDto;
import ec.edu.espe.ms_clientes.model.ActividadEconomica;
import ec.edu.espe.ms_clientes.model.EstadoCivil;
import ec.edu.espe.ms_clientes.model.Genero;
import ec.edu.espe.ms_clientes.model.PersonaJuridica;
import ec.edu.espe.ms_clientes.model.PersonaNatural;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
public class PersonaMapper {

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public PersonaNatural toPersonaNaturalEntity(PersonaNaturalDto dto) {
        if (dto == null) {
            return null;
        }
        return PersonaNatural.builder()
                .identificacion(dto.getIdentificacion())
                .nombre(dto.getNombre())
                .apellido(dto.getApellido())
                .telefono(dto.getTelefono())
                .email(dto.getEmail())
                .direccion(dto.getDireccion())
                .genero(Genero.valueOf(dto.getGenero()))
                .fechaNacimiento(dto.getFechaNacimiento())
                .estadoCivil(EstadoCivil.valueOf(dto.getEstadoCivil()))
                .build();
    }

    public PersonaJuridica toPersonaJuridicaEntity(PersonaJuridicaRequest request) {
        if (request == null) {
            return null;
        }
        return PersonaJuridica.builder()
                .identificacion(request.getIdentificacion())
                .nombre(request.getNombre())
                .razonSocial(request.getRazonSocial())
                .telefono(request.getTelefono())
                .email(request.getEmail())
                .direccion(request.getDireccion())
                .actividadEconomica(ActividadEconomica.valueOf(request.getActividadEconomica()))
                .fechaConstitucion(LocalDate.parse(request.getFechaConstitucion(), formatter))
                .representanteLegal(request.getRepresentanteLegal())
                .build();
    }

    public PersonaNaturalDto toPersonaNaturalDto(PersonaNatural entity) {
        if (entity == null) {
            return null;
        }
        return PersonaNaturalDto.builder()
                .id(entity.getId())
                .identificacion(entity.getIdentificacion())
                .nombre(entity.getNombre())
                .apellido(entity.getApellido())
                .telefono(entity.getTelefono())
                .email(entity.getEmail())
                .direccion(entity.getDireccion())
                .genero(entity.getGenero().name())
                .fechaNacimiento(entity.getFechaNacimiento())
                .estadoCivil(entity.getEstadoCivil().name())
                .build();
    }

    public PersonaJuridicaDto toPersonaJuridicaDto(PersonaJuridica entity) {
        if (entity == null) {
            return null;
        }
        return PersonaJuridicaDto.builder()
                .id(entity.getId())
                .identificacion(entity.getIdentificacion())
                .nombre(entity.getNombre())
                .razonSocial(entity.getRazonSocial())
                .telefono(entity.getTelefono())
                .email(entity.getEmail())
                .direccion(entity.getDireccion())
                .actividadEconomica(entity.getActividadEconomica().name())
                .fechaConstitucion(entity.getFechaConstitucion())
                .representanteLegal(entity.getRepresentanteLegal())
                .build();
    }
}


