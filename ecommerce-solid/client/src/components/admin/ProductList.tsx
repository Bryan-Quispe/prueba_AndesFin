"use client";

import { useState, useMemo } from "react";

interface ProductListProps {
  products: any[];
  loading: boolean;
  onCreateNew: () => void;
  onEdit: (product: any) => void;
  onDelete: (id: string) => void;
}

export default function ProductList({ products, loading, onCreateNew, onEdit, onDelete }: ProductListProps) {
  const [activeTab, setActiveTab] = useState<"all" | "published" | "draft">("all");
  const [searchTerm, setSearchTerm] = useState("");

  // 1. CÁLCULO DE ESTADÍSTICAS (KPIs)
  const stats = useMemo(() => {
    const total = products.length;
    const published = products.filter(p => p.isPublished).length;
    const totalValue = products.reduce((acc, curr) => acc + (Number(curr.price) * curr.stock), 0);
    const lowStock = products.filter(p => p.stock < 5).length;
    return { total, published, totalValue, lowStock };
  }, [products]);

  // 2. FILTRADO (Tab + Buscador)
  const filteredProducts = products.filter((p) => {
    const matchesTab = 
        activeTab === "all" ? true : 
        activeTab === "published" ? p.isPublished : !p.isPublished;
    
    // Búsqueda segura (maneja nulos)
    const matchesSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* --- SECCIÓN 1: HEADER Y ESTADÍSTICAS --- */}
      <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Inventario</h2>
                <p className="text-slate-500 text-sm mt-1">Visión general de tus productos y stock.</p>
            </div>
            <button 
                onClick={onCreateNew} 
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Nuevo Producto
            </button>
          </div>

          {/* TARJETAS DE KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xl">📦</div>
                  <div>
                      <p className="text-slate-500 text-xs font-bold uppercase">Total Productos</p>
                      <h4 className="text-2xl font-black text-slate-800">{stats.total}</h4>
                  </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">💰</div>
                  <div>
                      <p className="text-slate-500 text-xs font-bold uppercase">Valor Inventario</p>
                      <h4 className="text-2xl font-black text-slate-800">${stats.totalValue.toLocaleString()}</h4>
                  </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-xl">🚀</div>
                  <div>
                      <p className="text-slate-500 text-xs font-bold uppercase">Publicados</p>
                      <h4 className="text-2xl font-black text-slate-800">{stats.published}</h4>
                  </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-xl">⚠️</div>
                  <div>
                      <p className="text-slate-500 text-xs font-bold uppercase">Stock Bajo</p>
                      <h4 className="text-2xl font-black text-slate-800">{stats.lowStock}</h4>
                  </div>
              </div>
          </div>
      </div>

      {/* --- SECCIÓN 2: TABLA CON BARRA DE HERRAMIENTAS --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Barra de Herramientas (Tabs + Buscador) */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
            
            {/* TABS (Texto corregido a oscuro) */}
            <div className="flex bg-slate-200 p-1 rounded-lg self-start md:self-auto">
                {["all", "published", "draft"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all capitalize ${
                            activeTab === tab 
                            ? "bg-white text-slate-900 shadow-sm"  // Activo: Negro
                            : "text-slate-600 hover:text-slate-800 hover:bg-slate-300/50" // Inactivo: Gris Oscuro
                        }`}
                    >
                        {tab === "all" ? "Todos" : tab === "published" ? "Publicados" : "Borradores"}
                    </button>
                ))}
            </div>

            {/* BUSCADOR (Texto corregido a oscuro) */}
            <div className="relative w-full md:w-64">
                <span className="absolute left-3 top-2.5 text-slate-500">🔍</span>
                <input 
                    type="text" 
                    placeholder="Buscar producto o SKU..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400"
                />
            </div>
        </div>

        {/* Tabla */}
        {loading ? (
            <div className="p-20 text-center flex flex-col items-center">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500 font-medium">Cargando inventario...</p>
            </div>
        ) : filteredProducts.length === 0 ? (
            <div className="p-20 text-center flex flex-col items-center text-slate-400">
                <span className="text-4xl mb-2">🔍</span>
                <p>No se encontraron productos.</p>
            </div>
        ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[800px]">
                    <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                        <tr>
                            <th className="p-5 whitespace-nowrap">Producto</th>
                            <th className="p-5 whitespace-nowrap">Precio</th>
                            <th className="p-5 whitespace-nowrap">Stock</th>
                            <th className="p-5 whitespace-nowrap">Estado</th>
                            <th className="p-5 text-right whitespace-nowrap">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filteredProducts.map((p) => (
                            <tr key={p.id} className="hover:bg-blue-50/30 transition-colors group">
                                <td className="p-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 p-1 shrink-0 shadow-sm overflow-hidden">
                                            {/* --- FIX DEL ERROR DE CONSOLA --- */}
                                            {/* Solo renderizamos <img> si la URL existe y no es cadena vacía */}
                                            {p.images && p.images.length > 0 && p.images[0].url ? (
                                                <img src={p.images[0].url} className="w-full h-full object-contain rounded" alt={p.name} />
                                            ) : (
                                                <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-300 text-xs">Sin Foto</div>
                                            )}
                                        </div>
                                        <div>
                                            <span className="font-bold text-slate-900 block">{p.name}</span>
                                            <span className="text-xs text-slate-400 font-mono">{p.sku || "SIN-SKU"}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-5 text-slate-700 font-bold text-sm whitespace-nowrap">
                                    ${Number(p.price).toFixed(2)}
                                </td>
                                <td className="p-5 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${p.stock < 5 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></span>
                                        <span className="text-slate-600 font-medium text-sm">{p.stock} u.</span>
                                    </div>
                                </td>
                                <td className="p-5 whitespace-nowrap">
                                    {p.isPublished 
                                        ? <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide">
                                            ● Publicado
                                          </span> 
                                        : <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide">
                                            ○ Borrador
                                          </span>}
                                </td>
                                <td className="p-5 text-right whitespace-nowrap">
                                    <div className="flex justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => onEdit(p)} 
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                                            title="Editar"
                                        >
                                            ✏️
                                        </button>
                                        <button 
                                            onClick={() => onDelete(p.id)} 
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                                            title="Eliminar"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}

        {/* FOOTER DE TABLA */}
        {!loading && filteredProducts.length > 0 && (
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                <span>Mostrando <strong>{filteredProducts.length}</strong> resultados</span>
                <div className="flex gap-2">
                    <button disabled className="px-3 py-1 border rounded bg-white opacity-50 cursor-not-allowed">Anterior</button>
                    <button disabled className="px-3 py-1 border rounded bg-white opacity-50 cursor-not-allowed">Siguiente</button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}