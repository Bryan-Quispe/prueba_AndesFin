package ec.edu.espe.ms_clientes.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "automovil")
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
public class Automovil extends Vehiculo {
    
    @Column(nullable = false)
    private Integer numPuertas;
    
    @Column(nullable = false)
    private String tipoTransmision;
    
    @Column(nullable = false)
    private String tipoCombustible;
}
