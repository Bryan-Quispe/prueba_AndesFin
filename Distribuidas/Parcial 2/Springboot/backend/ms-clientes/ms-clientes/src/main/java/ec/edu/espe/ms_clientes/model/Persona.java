package ec.edu.espe.ms_clientes.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "persona")
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Persona {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String identificacion;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false,unique = true)
    private String telefono;

    @Column(nullable = false,unique = true)
    private String email;

    @Column(nullable = false)
    private String direccion;

    @Column(nullable = false)
    private boolean activo;

    private LocalDate fechaCreacion; //registro en la bd

    public abstract boolean validarIdentificacion();

    @PrePersist  //Antes que se cree ejecuta este
    protected void onCreate(){
        this.fechaCreacion = LocalDate.now();
        this.activo = false;
    }

}
