package ec.edu.espe.ms_clientes.demo;

import ec.edu.espe.ms_clientes.model.*;

import java.time.LocalDate;

/**
 * Clase demo para crear instancias de Persona (Natural/Jurídica) y Vehículos (Automóvil/Moto).
 * Demuestra dos formas de instanciación: vacía+setters y builder.
 */
public class DemoInstances {

    public static void main(String[] args) {
        System.out.println("=== DEMO: Instancias de Persona y Vehículos ===\n");

        // ============= PERSONA NATURAL =============
        System.out.println("--- PERSONA NATURAL ---");
        demoPersonaNatural();

        System.out.println("\n--- PERSONA JURIDICA ---");
        demoPersonaJuridica();

        System.out.println("\n--- AUTOMOVIL ---");
        demoAutomovil();

        System.out.println("\n--- MOTO ---");
        demoMoto();

        System.out.println("\n=== FIN DEL DEMO ===");
    }

    private static void demoPersonaNatural() {
        // 1) Instancia vacía + setters
        PersonaNatural pn1 = new PersonaNatural();
        pn1.setIdentificacion("1724105661");
        pn1.setNombre("María");
        pn1.setApellido("Gómez");
        pn1.setTelefono("0999888777");
        pn1.setEmail("maria.gomez@example.com");
        pn1.setDireccion("Calle Demo 123");
        pn1.setGenero(Genero.F);
        pn1.setFechaNacimiento(LocalDate.of(1992, 4, 10));
        pn1.setEstadoCivil(EstadoCivil.SOLTERO);

        System.out.println("1) Vacía + setters:");
        printPersonaNatural(pn1);

        // 2) Builder (@SuperBuilder)
        PersonaNatural pn2 = PersonaNatural.builder()
                .identificacion("1724105661")
                .nombre("Luis")
                .apellido("Lopez")
                .telefono("0999222333")
                .email("luis.lopez@example.com")
                .direccion("Av. Builder 9")
                .genero(Genero.M)
                .fechaNacimiento(LocalDate.of(1995, 2, 2))
                .estadoCivil(EstadoCivil.UNION_LIBRE)
                .build();

        System.out.println("\n2) Builder (.builder().build()):");
        printPersonaNatural(pn2);
    }

    private static void demoPersonaJuridica() {
        // 1) Instancia vacía + setters
        PersonaJuridica pj1 = new PersonaJuridica();
        pj1.setIdentificacion("1724105661011");
        pj1.setNombre("Servicios Demo S.A.");
        pj1.setRazonSocial("Servicios Demo Sociedad Anónima");
        pj1.setTelefono("0987000111");
        pj1.setEmail("contacto@serviciosdemo.com");
        pj1.setDireccion("Av. Empresarial 45");
        pj1.setActividadEconomica(ActividadEconomica.GANADERIA);
        pj1.setFechaConstitucion(LocalDate.of(2018, 9, 1));
        pj1.setRepresentanteLegal("Carlos Ruiz");

        System.out.println("1) Vacía + setters:");
        printPersonaJuridica(pj1);

        // 2) Builder
        PersonaJuridica pj2 = PersonaJuridica.builder()
                .identificacion("1724105661011")
                .nombre("Pesca Marina S.A.")
                .razonSocial("Pesca Marina Sociedad Anónima")
                .telefono("0999555666")
                .email("pesca@marina.com")
                .direccion("Puerto El Muelle")
                .actividadEconomica(ActividadEconomica.PESCA)
                .fechaConstitucion(LocalDate.of(2020, 3, 15))
                .representanteLegal("Pedro Morales")
                .build();

        System.out.println("\n2) Builder:");
        printPersonaJuridica(pj2);
    }

    private static void demoAutomovil() {
        // 1) Vacía + setters
        Automovil auto1 = new Automovil();
        auto1.setPlaca("PBC1234");
        auto1.setMarca("Toyota");
        auto1.setModelo("Corolla");
        auto1.setAnio(2022);
        auto1.setColor("Blanco");
        auto1.setDueno("Juan Pérez");
        auto1.setFechaRegistro(LocalDate.now());
        auto1.setNumPuertas(4);
        auto1.setTipoTransmision("Automática");
        auto1.setTipoCombustible("Gasolina");

        System.out.println("1) Vacía + setters:");
        printAutomovil(auto1);

        // 2) Builder
        Automovil auto2 = Automovil.builder()
                .placa("ABC9999")
                .marca("Kia")
                .modelo("Picanto")
                .anio(2023)
                .color("Rojo")
                .dueno("Carlos Rivas")
                .fechaRegistro(LocalDate.now())
                .numPuertas(4)
                .tipoTransmision("Automática")
                .tipoCombustible("Gasolina")
                .build();

        System.out.println("\n2) Builder:");
        printAutomovil(auto2);
    }

