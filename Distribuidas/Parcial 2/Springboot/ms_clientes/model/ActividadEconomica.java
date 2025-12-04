package ec.edu.espe.ms_clientes.model;

public enum ActividadEconomica {
    AGRICULTURA("Agricultura"),
    GANADERIA("Ganadería"),
    PESCA("Pesca");

    private final String descripcion;

    ActividadEconomica(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }
}
