package ec.edu.espe.ms_clientes.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Entity
@Table(name = "vehiculo")
@Inheritance(strategy = InheritanceType.JOINED)
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Getter
@Setter
@EqualsAndHashCode
public abstract class Vehiculo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String placa;
    
    @Column(nullable = false)
    private String marca;
    
    @Column(nullable = false)
    private String modelo;
    
    @Column(nullable = false)
    private Integer anio;
    
    @Column(nullable = false)
    private String color;
    
    @Column(nullable = false)
    private String dueno;
    
    @Column(nullable = false)
    private LocalDate fechaRegistro;
    
    @PrePersist
    protected void onCreate() {
        fechaRegistro = LocalDate.now();
    }
}
