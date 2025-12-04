package ec.edu.espe.ms_clientes.model;

public enum EstadoCivil {
    SOLTERO("Soltero"),
    CASADO("Casado"),
    DIVORCIADO("Divorciado"),
    VIUDO("Viudo"),
    UNION_LIBRE("Unión Libre");

    private final String descripcion;

    EstadoCivil(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }
}
