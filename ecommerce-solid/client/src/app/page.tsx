"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  images: { url: string; altText: string }[];
  newUntil?: string; 
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fallback de seguridad por si no lee el .env
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
        
        const response = await axios.get(`${apiUrl}/products`);
        const data = Array.isArray(response.data) ? response.data : response.data.data || [];
        setProducts(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      
      {/* Header de la Tienda (Sin botón Admin) */}
      <header className="max-w-7xl mx-auto mb-10 flex justify-center md:justify-start">
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
          Mi Tienda SOLID 🛒
        </h1>
      </header>

      {loading ? (
        <div className="text-center py-20 text-xl text-gray-500">Cargando catálogo...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
              
              {/* --- ZONA DE IMAGEN CORREGIDA --- */}
              <div className="h-64 bg-gray-200 w-full relative overflow-hidden flex items-center justify-center">
                
                {/* Lógica: Si hay imagen Y tiene URL válida, la mostramos */}
                {product.images && product.images.length > 0 && product.images[0].url ? (
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  /* Caso contrario: Mostramos el placeholder */
                  <div className="text-center p-4">
                    <span className="text-gray-400 font-medium text-2xl block mb-1">
                      📷
                    </span>
                    <span className="text-gray-500 font-bold text-sm">
                      Sin imagen asignada
                    </span>
                  </div>
                )}

                {/* ETIQUETA DE NUEVO */}
                {product.newUntil && new Date(product.newUntil) > new Date() && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                    NUEVO
                  </span>
                )}
              </div>
              {/* --- FIN ZONA IMAGEN --- */}

              {/* Info del Producto */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h2>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-end mt-4">
                  <div>
                    <span className="text-xs text-gray-400 uppercase font-semibold">Precio</span>
                    <div className="text-2xl font-bold text-emerald-600">${product.price}</div>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 transition">
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}