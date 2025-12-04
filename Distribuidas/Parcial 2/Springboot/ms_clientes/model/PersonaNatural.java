package ec.edu.espe.ms_clientes.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Entity
@Table(name = "persona_natural")
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Getter
@Setter
@Inheritance(strategy = InheritanceType.JOINED)
@EqualsAndHashCode(callSuper = true)
public class PersonaNatural extends Persona {

    @Column(nullable = false)
    private String apellido;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Genero genero;

    @Column(nullable = false)
    private LocalDate fechaNacimiento;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EstadoCivil estadoCivil;

    @Override
    public boolean validarIdentificacion(){
        if (identificacion == null || identificacion.length() != 10) {
            return false;
        }
        
        if (!identificacion.matches("\\d{10}")) {
            return false;
        }
        
        int suma = 0;
        for (int i = 0; i < 9; i++) {
            int digito = Character.getNumericValue(identificacion.charAt(i));
            int coeficiente = (i % 2 == 0) ? (digito * 2) : digito;
            if (coeficiente >= 10) {
                coeficiente -= 9;
            }
            suma += coeficiente;
        }
        
        int digito_verificador = (10 - (suma % 10)) % 10;
        return digito_verificador == Character.getNumericValue(identificacion.charAt(9));
    }
}
