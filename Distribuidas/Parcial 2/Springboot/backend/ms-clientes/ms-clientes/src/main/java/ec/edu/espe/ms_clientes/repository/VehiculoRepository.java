package ec.edu.espe.ms_clientes.repository;

import ec.edu.espe.ms_clientes.model.Vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


@Repository
public interface VehiculoRepository  extends JpaRepository<Vehiculo , UUID> {

    @Query(value= "SELECT * from p_buscar_vehiculo_dado_p()",nativeQuery = true)
    List<Vehiculo> findByMarca(String identificacion);
}
