package ec.edu.espe.ms_clientes.repository;

import ec.edu.espe.ms_clientes.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PersonaRepository extends JpaRepository<Persona, UUID> {

    Optional<Persona> findByIdentificacion(String identificacion) ;

}
