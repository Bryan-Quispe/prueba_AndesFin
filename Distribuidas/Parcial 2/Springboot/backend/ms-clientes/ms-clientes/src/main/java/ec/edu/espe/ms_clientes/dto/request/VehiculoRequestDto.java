package ec.edu.espe.ms_clientes.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class VehiculoRequestDto {

    @NotBlank(message = "Ingrese la placa es un campo obligatorio")
    @Size(min = 6, max = 8, message = "La placa debe contener minimo 6 y maximo 6 caracteres")
    @Pattern(regexp = "^[A-Z0-9-]+", message = "La placa contiene letras payusculas , numeros y guiomes")
    private String placa;

    @NotBlank(message = "Ingrese la marca es un campo obligatorio")
    private String marca;

    @NotBlank(message = "Ingrese el modelo es un campo obligatorio")
    private String modelo;


    @NotBlank(message = "Ingrese el año es un campo obligatorio")
    @Min(value = 1960 , message = "El año no puede ser menor a 1960")
    @Past(message = "El año no puede ser mayor al actual")
    private Integer anioFabricacion;

    private Integer cilindrada;

    private String color;






}
