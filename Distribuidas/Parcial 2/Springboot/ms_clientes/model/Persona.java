package ec.edu.espe.ms_clientes.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Entity
@Table(name = "persona")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Persona {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    protected String identificacion;

    @Column(nullable = false)
    private String nombre;

    @Column(unique = true, nullable = false)
    private String telefono;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String direccion;

    @Column(nullable = false)
    private boolean activo;



    private LocalDate fechaCreacion;  //para el registro en la bd
    public abstract boolean  validarIdentificacion();
   @PrePersist
    protected void onCreate() {
        this.activo = false;
    }
}
