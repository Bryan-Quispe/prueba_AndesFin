"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ImageUploader from "./ImageUploader";

interface Resource {
  id: string;
  name: string;
  image?: string;
}

interface ResourceManagerProps {
  title: string;
  endpoint: string;
}

export default function ResourceManager({ title, endpoint }: ResourceManagerProps) {
  const [items, setItems] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "form">("list");
  const [searchTerm, setSearchTerm] = useState(""); // Buscador
  
  const [editingItem, setEditingItem] = useState<Resource | null>(null);
  const [formName, setFormName] = useState("");
  const [formImage, setFormImage] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/${endpoint}`);
      setItems(res.data);
    } catch (error) {
      console.error(`Error cargando ${endpoint}`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, [endpoint]);

  const openForm = (item?: Resource) => {
    if (item) {
        setEditingItem(item);
        setFormName(item.name);
        setFormImage(item.image || "");
    } else {
        setEditingItem(null);
        setFormName("");
        setFormImage("");
    }
    setView("form");
  };

  const handleSave = async () => {
    if (!formName.trim()) return alert("El nombre es obligatorio");
    const payload = { name: formName, image: formImage };

    try {
        if (editingItem) {
            await axios.patch(`${apiUrl}/${endpoint}/${editingItem.id}`, payload);
        } else {
            await axios.post(`${apiUrl}/${endpoint}`, payload);
        }
        await fetchItems();
        setView("list");
        alert("✅ Guardado correctamente");
    } catch (error) {
        console.error(error);
        alert("Error al guardar");
    }
  };

  const handleDelete = async (id: string) => {
    if(!confirm("¿Seguro que deseas eliminar?")) return;
    try {
        await axios.delete(`${apiUrl}/${endpoint}/${id}`);
        fetchItems();
    } catch (error) {
        alert("No se puede eliminar (posiblemente esté en uso por un producto)");
    }
  };

  // Filtrado simple
  const filteredItems = items.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="max-w-5xl mx-auto pb-20 animate-fadeIn">
      
      {/* HEADER PRINCIPAL */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
            <h1 className="text-3xl font-extrabold text-slate-900">{title}</h1>
            <p className="text-slate-500 mt-1">Administra las opciones disponibles en tu tienda.</p>
        </div>
        
        {view === "list" && (
            <button 
                onClick={() => openForm()} 
                className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg flex items-center gap-2"
            >
                <span>+</span> Agregar Nuevo
            </button>
        )}
      </div>

      {view === "list" ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[400px]">
            
           {/* BARRA DE BÚSQUEDA CORREGIDA (Texto Oscuro) */}
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <input 
                    type="text" 
                    placeholder={`Buscar en ${title}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    // CORRECCIÓN AQUÍ: Agregamos 'text-slate-900' y 'bg-white'
                    className="w-full md:w-96 p-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-400"
                />
            </div>

            {/* TABLA MEJORADA */}
            <div className="overflow-x-auto flex-1">
                <table className="w-full text-left min-w-[600px]">
                    <thead className="bg-white text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-slate-100">
                        <tr>
                            <th className="p-5 pl-8">Preview</th>
                            <th className="p-5 w-full">Nombre del Recurso</th>
                            <th className="p-5 text-right pr-8">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filteredItems.map(item => (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                                <td className="p-4 pl-8">
                                    <div className="w-16 h-16 bg-white rounded-xl overflow-hidden border border-slate-200 p-1 shadow-sm">
                                        {item.image ? (
                                            <img src={item.image} className="w-full h-full object-contain rounded-lg" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-300 bg-slate-50">N/A</div>
                                        )}
                                    </div>
                                </td>
                                <td className="p-4 font-bold text-slate-800 text-lg align-middle">
                                    {item.name}
                                </td>
                                <td className="p-4 text-right pr-8 align-middle">
                                    <div className="flex justify-end gap-3">
                                        <button onClick={() => openForm(item)} className="text-slate-400 hover:text-blue-600 font-bold text-sm transition-colors border border-slate-200 px-3 py-1.5 rounded-lg hover:border-blue-200 hover:bg-blue-50">
                                            Editar
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} className="text-slate-400 hover:text-red-500 font-bold text-sm transition-colors border border-slate-200 px-3 py-1.5 rounded-lg hover:border-red-200 hover:bg-red-50">
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredItems.length === 0 && !loading && (
                            <tr><td colSpan={3} className="p-12 text-center text-slate-400 italic">No se encontraron resultados.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* FOOTER */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 text-xs text-slate-400 text-center">
                Total de registros: {filteredItems.length}
            </div>
        </div>
      ) : (
        // --- FORMULARIO IGUAL QUE ANTES PERO CON MEJOR ESPACIADO ---
        <div className="flex flex-col md:flex-row gap-8 items-start animate-fadeIn">
            <div className="w-full flex-1 bg-white p-8 rounded-2xl shadow-sm border border-slate-200 order-2 md:order-1">
                <h2 className="text-xl font-bold mb-6 text-slate-900 border-b pb-4">{editingItem ? "Editar Registro" : "Crear Nuevo"}</h2>
                
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nombre</label>
                        <input 
                            value={formName} 
                            onChange={(e) => setFormName(e.target.value)} 
                            className="w-full p-4 border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-slate-900 outline-none transition-shadow" 
                            placeholder="Ej: Nike o Sneakers"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Imagen / Logo</label>
                        <ImageUploader currentImage={formImage} onUpload={setFormImage} />
                    </div>

                    <div className="flex flex-col-reverse md:flex-row gap-3 pt-6 border-t border-slate-100 mt-6">
                         <button onClick={() => setView("list")} className="w-full md:w-auto px-6 py-3 text-slate-500 font-bold hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">Cancelar</button>
                         <button onClick={handleSave} className="w-full md:flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-transform active:scale-95 shadow-lg">Guardar Cambios</button>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-80 order-1 md:order-2">
                <div className="bg-white p-8 rounded-2xl shadow border border-slate-200 flex flex-col items-center text-center sticky top-6">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-6 tracking-widest">Vista Previa</p>
                    <div className="w-32 h-32 bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-inner mb-6 flex items-center justify-center p-2">
                        {formImage ? (
                            <img src={formImage} className="w-full h-full object-contain" />
                        ) : (
                            <span className="text-4xl opacity-20">🖼️</span>
                        )}
                    </div>
                    <h3 className="font-black text-slate-900 text-2xl mb-2">{formName || "Sin Nombre"}</h3>
                    <span className="text-xs text-white bg-slate-900 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                        {endpoint === "brands" ? "Marca" : "Categoría"}
                    </span>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}