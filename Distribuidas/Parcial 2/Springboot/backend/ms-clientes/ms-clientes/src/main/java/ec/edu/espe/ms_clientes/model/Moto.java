package ec.edu.espe.ms_clientes.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "moto")
@EqualsAndHashCode(callSuper = true) //Trayendo las propiedades del padre
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder //Creando al objeto con los atributos del padre
//@Builder crear objetos de solo el hijo
@Data
public class Moto extends Vehiculo{

    @Column(nullable = false)
    private TipoMoto tipo;

    @Column(nullable = false)
    private Boolean tieneCasco;



}
