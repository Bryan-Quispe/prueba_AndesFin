"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. URL de la API (Usa variables de entorno o la IP directa)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"; 
      // Nota: auth suele estar fuera de /api, ajusta según tu backend. 
      // Si tu backend es http://.../auth/login, usa esa base.
      
      // Ajuste manual rápido si tu .env apunta a /api
     const authUrl = `${apiUrl}/auth/login`;

      const response = await axios.post(authUrl, {
        username: formData.username,
        password: formData.password
      });

      // 3. Guardar el Token
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // 4. Redirigir
      router.push("/admin");

    } catch (err: any) {
      console.error(err);
      setError("Usuario o contraseña incorrectos 🚫");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-200">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Acceso Administrativo
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            Ingresa tus credenciales seguras
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 text-sm font-medium animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Usuario
            </label>
            {/* AQUÍ ESTÁ LA CORRECCIÓN DE COLOR: text-slate-900 bg-white */}
            <input 
              name="username" 
              type="text" 
              onChange={handleChange}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white text-slate-900 placeholder-slate-400"
              placeholder="Ej: admin_master"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Contraseña
            </label>
            <input 
              name="password" 
              type="password" 
              onChange={handleChange}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white text-slate-900 placeholder-slate-400"
              placeholder="••••••••"
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3.5 rounded-xl text-white font-bold text-lg shadow-lg transition-all transform active:scale-95
              ${loading 
                ? "bg-slate-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-slate-900 to-indigo-900 hover:from-slate-800 hover:to-indigo-800 hover:shadow-xl"
              }`}
          >
            {loading ? "Verificando..." : " Ingresar al Sistema"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-slate-400">
            Sistema protegido si se le detecta un acceso no permitido estara sujeto a la ley!!.
          </p>
        </div>
      </div>
    </div>
  );
}