package ec.edu.espe.ms_clientes.dto.mapper;



import ec.edu.espe.ms_clientes.dto.request.AutoFamiliarRequestDto;
import ec.edu.espe.ms_clientes.dto.request.MotoRequestDto;
import ec.edu.espe.ms_clientes.dto.response.VehiculoResponseDto;
import ec.edu.espe.ms_clientes.model.AutoFamiliar;
import ec.edu.espe.ms_clientes.model.Moto;
import ec.edu.espe.ms_clientes.model.Persona;
import ec.edu.espe.ms_clientes.model.Vehiculo;
import org.springframework.stereotype.Component;

@Component
public class VehiculoMapper {
    //Moto
    public Moto toEntity(MotoRequestDto dto, Persona propietario) {

        return Moto.builder()
                .placa(dto.getPlaca())
                .marca(dto.getMarca())
                .color(dto.getColor())
                .modelo(dto.getModelo())
                .cilindrada(dto.getCilindrada())
                .anioFabricacion(dto.getAnioFabricacion())
                .tipo(dto.getTipo())
                .tieneCasco(dto.getTieneCasco())
                .propietario(propietario)
                .activo(true)
                .build();
    }

    //Auto familiar
    public AutoFamiliar toEntity(AutoFamiliarRequestDto dto, Persona propietario) {

        return AutoFamiliar.builder()
                .placa(dto.getPlaca())
                .marca(dto.getMarca())
                .color(dto.getColor())
                .modelo(dto.getModelo())
                .cilindrada(dto.getCilindrada())
                .anioFabricacion(dto.getAnioFabricacion())
                .combustible(dto.getCombustible())
                .capacidadMaletero(dto.getCapacidadMaletero())
                .ocupantes(dto.getOcupantes())
                .propietario(propietario)
                .activo(true)
                .build();
    }

    //entity a dto
    public VehiculoResponseDto toDto(Vehiculo v) {
        return VehiculoResponseDto.builder()
                .id(v.getId())
                .placa(v.getPlaca())
                .marca(v.getMarca())
                .modelo(v.getModelo())
                .color(v.getColor())
                .cilindrada(v.getCilindrada())
                .anioFabricacion(v.getAnioFabricacion())
                .tipoVehiculo(getTipo(v))
                .activo(v.getActivo())
                .fechaCreacion(v.getFechaCreacion())
                .build();
    }

    private String getTipo(Vehiculo v) {
        if (v instanceof Moto) return "MOTO";
        if (v instanceof AutoFamiliar) return "AUTO_FAMILIAR";
        return "DESCONOCIDO";
    }
}
