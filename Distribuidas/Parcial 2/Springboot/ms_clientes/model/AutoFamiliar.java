package ec.edu.espe.ms_clientes.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import java.util.UUID;
import lombok.EqualsAndHashCode;


@Entity
@Table(name = "auto_familiar")
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@NoArgsConstructor
@SuperBuilder   
@Data   


public class AutoFamiliar extends Vehiculo {
    @Id
    @Column(nullable = false)
    private String tipoCombustible;
 
    //tipo como SUV , Hatbach  etc
    @Column(nullable = false)
    private String tipoAuto;
    // n ocupantes
    @Column(nullable = false)
    private int capacidadOcupantes;
    //combustible usando enum 
     @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TipoCombustible ipoCombustible;

    //capacidad maletero
    @Column(nullable = false)
    private double capacidadMaletero;
    //n puertas
    @Column(nullable = false)
    private int numeroPuertas;

}