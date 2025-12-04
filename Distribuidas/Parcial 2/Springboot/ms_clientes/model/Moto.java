package ec.edu.espe.ms_clientes.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "moto")
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
public class Moto extends Vehiculo {
    
    @Column(nullable = false)
    private Integer cilindraje;
    
    @Column(nullable = false)
    private String tipoMoto;
}
