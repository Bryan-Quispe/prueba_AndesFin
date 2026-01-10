package ec.edu.espe.ms_clientes.model;

import ec.edu.espe.ms_clientes.utils.ValidacionIdentificador;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "persona_natural")
@DiscriminatorValue("NATURAL")
@PrimaryKeyJoinColumn(name = "persona_id")
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class PersonaNatural extends Persona{

    @Column(nullable = false)
    private String apellido;

    @Column(nullable = false)
    private Gen genero; //M - F - O

    @Column(nullable = false)
    private LocalDate fechaNacimiento;



    @Override
    public boolean validarIdentificacion() {

        return false;
    }
}
