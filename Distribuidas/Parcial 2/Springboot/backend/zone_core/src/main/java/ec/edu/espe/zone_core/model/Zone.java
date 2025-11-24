package ec.edu.espe.zone_core.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "zonas")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Zone {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(length = 25, nullable = false, unique=true , name = "nombre")
    private String name;

    @Column(nullable = false, name = "descripcion")
    private String description;

    @Column(name = "capacidad", nullable = false)
    private Integer capacity;

    @Column(name = "estado")
    private Boolean isActive;

    @Column(name = "tipo", nullable = false)
    @Enumerated(EnumType.STRING)
    private ZoneType type;

}

