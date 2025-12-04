package ec.edu.espe.ms_clientes.dto.mapper;

import org.springframework.stereotype.Component;

import ec.edu.espe.ms_clientes.dto.request.VehiculoRequest;
import ec.edu.espe.ms_clientes.dto.response.AutomovilDto;
import ec.edu.espe.ms_clientes.dto.response.MotoDto;
import ec.edu.espe.ms_clientes.model.Automovil;
import ec.edu.espe.ms_clientes.model.Moto;

import java.time.LocalDate;

@Component
public class VehiculoMapper {

    public Automovil toAutomovil(VehiculoRequest request) {
        if (request == null) {
            return null;
        }
        return Automovil.builder()
                .placa(request.getPlaca())
                .marca(request.getMarca())
                .modelo(request.getModelo())
                .anio(request.getAnio())
                .color(request.getColor())
                .dueno(request.getDueno())
                .fechaRegistro(LocalDate.now())
                .numPuertas(request.getNumPuertas())
                .tipoTransmision(request.getTipoTransmision())
                .tipoCombustible(request.getTipoCombustible())
                .build();
    }

    public Moto toMoto(VehiculoRequest request) {
        if (request == null) {
            return null;
        }
        return Moto.builder()
                .placa(request.getPlaca())
                .marca(request.getMarca())
                .modelo(request.getModelo())
                .anio(request.getAnio())
                .color(request.getColor())
                .dueno(request.getDueno())
                .fechaRegistro(LocalDate.now())
                .cilindraje(request.getCilindraje())
                .tipoMoto(request.getTipoMoto())
                .build();
    }

    public AutomovilDto toAutomovilDto(Automovil automovil) {
        if (automovil == null) {
            return null;
        }
        return AutomovilDto.builder()
                .id(automovil.getId())
                .placa(automovil.getPlaca())
                .marca(automovil.getMarca())
                .modelo(automovil.getModelo())
                .anio(automovil.getAnio())
                .color(automovil.getColor())
                .dueno(automovil.getDueno())
                .tipoVehiculo("AUTOMOVIL")
                .build();
    }

    public MotoDto toMotoDto(Moto moto) {
        if (moto == null) {
            return null;
        }
        return MotoDto.builder()
                .id(moto.getId())
                .placa(moto.getPlaca())
                .marca(moto.getMarca())
                .modelo(moto.getModelo())
                .anio(moto.getAnio())
                .color(moto.getColor())
                .dueno(moto.getDueno())
                .tipoVehiculo("MOTO")
                .cilindraje(moto.getCilindraje())
                .build();
    }
}
