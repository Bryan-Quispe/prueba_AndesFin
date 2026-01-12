"use client";

import { useState } from "react";

interface PreviewProps {
  data: any;
  onClose: () => void;
}

export default function ProductPreview({ data, onClose }: PreviewProps) {
  // Estado para simular dispositivos (Responsive)
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  // Definimos el ancho según el dispositivo
  const containerWidth = {
    desktop: "w-full",
    tablet: "w-[768px]",
    mobile: "w-[375px]"
  };

  return (
    <div className="fixed inset-0 bg-zinc-900 z-[100] flex flex-col animate-fadeIn">
      
      {/* 1. BARRA SUPERIOR (WP ADMIN BAR STYLE) */}
      <div className="h-14 bg-slate-900 text-white flex items-center justify-between px-4 shadow-md shrink-0 border-b border-slate-700">
        <div className="flex items-center gap-4">
            <span className="font-bold text-sm tracking-wide text-gray-300">
               WordPress Mode Preview
            </span>
            <span className="bg-yellow-500 text-black text-xs px-2 py-0.5 rounded font-bold uppercase">
               Borrador
            </span>
        </div>

        {/* SELECTOR DE DISPOSITIVOS */}
        <div className="flex bg-slate-800 rounded-lg p-1 gap-1">
            <button 
                onClick={() => setDevice("desktop")}
                className={`p-2 rounded hover:bg-slate-700 transition-colors ${device === "desktop" ? "bg-blue-600 text-white" : "text-gray-400"}`}
                title="Vista Escritorio"
            >
                🖥️
            </button>
            <button 
                onClick={() => setDevice("tablet")}
                className={`p-2 rounded hover:bg-slate-700 transition-colors ${device === "tablet" ? "bg-blue-600 text-white" : "text-gray-400"}`}
                title="Vista Tablet"
            >
                📱
            </button>
            <button 
                onClick={() => setDevice("mobile")}
                className={`p-2 rounded hover:bg-slate-700 transition-colors ${device === "mobile" ? "bg-blue-600 text-white" : "text-gray-400"}`}
                title="Vista Móvil"
            >
                📲
            </button>
        </div>

        <button 
            onClick={onClose} 
            className="text-sm font-bold text-gray-300 hover:text-white flex items-center gap-2 px-3 py-1 hover:bg-red-500/20 rounded transition-colors"
        >
            ✕ Cerrar Vista Previa
        </button>
      </div>

      {/* 2. ÁREA DE CONTENIDO (SIMULADOR DE NAVEGADOR) */}
      <div className="flex-1 bg-gray-200 overflow-y-auto flex justify-center py-8">
        
        {/* CONTENEDOR DE LA PÁGINA (Se encoge según el dispositivo) */}
        <div className={`${containerWidth[device]} bg-white min-h-screen shadow-2xl transition-all duration-300 relative flex flex-col`}>
            
            {/* HEADER FALSO DE LA TIENDA */}
            <header className="border-b border-gray-100 py-4 px-6 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur z-10">
                <h1 className="text-xl font-extrabold text-slate-900">MI TIENDA<span className="text-blue-600">.</span></h1>
                <nav className="hidden sm:flex gap-4 text-sm font-bold text-gray-500">
                    <span>Inicio</span>
                    <span className="text-black">Catálogo</span>
                    <span>Ofertas</span>
                </nav>
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">🛒</div>
            </header>

            {/* CUERPO DE LA PÁGINA DE PRODUCTO (Product Detail Page) */}
            <main className="p-6 md:p-10 flex-1">
                
                {/* Breadcrumbs */}
                <div className="text-xs text-gray-400 mb-6 uppercase tracking-wider font-semibold">
                    Inicio / Catálogo / <span className="text-black">{data.name || "Nombre del Producto"}</span>
                </div>

                {/* Grid de Producto (Layout Típico E-commerce) */}
                <div className={`grid gap-10 ${device === "mobile" ? "grid-cols-1" : "grid-cols-2"}`}>
                    
                    {/* IZQUIERDA: IMAGEN */}
                    <div className="bg-gray-50 aspect-square rounded-2xl overflow-hidden relative group">
                        {data.imageUrl ? (
                            <img src={data.imageUrl} className="w-full h-full object-cover mix-blend-multiply" alt="Preview" />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-300">
                                <span className="text-4xl mb-2">📷</span>
                                <span className="font-bold text-sm">Sin Imagen</span>
                            </div>
                        )}
                        {/* Tag de Nuevo */}
                        <span className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
                            NUEVO
                        </span>
                    </div>

                    {/* DERECHA: INFORMACIÓN */}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
                            {data.name || "Título del Producto"}
                        </h1>
                        
                        <div className="text-3xl font-bold text-emerald-600 mb-6">
                            ${data.price || "0.00"}
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                            {data.description || "Aquí aparecerá la descripción detallada de tu producto. Es importante escribir un buen texto para convencer a tus clientes."}
                        </p>

                        {/* Botones de Compra Simulados */}
                        <div className="flex gap-4 mb-8">
                            <button className="flex-1 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-transform active:scale-95 shadow-lg">
                                Añadir al Carrito
                            </button>
                            <button className="w-14 h-14 border-2 border-slate-200 rounded-xl flex items-center justify-center text-xl hover:border-red-400 hover:text-red-500 transition-colors">
                                ♥
                            </button>
                        </div>

                        {/* Metadata Extra */}
                        {/* ... dentro del componente ProductPreview ... */}

{/* Metadata Extra (ACTUALIZADO) */}
<div className="border-t border-gray-100 pt-6 space-y-3 text-sm">
    
    {/* SKU */}
    <div className="flex justify-between items-center border-b border-gray-50 pb-2">
        <span className="text-gray-400 font-medium">SKU (Referencia):</span>
        <span className="font-mono text-slate-600 bg-gray-100 px-2 py-0.5 rounded text-xs uppercase">
            {data.sku || "SIN-ASIGNAR"}
        </span>
    </div>

    {/* Stock */}
    <div className="flex justify-between items-center border-b border-gray-50 pb-2">
        <span className="text-gray-400 font-medium">Stock Disponible:</span>
        <span className={`font-bold ${data.stock > 0 ? "text-slate-800" : "text-red-500"}`}>
            {data.stock || 0} unidades
        </span>
    </div>

    {/* Categoría */}
    <div className="flex justify-between items-center border-b border-gray-50 pb-2">
        <span className="text-gray-400 font-medium">Categoría:</span>
        <span className="font-bold text-blue-600 hover:underline cursor-pointer">
            {data.category || "General"}
        </span>
    </div>

    {/* Marca (Nuevo) */}
    <div className="flex justify-between items-center">
        <span className="text-gray-400 font-medium">Marca:</span>
        <span className="font-bold text-slate-900 uppercase tracking-wide">
            {data.brand || "Generico"}
        </span>
    </div>

</div>


                    </div>
                </div>

                {/* SEO PREVIEW (Simulación de Google) */}
                <div className="mt-16 pt-10 border-t border-gray-200">
                    <h3 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-4">
                        Así se verá en Google (SEO)
                    </h3>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 max-w-xl shadow-sm">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs">🌐</div>
                            <span className="text-xs text-slate-700">mitienda.com › productos › {data.slug || "producto"}</span>
                        </div>
                        <h4 className="text-xl text-blue-800 font-medium hover:underline cursor-pointer truncate">
                            {data.metaTitle || data.name || "Título del Producto - Mi Tienda"}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {data.metaDescription || data.description?.substring(0, 150) || "Descripción del producto para los resultados de búsqueda..."}...
                        </p>
                    </div>
                </div>

            </main>

            {/* FOOTER FALSO */}
            <footer className="bg-slate-50 border-t border-slate-200 py-8 px-6 text-center mt-auto">
                <p className="text-sm text-gray-400 font-medium">© 2026 Mi Tienda E-commerce. Todos los derechos reservados.</p>
            </footer>

        </div>
      </div>
    </div>
  );
}