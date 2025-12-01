package ec.edu.espe.ms_clientes.model;


import ec.edu.espe.ms_clientes.utils.ValidacionIdentificador;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "persona_jutidica")
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public  class PersonaJuridica extends Persona{

    @Column(nullable = false,unique = true)
    private String razonSocial; //Nombre industrial

    @Column(nullable = false)
    private ActiEconomica actividadEconomica; //agricultura - ganaderia - pesca

    @Column(nullable = false)
    private String representanteLegal;

    @Column(nullable = false)
    private LocalDate fechaConstitucion;

    @Override
    public boolean validarIdentificacion() {
        String ruc = this.getIdentificacion();

        // Las empresas SOLO tienen RUC de 13 dígitos
        if (ruc == null || ruc.length() != 13) return false;

        // Probamos si es Privada (9) O si es Pública (6)
        return ValidacionIdentificador.validarRucSociedadPrivada(ruc) ||
                ValidacionIdentificador.validarRucSociedadPublica(ruc);
    }
}
