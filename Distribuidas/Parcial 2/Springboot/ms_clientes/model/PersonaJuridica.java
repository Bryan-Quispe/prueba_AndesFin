package ec.edu.espe.ms_clientes.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Entity
@Table(name = "persona_juridica")
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Getter
@Setter
@Inheritance(strategy = InheritanceType.JOINED)
@EqualsAndHashCode(callSuper = true)
public class PersonaJuridica extends Persona {

    @Column(nullable = false, unique = true)
    private String razonSocial;

    @Column(nullable = false, unique = true)
    @Enumerated(EnumType.STRING)
    private ActividadEconomica actividadEconomica;

    @Column(nullable = false)
    private LocalDate fechaConstitucion;

    @Column(nullable = false)
    private String representanteLegal;

    @Override
    public boolean validarIdentificacion(){
        if (identificacion == null || identificacion.length() != 13) {
            return false;
        }
        if (!identificacion.matches("\\d{13}")) {
            return false;
        }
        String cedula = identificacion.substring(0, 10);
        int suma = 0;
        for (int i = 0; i < 9; i++) {
            int digito = Character.getNumericValue(cedula.charAt(i));
            int coeficiente = (i % 2 == 0) ? (digito * 2) : digito;
            if (coeficiente >= 10) {
                coeficiente -= 9;
            }
            suma += coeficiente;
        }
        int digito_verificador = (10 - (suma % 10)) % 10;
        if (digito_verificador != Character.getNumericValue(cedula.charAt(9))) {
            return false;
        }
        int provincia = Integer.parseInt(identificacion.substring(10, 12));
        if (provincia < 1 || provincia > 24) {
            return false;
        }
        return true;
    }
}




