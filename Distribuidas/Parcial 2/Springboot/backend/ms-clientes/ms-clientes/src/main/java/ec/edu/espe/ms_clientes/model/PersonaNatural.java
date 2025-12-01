package ec.edu.espe.ms_clientes.model;

import ec.edu.espe.ms_clientes.utils.ValidacionIdentificador;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "persona_natural")
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
        String id = this.getIdentificacion(); // Heredado del padre
        if (id == null) return false;

        // Si tiene 10 dígitos, validamos como Cédula
        if (id.length() == 10) {
            return ValidacionIdentificador.validarCedula(id);
        }
        // Si tiene 13 dígitos, validamos como RUC Natural
        else if (id.length() == 13) {
            return ValidacionIdentificador.validarRucPersonaNatural(id);
        }

        return false;
    }
}
