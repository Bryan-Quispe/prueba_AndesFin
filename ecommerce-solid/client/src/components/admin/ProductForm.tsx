"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ProductPreview from "./ProductPreview";
import ImageUploader from "./ImageUploader";

interface ProductFormProps {
  onCancel: () => void;
  onSubmit: (data: any, isPublished: boolean) => Promise<void>;
  initialData?: any;
}

interface Brand { id: string; name: string; }
interface Category { id: string; name: string; }

export default function ProductForm({ onCancel, onSubmit, initialData }: ProductFormProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingLists, setLoadingLists] = useState(true);

  const [form, setForm] = useState({
    name: "", slug: "", description: "", price: "", stock: "", sku: "",
    categoryId: "", brandId: "", imageUrl: "", 
    metaTitle: "", metaDescription: "", newLabelDays: 0
  });

  useEffect(() => {
    const fetchLists = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
            const [brandsRes, catsRes] = await Promise.all([
                axios.get(`${apiUrl}/brands`),
                axios.get(`${apiUrl}/categories`)
            ]);
            setBrands(brandsRes.data);
            setCategories(catsRes.data);
        } catch (e) { console.error("Error cargando listas", e); } 
        finally { setLoadingLists(false); }
    };
    fetchLists();
  }, []);

  useEffect(() => {
    if (initialData) {
        setForm({
            name: initialData.name || "",
            slug: initialData.slug || "",
            description: initialData.description || "",
            price: initialData.price || "",
            stock: initialData.stock || "",
            sku: initialData.sku || "",
            categoryId: initialData.categoryId || "",
            brandId: initialData.brandId || "",
            imageUrl: initialData.images && initialData.images.length > 0 
                      ? initialData.images[0].url 
                      : (typeof initialData.images === 'string' ? initialData.images : ""),
            metaTitle: initialData.seo?.metaTitle || "",
            metaDescription: initialData.seo?.metaDescription || "",
            newLabelDays: initialData.newLabelDays || 0
        });
    }
  }, [initialData]);

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleImageUpload = (url: string) => setForm(prev => ({ ...prev, imageUrl: url }));

  const generateSKU = () => {
    if (!form.name) return;
    const random = Math.floor(1000 + Math.random() * 9000);
    const selectedBrand = brands.find(b => b.id === form.brandId);
    const prefix = selectedBrand ? selectedBrand.name.substring(0, 3).toUpperCase() : "GEN";
    setForm(prev => ({ ...prev, sku: `${prefix}-${random}` }));
  };

  const getPreviewData = () => {
    const brandName = brands.find(b => b.id === form.brandId)?.name || "Sin Marca";
    const categoryName = categories.find(c => c.id === form.categoryId)?.name || "General";
    return { ...form, brand: brandName, category: categoryName };
  };

  return (
    <>
      {showPreview && (
        <ProductPreview data={getPreviewData()} onClose={() => setShowPreview(false)} />
      )}

      <div className="flex gap-8 items-start animate-fadeIn">
        <div className="flex-1 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
            
            {/* Header del Formulario */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b pb-4 gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">
                        {initialData ? "Editar Producto" : "Agregar Producto"}
                    </h2>
                    <p className="text-xs text-slate-400">Complete la ficha técnica</p>
                </div>
                <button 
                    type="button"
                    onClick={() => setShowPreview(true)}
                    className="w-full md:w-auto text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors border border-blue-100"
                >
                    👁️ Vista Previa
                </button>
            </div>
            
            <div className="space-y-6">
                
                {/* Uploader */}
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Imagen del Producto</label>
                    <ImageUploader currentImage={form.imageUrl} onUpload={handleImageUpload} />
                </div>

                {/* Inputs Base */}
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nombre del Producto</label>
                    <input name="name" value={form.name} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ej: Nike Air Jordan 1" />
                </div>

                {/* Selectores Responsivos (CORREGIDO: LETRAS NEGRAS) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                            Marca {loadingLists && "..."}
                        </label>
                        <select 
                            name="brandId" 
                            value={form.brandId} 
                            onChange={handleChange} 
                            // CLASE CORREGIDA: text-slate-900 bg-white
                            className="w-full p-3 border border-slate-300 rounded-lg text-slate-900 bg-white cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none"
                            disabled={loadingLists}
                        >
                            <option value="" className="text-slate-500">-- Seleccionar Marca --</option>
                            {brands.map(brand => (
                                <option key={brand.id} value={brand.id} className="text-slate-900">
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                            Categoría {loadingLists && "..."}
                        </label>
                        <select 
                            name="categoryId" 
                            value={form.categoryId} 
                            onChange={handleChange} 
                            // CLASE CORREGIDA: text-slate-900 bg-white
                            className="w-full p-3 border border-slate-300 rounded-lg text-slate-900 bg-white cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none"
                            disabled={loadingLists}
                        >
                            <option value="" className="text-slate-500">-- Seleccionar Categoría --</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id} className="text-slate-900">
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Precios y Stock (1 col movil, 3 PC) */}
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Precio ($)</label>
                        <input type="number" name="price" value={form.price} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-lg text-slate-900 font-bold" placeholder="0.00" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Stock</label>
                        <input type="number" name="stock" value={form.stock} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-lg text-slate-900" placeholder="0" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex justify-between">
                            SKU <span onClick={generateSKU} className="text-blue-500 cursor-pointer text-[10px] hover:underline">Generar</span>
                        </label>
                        <input name="sku" value={form.sku} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-lg text-slate-600 font-mono tracking-wider uppercase" placeholder="ABC-001" />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Descripción</label>
                    <textarea name="description" rows={4} value={form.description} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded-lg text-slate-900" placeholder="Detalles del producto..." />
                </div>

                {/* Botones de Acción Responsivos */}
                <div className="flex flex-col md:flex-row gap-4 pt-6 mt-6 border-t border-slate-100">
                    <button onClick={() => onSubmit(form, true)} className="flex-1 bg-emerald-600 text-white py-3.5 rounded-xl font-bold hover:bg-emerald-700 shadow-lg transition-transform active:scale-95">
                        {initialData ? "Actualizar Producto" : "Publicar"}
                    </button>
                    <button onClick={() => onSubmit(form, false)} className="flex-1 bg-white border border-slate-300 text-slate-700 py-3.5 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                        Guardar Borrador
                    </button>
                    <button onClick={onCancel} className="px-6 text-slate-400 hover:text-red-500 font-bold text-sm transition-colors py-3 md:py-0">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}