    private static void demoMoto() {
        // 1) Vacía + setters
        Moto moto1 = new Moto();
        moto1.setPlaca("M001234");
        moto1.setMarca("Yamaha");
        moto1.setModelo("YZF-R15");
        moto1.setAnio(2021);
        moto1.setColor("Azul");
        moto1.setDueno("Diego Sánchez");
        moto1.setFechaRegistro(LocalDate.now());
        moto1.setCilindraje(155);
        moto1.setTipoMoto("Deportiva");

        System.out.println("1) Vacía + setters:");
        printMoto(moto1);

        // 2) Builder
        Moto moto2 = Moto.builder()
                .placa("M009999")
                .marca("Suzuki")
                .modelo("GSX-R150")
                .anio(2023)
                .color("Negro")
                .dueno("Isabel Moreno")
                .fechaRegistro(LocalDate.now())
                .cilindraje(150)
                .tipoMoto("Deportiva")
                .build();

        System.out.println("\n2) Builder:");
        printMoto(moto2);
    }

    // ===== HELPERS =====

    private static void printPersonaNatural(PersonaNatural p) {
        System.out.println("  Identificacion: " + p.getIdentificacion());
        System.out.println("  Nombre: " + p.getNombre() + " " + p.getApellido());
        System.out.println("  Telefono: " + p.getTelefono());
        System.out.println("  Email: " + p.getEmail());
        System.out.println("  Direccion: " + p.getDireccion());
        System.out.println("  Genero: " + p.getGenero());
        System.out.println("  FechaNacimiento: " + p.getFechaNacimiento());
        System.out.println("  EstadoCivil: " + p.getEstadoCivil());
        System.out.println("  Cédula válida: " + p.validarIdentificacion());
    }

    private static void printPersonaJuridica(PersonaJuridica p) {
        System.out.println("  Identificacion (RUC): " + p.getIdentificacion());
        System.out.println("  Nombre: " + p.getNombre());
        System.out.println("  RazonSocial: " + p.getRazonSocial());
        System.out.println("  Telefono: " + p.getTelefono());
        System.out.println("  Email: " + p.getEmail());
        System.out.println("  Direccion: " + p.getDireccion());
        System.out.println("  ActividadEconomica: " + p.getActividadEconomica());
        System.out.println("  FechaConstitucion: " + p.getFechaConstitucion());
        System.out.println("  RepresentanteLegal: " + p.getRepresentanteLegal());
        System.out.println("  RUC válido: " + p.validarIdentificacion());
    }

    private static void printAutomovil(Automovil a) {
        System.out.println("  Placa: " + a.getPlaca());
        System.out.println("  Marca: " + a.getMarca());
        System.out.println("  Modelo: " + a.getModelo());
        System.out.println("  Año: " + a.getAnio());
        System.out.println("  Color: " + a.getColor());
        System.out.println("  Dueño: " + a.getDueno());
        System.out.println("  Puertas: " + a.getNumPuertas());
        System.out.println("  Transmisión: " + a.getTipoTransmision());
        System.out.println("  Combustible: " + a.getTipoCombustible());
        System.out.println("  Fecha Registro: " + a.getFechaRegistro());
    }

    private static void printMoto(Moto m) {
        System.out.println("  Placa: " + m.getPlaca());
        System.out.println("  Marca: " + m.getMarca());
        System.out.println("  Modelo: " + m.getModelo());
        System.out.println("  Año: " + m.getAnio());
        System.out.println("  Color: " + m.getColor());
        System.out.println("  Dueño: " + m.getDueno());
        System.out.println("  Cilindraje: " + m.getCilindraje());
        System.out.println("  Tipo: " + m.getTipoMoto());
        System.out.println("  Fecha Registro: " + m.getFechaRegistro());
    }
}
