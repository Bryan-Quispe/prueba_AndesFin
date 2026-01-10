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
@Table(name = "persona_jutidica")
@DiscriminatorValue("JURIDICA")
@PrimaryKeyJoinColumn(name = "persona_id")
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
        return true;
    }

}
