"use client";

import { useState } from "react";
import axios from "axios";

interface ImageUploaderProps {
  currentImage?: string;
  onUpload: (url: string) => void;
}

export default function ImageUploader({ currentImage, onUpload }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
      const res = await axios.post(`${apiUrl}/upload`, formData);
      onUpload(res.data.url);
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      alert("Error al subir la imagen.");
    } finally {
      setUploading(false);
    }
  };

  // Función para eliminar la imagen (limpiar estado)
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que se abra el selector de archivos al dar click en borrar
    e.preventDefault();
    if (confirm("¿Quitar esta imagen?")) {
        onUpload(""); // Enviamos cadena vacía al padre
    }
  };

  return (
    <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-4 flex flex-col items-center justify-center bg-slate-50 hover:bg-white transition-colors group cursor-pointer min-h-[200px]">
      
      {currentImage ? (
        <div className="relative w-full h-48 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
          <img src={currentImage} alt="Preview" className="w-full h-full object-contain" />
          
          {/* Capa oscura al pasar el mouse */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <p className="text-white font-bold text-sm">Click para cambiar</p>
          </div>

          {/* BOTÓN ELIMINAR (Siempre visible encima de la imagen) */}
          <button 
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-transform hover:scale-110 z-20"
            title="Eliminar imagen"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      ) : (
        <div className="text-center py-6 text-slate-400">
          <span className="text-4xl block mb-2">☁️</span>
          <span className="text-sm font-bold">Subir Imagen</span>
          <span className="text-xs block mt-1">(JPG, PNG, WebP - Max 10MB)</span>
        </div>
      )}
      
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        disabled={uploading}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
      />
      
      {uploading && (
        <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-30 rounded-xl">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-blue-600 text-sm font-bold animate-pulse">Subiendo imagen.....</p>
        </div>
      )}
    </div>
  );
}