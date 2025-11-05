from fastapi import FastAPI, UploadFile, File, HTTPException, Form, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
import os
import shutil

app = FastAPI()

IMAGES_DIR = "imagenes_guardadas"
os.makedirs(IMAGES_DIR, exist_ok=True)

app.mount("/imagenes_guardadas", StaticFiles(directory=IMAGES_DIR), name="images")

# Extensiones válidas
VALID_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.svg'}

@app.get("/", response_class=HTMLResponse)
async def index():
    images = sorted(os.listdir(IMAGES_DIR))
    html = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>CRUD Imágenes</title>
        <style>
            body { font-family: Arial; margin: 40px; background: #f4f4f4; }
            h1 { color: #333; }
            .container { max-width: 900px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            .upload-box { background: #e3f2fd; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
            .image-item { display: inline-block; margin: 15px; text-align: center; background: #fff; padding: 10px; border: 1px solid #ddd; border-radius: 8px; width: 220px; }
            img { max-width: 200px; max-height: 150px; object-fit: cover; border-radius: 5px; }
            button { margin: 5px; padding: 8px 12px; border: none; border-radius: 5px; cursor: pointer; }
            .delete { background: #e74c3c; color: white; }
            .rename { background: #f39c12; color: white; }
            .update { background: #27ae60; color: white; }
            input[type="text"] { padding: 6px; width: 100px; }
            input[type="file"] { font-size: 12px; }
            .msg { padding: 10px; margin: 10px 0; border-radius: 5px; }
            .success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
            .error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        </style>
    </head>
    <body>
    <div class="container">
        <h1>Subir Nueva Imagen</h1>
        <div class="upload-box">
            <form action="/upload" method="post" enctype="multipart/form-data">
                <input type="file" name="file" accept="image/*" required>
                <button type="submit" style="background:#3498db;color:white;">Subir Imagen</button>
            </form>
        </div>

        <h1>Imágenes Guardadas</h1>
    """

    if not images:
        html += "<p><em>No hay imágenes aún.</em></p>"
    else:
        for img in images:
            html += f"""
            <div class="image-item">
                <img src="/imagenes_guardadas/{img}" alt="{img}">
                <br><strong>{img}</strong>

                <!-- Renombrar -->
                <form action="/rename" method="post" style="display:inline;">
                    <input type="hidden" name="old_name" value="{img}">
                    <input type="text" name="new_name" placeholder="nuevo.jpg" size="12" required>
                    <button type="submit" class="rename">Renombrar</button>
                </form>

                <!-- Actualizar Imagen -->
                <form action="/update/{img}" method="post" enctype="multipart/form-data" style="display:inline;">
                    <input type="file" name="new_file" accept="image/*" required>
                    <button type="submit" class="update">Actualizar</button>
                </form>

                <!-- Eliminar -->
                <form action="/delete/{img}" method="post" style="display:inline;">
                    <button type="submit" class="delete" onclick="return confirm('¿Eliminar {img}?')">Eliminar</button>
                </form>
            </div>
            """

    html += """
    </div>
    </body>
    </html>
    """
    return html

# CREATE
@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    if not file.filename or '.' not in file.filename:
        raise HTTPException(400, "Archivo inválido")
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in VALID_EXTENSIONS:
        raise HTTPException(400, "Tipo de imagen no permitido")
    path = os.path.join(IMAGES_DIR, file.filename)
    with open(path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    return RedirectResponse("/", status_code=303)

## UPDATE (reemplazar y cambiar nombre)
@app.post("/update/{filename}")
async def update_image(filename: str, new_file: UploadFile = File(...)):
    old_path = os.path.join(IMAGES_DIR, filename)
    if not os.path.exists(old_path):
        raise HTTPException(404, "Imagen no encontrada")
    if not new_file.filename:
        raise HTTPException(400, "No se seleccionó archivo")
    
    # Opcional: usar el nuevo nombre del archivo subido
    new_filename = new_file.filename
    new_path = os.path.join(IMAGES_DIR, new_filename)
    
    # Si ya existe, agregar número
    counter = 1
    while os.path.exists(new_path):
        name, ext = os.path.splitext(new_filename)
        new_filename = f"{name}_{counter}{ext}"
        new_path = os.path.join(IMAGES_DIR, new_filename)
        counter += 1
    
    # Guardar con nuevo nombre
    with open(new_path, "wb") as f:
        shutil.copyfileobj(new_file.file, f)
    
    # Eliminar el archivo antiguo
    os.remove(old_path)
    
    return RedirectResponse("/", status_code=303)
# RENAME (CORREGIDO)
@app.post("/rename")
async def rename(old_name: str = Form(...), new_name: str = Form(...)):
    new_name = new_name.strip()
    if not new_name:
        raise HTTPException(400, "Nombre vacío")
    if '.' not in new_name:
        raise HTTPException(400, "Falta la extensión (ej: .jpg)")
    
    name_part, ext = os.path.splitext(new_name)
    if not name_part:
        raise HTTPException(400, "Nombre no puede ser solo extensión")
    ext = ext.lower()
    if ext not in VALID_EXTENSIONS:
        raise HTTPException(400, f"Extensión no válida. Usa: {', '.join(VALID_EXTENSIONS)}")

    old_path = os.path.join(IMAGES_DIR, old_name)
    new_path = os.path.join(IMAGES_DIR, new_name)

    if not os.path.exists(old_path):
        raise HTTPException(404, "Imagen no encontrada")
    if os.path.exists(new_path):
        raise HTTPException(400, "Ya existe un archivo con ese nombre")

    os.rename(old_path, new_path)
    return RedirectResponse("/", status_code=303)

# DELETE
@app.post("/delete/{filename}")
async def delete(filename: str):
    path = os.path.join(IMAGES_DIR, filename)
    if not os.path.exists(path):
        raise HTTPException(404, "No encontrada")
    os.remove(path)
    return RedirectResponse("/", status_code=303)