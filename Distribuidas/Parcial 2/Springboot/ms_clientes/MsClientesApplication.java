package ec.edu.espe.ms_clientes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication: Anotación de configuración principal que combina:
// - @Configuration: Marca la clase como fuente de configuración de beans
// - @EnableAutoConfiguration: Habilita la configuración automática de Spring Boot
// - @ComponentScan: Habilita el escaneo de componentes en el paquete actual y subpaquetes
@SpringBootApplication
public class MsClientesApplication {

	// Método main: Punto de entrada de la aplicación
	// String[] args: Parámetros de línea de comandos que se pasan a la aplicación
	public static void main(String[] args) {
		// SpringApplication.run() realiza los siguientes pasos:
		// 1. Crea el contexto de aplicación de Spring
		// 2. Inicia el servidor embebido (Tomcat, Jetty, etc.)
		// 3. Configura automáticamente los beans según las dependencias en el classpath
		// 4. Inicia la aplicación y queda a la espera de solicitudes
		SpringApplication.run(MsClientesApplication.class, args);
	}

}
