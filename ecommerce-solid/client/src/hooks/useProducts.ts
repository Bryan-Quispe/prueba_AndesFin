import { useState, useEffect } from "react";
import axios from "axios";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  isPublished: boolean;
  images: { id: string; url: string }[];
  brandId?: string;
  categoryId?: string;
  // ... otros campos
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const createProduct = async (data: any) => {
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/products`, data);
      await fetchProducts();
      return true;
    } catch (err: any) {
      // AQUÍ VERÁS EL ERROR REAL EN LA CONSOLA DEL NAVEGADOR
      console.error(" Error creando producto:", err.response?.data || err.message);
      alert(`Error al crear: ${JSON.stringify(err.response?.data?.message || "Error desconocido")}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: string, data: any) => {
    setLoading(true);
    try {
      console.log(" Enviando actualización:", { id, data }); // Debug para ver qué enviamos
      await axios.patch(`${apiUrl}/products/${id}`, data);
      await fetchProducts();
      return true;
    } catch (err: any) {
      // AQUÍ VERÁS EL ERROR REAL EN LA CONSOLA DEL NAVEGADOR
      console.error(" Error actualizando producto:", err.response?.data || err.message);
      alert(`Error al actualizar: ${JSON.stringify(err.response?.data?.message || "Error desconocido")}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return false;
    try {
      await axios.delete(`${apiUrl}/products/${id}`);
      await fetchProducts();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return { products, loading, createProduct, updateProduct, deleteProduct, refresh: fetchProducts };
}