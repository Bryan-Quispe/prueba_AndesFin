package ec.edu.espe.zone_core.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "espacio")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Spaces {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "codigo", unique = true, nullable = false, length = 10)
    private String code;

    @Column(name = "estado", nullable = false)
    @Enumerated(EnumType.STRING)
    private SpaceStatus status; //disponible -- ocupado -- mantenimiento

    @Column
    private Boolean isReserved;

    @Column(name = "orden")
    private Integer priority;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_zona")
    private Zone zone;

}
