package ec.edu.espe.ms_clientes.dto.response;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PersonaJuridicaDto {
    private Long id;
    private String identificacion;
    private String nombre;
    private String razonSocial;
    private String telefono;
    private String email;
    private String direccion;
    private String actividadEconomica;
    private LocalDate fechaConstitucion;
    private String representanteLegal;
}
