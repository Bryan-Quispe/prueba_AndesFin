package ec.edu.espe.ms_clientes.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;


@Entity
@Table(name = "auto_familiar")
@Data //todos los getter y setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
public class AutoFamiliar extends Vehiculo  {

    // TIPO -> SUV, HATCHBACK,....
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_auto")
    private TipoAuto tipo;

    // COMBUSTIBLE -> GASOLINA , DIESEL , ELECTRICO E HIBRIDO
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_combustible", nullable = false)
    private TipoCombustible combustible;

    // Puertas
    @Column(name = "numero_puertas", nullable = false)
    private Integer puertas;

    // Capacidad Maletero (Usualmente en Litros)
    @Column(name = "capacidad_maletero_litros", nullable = false)
    private Integer capacidadMaletero;

    // Ocupantes
    @Column(name = "numero_ocupantes", nullable = false)
    private Integer ocupantes;



}