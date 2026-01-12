"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import ProductList from "@/components/admin/ProductList";
import ProductForm from "@/components/admin/ProductForm";

export default function AdminPage() {
  const { products, loading, createProduct, updateProduct, deleteProduct } = useProducts();
  
  // ESTADOS DE VISTA
  const [view, setView] = useState<"list" | "form">("list");
  const [editingProduct, setEditingProduct] = useState<any>(null); // Producto a editar

  // 1. Manejar click en "Editar" desde la lista
  const handleEditClick = (product: any) => {
    setEditingProduct(product);
    setView("form");
  };

  // 2. Manejar click en "Nuevo"
  const handleCreateClick = () => {
    setEditingProduct(null); // Limpiamos
    setView("form");
  };

  // 3. Manejar Submit (Crear o Actualizar)
  const handleFormSubmit = async (formData: any, isPublished: boolean) => {
    
    // Validación numérica rápida
    const priceValue = parseFloat(formData.price);
    const stockValue = parseInt(formData.stock);

    if (isNaN(priceValue)) {
        alert("El precio debe ser un número válido");
        return;
    }

    // CONSTRUCCIÓN DEL PAYLOAD (Limpieza de datos para el Backend)
    const payload = {
        name: formData.name,
        slug: formData.slug || undefined,
        description: formData.description,
        price: priceValue,
        stock: isNaN(stockValue) ? 0 : stockValue,
        sku: formData.sku,
        // Si no has migrado la BD con newLabelDays, el backend lo ignorará si usaste la solución B
        newLabelDays: formData.newLabelDays ? parseInt(formData.newLabelDays) : 0,

        // Relaciones: Convertimos cadenas vacías a undefined
        brandId: (!formData.brandId || formData.brandId === "") ? undefined : formData.brandId, 
        categoryId: (!formData.categoryId || formData.categoryId === "") ? undefined : formData.categoryId,
        
        // Imágenes: Convertimos string suelto a array
        images: formData.imageUrl && formData.imageUrl.trim() !== "" ? [formData.imageUrl] : [],
        
        // SEO: Enviamos solo lo que el Backend acepta (sin keywords)
        seo: { 
            metaTitle: formData.metaTitle || "", 
            metaDescription: formData.metaDescription || ""
            // keywords: se eliminó para evitar error de propiedad desconocida
        },
        
        isPublished
    };

    let success = false;
    try {
        if (editingProduct) {
            // ACTUALIZAR
            success = await updateProduct(editingProduct.id, payload);
        } else {
            // CREAR
            success = await createProduct(payload);
        }

        if (success) {
            alert(editingProduct ? "✅ Actualizado correctamente" : "✅ Creado correctamente");
            setView("list");
            setEditingProduct(null);
        }
    } catch (error) {
        console.error("Error en submit:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="mb-8">
        {/* Espacio reservado para cabecera si se requiere */}
      </div>

      {view === "list" ? (
        <ProductList 
            products={products} 
            loading={loading} 
            onCreateNew={handleCreateClick}
            onEdit={handleEditClick}      
            onDelete={deleteProduct}      
        />
      ) : (
        <ProductForm 
            initialData={editingProduct}
            onCancel={() => setView("list")} 
            onSubmit={handleFormSubmit} 
        />
      )}
    </div>
  );
}