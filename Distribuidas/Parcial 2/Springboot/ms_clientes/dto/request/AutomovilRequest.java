package ec.edu.espe.ms_clientes.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AutomovilRequest {
    private String placa;
    private String marca;
    private String modelo;
    private Integer anio;
    private String color;
    private String dueno;
}
