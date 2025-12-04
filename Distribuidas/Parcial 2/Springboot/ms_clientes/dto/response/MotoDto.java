package ec.edu.espe.ms_clientes.dto.response;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MotoDto {
    private Long id;
    private String placa;
    private String marca;
    private String modelo;
    private Integer anio;
    private String color;
    private String dueno;
    private String tipoVehiculo;
    private Integer cilindraje;
}
