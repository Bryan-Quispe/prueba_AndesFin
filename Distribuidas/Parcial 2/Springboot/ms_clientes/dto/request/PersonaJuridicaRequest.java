package ec.edu.espe.ms_clientes.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonaJuridicaRequest {
    private String identificacion;
    private String nombre;
    private String razonSocial;
    private String telefono;
    private String email;
    private String direccion;
    private String actividadEconomica;
    private String fechaConstitucion;
    private String representanteLegal;
}
