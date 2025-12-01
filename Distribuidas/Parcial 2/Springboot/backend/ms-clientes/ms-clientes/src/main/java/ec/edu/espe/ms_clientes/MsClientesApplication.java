package ec.edu.espe.ms_clientes;

// Asegúrate de que estos imports coincidan con tus paquetes
import ec.edu.espe.ms_clientes.model.ActiEconomica;
import ec.edu.espe.ms_clientes.model.Gen;
import ec.edu.espe.ms_clientes.model.PersonaJuridica;
import ec.edu.espe.ms_clientes.model.PersonaNatural;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

// 🛡️ LISTA DE EXCLUSIONES TOTAL (Escudo Anti-Errores de Base de Datos)
@SpringBootApplication(excludeName = {
        "org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration",
        "org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration",
        "org.springframework.boot.devtools.autoconfigure.DevToolsDataSourceAutoConfiguration",
        "org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration",
        "org.springframework.boot.autoconfigure.sql.init.DataSourceInitializationAutoConfiguration"
})
public class MsClientesApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(MsClientesApplication.class);
        // 🚀 MODO CONSOLA: Evita que busque arrancar Tomcat (servidor web)
        app.setWebApplicationType(WebApplicationType.NONE);
        app.run(args);
    }

    @Bean
    public CommandLineRunner demo() {
        return (args) -> {
            System.out.println("\n🔶🔶🔶 INICIO DE PRUEBA (SIN BASE DE DATOS) 🔶🔶🔶");

            // ==========================================
            //       PRUEBA 1: PERSONA NATURAL
            // ==========================================
            PersonaNatural pn = new PersonaNatural();
            // Datos heredados de Persona
            pn.setIdentificacion("1710080001");
            pn.setNombre("Roberto");
            pn.setTelefono("0987654321");
            pn.setEmail("roberto@mail.com");
            pn.setDireccion("Quito, Av. Amazonas");
            // Datos propios de PersonaNatural
            pn.setApellido("Quispe");
            pn.setFechaNacimiento(LocalDate.of(1995, 5, 20));

            // Usando tu Enum Gen
            pn.setGenero(Gen.Masculino); // O Gen.Masculino según como lo tengas

            System.out.println("👤 Natural Creada: " + pn.getNombre() + " " + pn.getApellido());
            System.out.println("   ¿Cédula válida?: " + (pn.validarIdentificacion() ? "✅ SI" : "❌ NO"));

            System.out.println("-------------------------------------------------");

            // ==========================================
            //       PRUEBA 2: PERSONA JURÍDICA
            // ==========================================
            PersonaJuridica pj = new PersonaJuridica();
            // Datos heredados de Persona
            pj.setIdentificacion("1790085783001"); // RUC de Supercias
            pj.setNombre("SUPERMAXI");
            pj.setTelefono("022999000");
            pj.setEmail("info@favorita.com");
            pj.setDireccion("Cumbayá, Ecuador");
            // Datos propios de PersonaJuridica
            pj.setRazonSocial("CORPORACION FAVORITA C.A.");
            pj.setRepresentanteLegal("GERENTE GENERAL");
            pj.setFechaConstitucion(LocalDate.of(1950, 1, 1));

            // Usando tu Enum ActiEconomica
            pj.setActividadEconomica(ActiEconomica.pesca); // O el valor que tengas en tu Enum

            System.out.println("🏢 Empresa Creada: " + pj.getRazonSocial());
            System.out.println("   ¿RUC válido?: " + (pj.validarIdentificacion() ? "✅ SI" : "❌ NO"));

            System.out.println("🔶🔶🔶 FIN DE PRUEBA 🔶🔶🔶\n");
        };
    }
}