"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  username: string;
  onLogout: () => void;
}

export default function AdminSidebar({ isOpen, toggleSidebar, username, onLogout }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const linkClasses = (path: string) => `
    flex items-center gap-3 px-3 py-3 rounded-r-lg cursor-pointer transition-all border-l-4 mb-1
    ${isActive(path) 
      ? "bg-blue-600/20 border-blue-500 text-blue-100" 
      : "border-transparent text-slate-400 hover:bg-slate-800 hover:text-white"}
  `;

  return (
    <>
      {/* 1. BACKDROP (Fondo oscuro para Móvil) */}
      {/* Solo se muestra si está abierto y estamos en móvil */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity md:hidden ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />

      {/* 2. SIDEBAR */}
      <aside 
        className={`
          fixed md:relative top-0 left-0 z-50 h-screen bg-slate-900 text-white transition-all duration-300 flex flex-col shadow-2xl
          ${/* Lógica de Ancho: En móvil siempre es ancho completo si se abre, en PC cambia */ ""}
          ${isOpen ? "w-64" : "w-64 md:w-20"} 
          
          ${/* Lógica de Posición: En móvil se esconde a la izquierda, en PC siempre se ve */ ""}
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 shrink-0">
          <div className={`${!isOpen && "md:hidden"} font-extrabold text-xl tracking-wider animate-fadeIn`}>
             SOLID<span className="text-blue-500">ADMIN</span>
          </div>
          
          <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>

        {/* Info Usuario */}
        <div className={`p-4 border-b border-slate-800 flex items-center gap-3 shrink-0 ${!isOpen && "md:justify-center"}`}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center font-bold text-lg shadow-lg shrink-0">
              {username.charAt(0).toUpperCase()}
          </div>
          
          {/* Ocultar texto en modo mini (Desktop) */}
          <div className={`overflow-hidden transition-all duration-300 ${!isOpen ? "md:w-0 md:opacity-0" : "w-auto opacity-100"}`}>
              <p className="text-sm font-bold text-white truncate w-32">{username}</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <p className="text-xs text-slate-400">En línea</p>
              </div>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 flex flex-col px-2 py-4 gap-2 overflow-y-auto overflow-x-hidden">
          
          <Link href="/admin">
              <div className={linkClasses("/admin")}>
                 <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                 <span className={`font-bold whitespace-nowrap transition-opacity duration-200 ${!isOpen ? "md:opacity-0 md:w-0" : "opacity-100"}`}>Productos</span>
              </div>
          </Link>

          <Link href="/admin/categories">
              <div className={linkClasses("/admin/categories")}>
                 <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                 <span className={`font-bold whitespace-nowrap transition-opacity duration-200 ${!isOpen ? "md:opacity-0 md:w-0" : "opacity-100"}`}>Categorías</span>
              </div>
          </Link>

          <Link href="/admin/brands">
              <div className={linkClasses("/admin/brands")}>
                 <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                 <span className={`font-bold whitespace-nowrap transition-opacity duration-200 ${!isOpen ? "md:opacity-0 md:w-0" : "opacity-100"}`}>Marcas</span>
              </div>
          </Link>

          <div className="flex-1"></div> 

          <button onClick={onLogout} className="flex items-center gap-3 px-3 py-4 text-slate-400 hover:bg-red-900/20 hover:text-red-400 rounded-lg transition-all mt-auto border-t border-slate-800">
              <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              <span className={`font-bold text-sm whitespace-nowrap transition-opacity duration-200 ${!isOpen ? "md:opacity-0 md:w-0" : "opacity-100"}`}>Cerrar Sesión</span>
          </button>

        </nav>
      </aside>
    </>
  );
}