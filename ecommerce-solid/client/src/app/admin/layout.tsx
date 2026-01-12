"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // En movil empezamos cerrado, en PC abierto
  // (Opcional: puedes usar useEffect para detectar el ancho de pantalla)

  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* Sidebar */}
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} 
        username="Admin"
        onLogout={() => console.log("Logout")}
      />

      {/* Contenido Principal */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        
        {/* --- NUEVO: HEADER SOLO PARA MÓVIL --- */}
        {/* Este botón aparece cuando el sidebar está oculto en celular */}
        <div className="md:hidden h-16 bg-white border-b border-slate-200 flex items-center px-4 justify-between shrink-0 sticky top-0 z-30">
             <div className="flex items-center gap-3">
                <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
                <span className="font-bold text-slate-800">SOLID ADMIN</span>
             </div>
             <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">A</div>
        </div>

        {/* El contenido de tus páginas (Productos, Marcas, etc) */}
        <div className="p-4 md:p-8">
            {children}
        </div>
      </main>
    </div>
  );
}