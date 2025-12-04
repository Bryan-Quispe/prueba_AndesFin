package ec.edu.espe.ms_clientes.model;

public enum Genero {
    M("Masculino"),
    F("Femenino"),
    OTRO("Otro");

    private final String descripcion;

    Genero(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }
}
