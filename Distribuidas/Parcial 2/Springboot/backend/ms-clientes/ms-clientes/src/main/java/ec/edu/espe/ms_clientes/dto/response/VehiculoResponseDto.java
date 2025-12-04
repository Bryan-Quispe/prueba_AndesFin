package ec.edu.espe.ms_clientes.dto.response;

import ec.edu.espe.ms_clientes.model.Persona;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
public class VehiculoResponseDto {
    private UUID id;
    private String placa;
    private Integer cilindrada;
    private String marca;
    private String color;
    private String modelo;
    private Integer anioFabricacion;
    private Persona proprietario;

    private String tipoVehiculo; // Moto o AutoFamiliar

    private boolean activo;
    private LocalDate fechaCreacion;


}
