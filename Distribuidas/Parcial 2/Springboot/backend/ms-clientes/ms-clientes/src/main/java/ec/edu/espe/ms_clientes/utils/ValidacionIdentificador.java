package ec.edu.espe.ms_clientes.utils;

public class ValidacionIdentificador {
    // Validar Cédula
    public static boolean validarCedula(String identificacion) {
        if (identificacion == null || identificacion.length() != 10) return false;
        return validacionModulo10(identificacion);
    }

    // Validar RUC Persona Natural
    public static boolean validarRucPersonaNatural(String ruc) {
        if (ruc == null || ruc.length() != 13 || !ruc.endsWith("001")) return false;
        // Se valida la parte de la cédula (primeros 10 dígitos)
        return validacionModulo10(ruc.substring(0, 10));
    }

    // Validar RUC Sociedad Privada
    public static boolean validarRucSociedadPrivada(String ruc) {
        if (ruc == null || ruc.length() != 13) return false;
        int tercerDigito = Character.getNumericValue(ruc.charAt(2));
        if (tercerDigito != 9) return false;
        return validacionModulo11(ruc, new int[]{4, 3, 2, 7, 6, 5, 4, 3, 2});
    }

    // Validar RUC Sociedad Pública
    public static boolean validarRucSociedadPublica(String ruc) {
        if (ruc == null || ruc.length() != 13) return false;
        int tercerDigito = Character.getNumericValue(ruc.charAt(2));
        if (tercerDigito != 6) return false;
        return validacionModulo11(ruc, new int[]{3, 2, 7, 6, 5, 4, 3, 2});
    }

    // --- Lógica Matemática Privada ---

    private static boolean validacionModulo10(String cedula) {
        try {
            int provincia = Integer.parseInt(cedula.substring(0, 2));
            if (provincia < 1 || provincia > 24) return false;
            int tercerDigito = Character.getNumericValue(cedula.charAt(2));
            if (tercerDigito >= 6) return false;
            int[] coeficientes = {2, 1, 2, 1, 2, 1, 2, 1, 2};
            int verificador = Character.getNumericValue(cedula.charAt(9));
            int suma = 0;
            for (int i = 0; i < coeficientes.length; i++) {
                int valor = Character.getNumericValue(cedula.charAt(i)) * coeficientes[i];
                suma += (valor >= 10) ? valor - 9 : valor;
            }
            int digitoCalculado = (suma % 10 == 0) ? 0 : 10 - (suma % 10);
            return digitoCalculado == verificador;
        } catch (Exception e) { return false; }
    }

    private static boolean validacionModulo11(String ruc, int[] coeficientes) {
        try {
            int verificadorIndex = (coeficientes.length == 8) ? 8 : 9;
            int verificador = Character.getNumericValue(ruc.charAt(verificadorIndex));
            int suma = 0;
            for (int i = 0; i < coeficientes.length; i++) {
                suma += Character.getNumericValue(ruc.charAt(i)) * coeficientes[i];
            }
            int residuo = suma % 11;
            int digitoCalculado = (residuo == 0) ? 0 : 11 - residuo;
            return digitoCalculado == verificador;
        } catch (Exception e) { return false; }
    }
}
