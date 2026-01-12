"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function SessionTimeout() {
  const router = useRouter();
  
  // CONFIGURACIÓN (En milisegundos)
  const TIMEOUT_DURATION = 10 * 60 * 1000; // 10 Minutos totales
  const WARNING_DURATION = 30 * 1000;      // 30 Segundos de advertencia
  
  // Estados
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // Contador regresivo visual
  const [lastActivity, setLastActivity] = useState<number>(Date.now()); // Última vez que se movió

  // Función para cerrar sesión real
  const handleLogout = useCallback(() => {
    // 1. Borrar token (si lo guardaste en localStorage)
    localStorage.removeItem("token"); 
    localStorage.removeItem("user");
    
    // 2. Redirigir al login
    alert("🔒 Tu sesión ha expirado por inactividad.");
    window.location.href = "/login"; // O a donde tengas tu login
  }, []);

  // Función para vigilar la inactividad (Se ejecuta cada 1 segundo)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const timeElapsed = now - lastActivity;
      const timeRemaining = TIMEOUT_DURATION - timeElapsed;

      // CASO 1: Se acabó el tiempo total -> Logout
      if (timeRemaining <= 0) {
        clearInterval(interval);
        handleLogout();
      }
      
      // CASO 2: Falta poco (Entra en zona de advertencia)
      else if (timeRemaining <= WARNING_DURATION) {
        setShowWarning(true);
        setTimeLeft(Math.ceil(timeRemaining / 1000)); // Actualiza el contador visual
      } 
      
      // CASO 3: Todo normal
      else {
        setShowWarning(false);
      }

    }, 1000);

    return () => clearInterval(interval);
  }, [lastActivity, handleLogout, TIMEOUT_DURATION, WARNING_DURATION]);

  // Función para reiniciar el reloj (Extender Sesión)
  const resetTimer = () => {
    setLastActivity(Date.now());
    setShowWarning(false);
  };

  // Escuchar eventos del usuario (Mouse, Teclado, Clics)
  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll"];
    
    const handleUserActivity = () => {
      // Si NO estamos en modo advertencia, actualizamos la última actividad automáticamente
      // (Si ya salió el aviso, obligamos a que den clic en el botón "Extender")
      if (!showWarning) {
        setLastActivity(Date.now());
      }
    };

    events.forEach((event) => window.addEventListener(event, handleUserActivity));

    return () => {
      events.forEach((event) => window.removeEventListener(event, handleUserActivity));
    };
  }, [showWarning]);

  // Si no hay advertencia, no renderizamos nada (invisible)
  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border border-red-100 animate-bounce-in">
        
        {/* Icono de Alerta */}
        <div className="mb-4 text-red-500">
          <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          ¿Sigues ahí? 🕵️
        </h2>
        
        <p className="text-slate-600 mb-6">
          Por seguridad, tu sesión expirará en:
        </p>

        {/* Contador Gigante */}
        <div className="text-5xl font-black text-red-600 mb-8 tabular-nums">
          {timeLeft} <span className="text-xl font-medium text-red-400">seg</span>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={resetTimer}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg active:scale-95"
          >
            ⏱️ Extender Sesión (+10 min)
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full text-slate-500 hover:text-slate-700 font-medium py-2 transition-colors text-sm"
          >
            Cerrar Sesión Ahora
          </button>
        </div>

      </div>
    </div>
  );
}