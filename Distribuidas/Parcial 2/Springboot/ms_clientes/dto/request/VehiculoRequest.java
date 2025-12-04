package ec.edu.espe.ms_clientes.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehiculoRequest {
    private String placa;
    private String marca;
    private String modelo;
    private Integer anio;
    private String color;
    private String dueno;
    private Integer numPuertas;
    private String tipoTransmision;
    private String tipoCombustible;
    private Integer cilindraje;
    private String tipoMoto;
}
