# 🏦 AndesFin - Microservicio de Simulación de Inversiones

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS"/>
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma"/>
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
</p>

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Arquitectura y Patrones de Diseño](#-arquitectura-y-patrones-de-diseño)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación y Ejecución](#-instalación-y-ejecución)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Ejemplos de Uso](#-ejemplos-de-uso)
- [Algoritmo de Optimización](#-algoritmo-de-optimización)
- [Datos Precargados](#-datos-precargados)

---

## 📖 Descripción del Proyecto

**AndesFin** es una plataforma fintech ficticia de microinversiones que permite a clientes minoristas invertir montos relativamente pequeños (entre $50 y $2,000) sin requerir asesoría financiera presencial.

Este microservicio implementa:
- ✅ Gestión de usuarios con capital disponible
- ✅ Catálogo de productos financieros con diferentes costos y retornos
- ✅ **Simulación de inversión óptima** usando el algoritmo de la mochila (Knapsack 0/1)
- ✅ Registro y consulta de simulaciones históricas
- ✅ Trazabilidad completa para auditoría

### 🎯 Problema que Resuelve

| Situación | Solución |
|-----------|----------|
| Limitación de capital del cliente | Algoritmo de optimización que maximiza ganancias sin exceder el capital |
| Oferta heterogénea con riesgos distintos | Evaluación de múltiples combinaciones de productos |
| Necesidad de transparencia y auditoría | Registro persistente de cada simulación con todos los cálculos |

---

## 🛠 Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **NestJS** | 10.x | Framework backend |
| **Prisma** | 5.x | ORM para acceso a datos |
| **PostgreSQL** | 15 | Base de datos relacional |
| **TypeScript** | 5.x | Lenguaje de programación |
| **Docker** | - | Contenedorización |
| **Docker Compose** | 3.8 | Orquestación de servicios |
| **class-validator** | 0.14.x | Validación de DTOs |
| **class-transformer** | 0.5.x | Transformación de datos |

---

## 🏗 Arquitectura y Patrones de Diseño

### Principios SOLID Implementados

| Principio | Implementación |
|-----------|----------------|
| **S** - Single Responsibility | Cada clase tiene una única responsabilidad (Controllers, Services, Repositories) |
| **O** - Open/Closed | Los servicios son extensibles sin modificar código existente |
| **L** - Liskov Substitution | Los DTOs pueden ser sustituidos por sus subtipos |
| **I** - Interface Segregation | Interfaces específicas para cada tipo de repositorio |
| **D** - Dependency Inversion | Los servicios dependen de abstracciones (interfaces), no de implementaciones |

### Patrones de Diseño

```
┌─────────────────────────────────────────────────────────────────┐
│                        CAPA DE PRESENTACIÓN                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │UsuarioController│  │ProductoController│ │SimulacionController│
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  │
└───────────┼─────────────────────┼─────────────────────┼──────────┘
            │                     │                     │
            ▼                     ▼                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                        CAPA DE NEGOCIO                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │  UsuarioService │  │ ProductoService │  │SimulacionService │  │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  │
└───────────┼─────────────────────┼─────────────────────┼──────────┘
            │                     │                     │
            ▼                     ▼                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                       CAPA DE ACCESO A DATOS                     │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │UsuarioRepository│  │ProductoRepository│ │SimulacionRepository│
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  │
└───────────┼─────────────────────┼─────────────────────┼──────────┘
            │                     │                     │
            └─────────────────────┼─────────────────────┘
                                  ▼
                    ┌─────────────────────────┐
                    │      PrismaService      │
                    │     (Base de Datos)     │
                    └─────────────────────────┘
```

---

## 📁 Estructura del Proyecto

```
andesfin-microservice/
├── 📄 docker-compose.yml          # Orquestación de servicios
├── 📄 Dockerfile                  # Imagen Docker del backend
├── 📄 package.json                # Dependencias del proyecto
├── 📄 tsconfig.json               # Configuración TypeScript
├── 📄 nest-cli.json               # Configuración NestJS
│
├── 📁 prisma/
│   ├── 📄 schema.prisma           # Esquema de base de datos
│   └── 📄 seed.ts                 # Datos iniciales
│
├── 📁 scripts/
│   └── 📄 init.sql                # Script de inicialización DB
│
└── 📁 src/
    ├── 📄 main.ts                 # Punto de entrada
    ├── 📄 app.module.ts           # Módulo principal
    │
    ├── 📁 common/
    │   ├── 📁 interfaces/
    │   │   └── 📄 base-repository.interface.ts
    │   └── 📁 prisma/
    │       ├── 📄 prisma.module.ts
    │       └── 📄 prisma.service.ts
    │
    └── 📁 modules/
        ├── 📁 usuario/
        │   ├── 📁 dto/
        │   │   └── 📄 usuario.dto.ts
        │   ├── 📄 usuario.controller.ts
        │   ├── 📄 usuario.service.ts
        │   ├── 📄 usuario.repository.ts
        │   └── 📄 usuario.module.ts
        │
        ├── 📁 producto/
        │   ├── 📁 dto/
        │   │   └── 📄 producto.dto.ts
        │   ├── 📄 producto.controller.ts
        │   ├── 📄 producto.service.ts
        │   ├── 📄 producto.repository.ts
        │   └── 📄 producto.module.ts
        │
        └── 📁 simulacion/
            ├── 📁 dto/
            │   └── 📄 simulacion.dto.ts
            ├── 📄 simulacion.controller.ts
            ├── 📄 simulacion.service.ts
            ├── 📄 simulacion.repository.ts
            └── 📄 simulacion.module.ts
```

---

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Docker Desktop instalado y ejecutándose
- Git (opcional, para clonar el repositorio)

### 🐳 Ejecución con Docker Compose (Recomendado)

```bash


# 1. Levantar todos los servicios
docker-compose up --build

# 2. La aplicación estará disponible en:
#    http://localhost:3000
```

### 📦 Ejecución Local (Desarrollo)

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env

# 3. Generar cliente de Prisma
npx prisma generate

# 4. Ejecutar migraciones
npx prisma migrate dev

# 5. Cargar datos iniciales
npx prisma db seed

# 6. Iniciar en modo desarrollo
npm run start:dev
```

### ✅ Verificar que todo funciona

```bash
# Listar usuarios
curl http://localhost:3000/usuarios

# Listar productos
curl http://localhost:3000/productos
```

---

## 📡 Endpoints de la API

### Usuarios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/usuarios` | Listar todos los usuarios |
| `GET` | `/usuarios/:id` | Obtener usuario por ID |
| `POST` | `/usuarios` | Crear nuevo usuario |
| `PUT` | `/usuarios/:id` | Actualizar usuario |
| `DELETE` | `/usuarios/:id` | Eliminar usuario |

### Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/productos` | Listar productos activos |
| `GET` | `/productos/all` | Listar todos los productos |
| `GET` | `/productos/:id` | Obtener producto por ID |
| `POST` | `/productos` | Crear nuevo producto |
| `PUT` | `/productos/:id` | Actualizar producto |
| `DELETE` | `/productos/:id` | Eliminar producto |
| `PATCH` | `/productos/:id/activate` | Activar producto |
| `PATCH` | `/productos/:id/deactivate` | Desactivar producto |

### Simulaciones

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/simulaciones` | Crear simulación de inversión |
| `GET` | `/simulaciones/:usuarioId` | Obtener simulaciones de un usuario |
| `GET` | `/simulaciones/detalle/:id` | Obtener detalle de simulación |

---

## 💡 Ejemplos de Uso

### Ejemplo 1: Simulación con Ganancias Óptimas

**Request:**
```bash
curl -X POST http://localhost:3000/simulaciones \
  -H "Content-Type: application/json" \
  -d '{
    "usuario_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "capital_disponible": 3000.00,
    "productos": [
      {"nombre": "Fondo Acciones Tech", "precio": 1000.00, "porcentaje_ganancia": 8.50},
      {"nombre": "Bonos Corporativos AAA", "precio": 500.00, "porcentaje_ganancia": 5.25},
      {"nombre": "ETF Global", "precio": 1500.00, "porcentaje_ganancia": 12.00},
      {"nombre": "Fondo de Dividendos", "precio": 800.00, "porcentaje_ganancia": 6.75}
    ]
  }'
```

**Proceso de Cálculo:**

| Producto | Precio | % Ganancia | Ganancia por Unidad |
|----------|--------|------------|---------------------|
| ETF Global | $1,500.00 | 12.00% | $180.00 |
| Fondo Acciones Tech | $1,000.00 | 8.50% | $85.00 |
| Fondo de Dividendos | $800.00 | 6.75% | $54.00 |
| Bonos Corporativos AAA | $500.00 | 5.25% | $26.25 |

**Tabla de Optimización (Capital: $3,000):**

| Combinación | Costo Total | Ganancia Total | Capital Restante |
|-------------|-------------|----------------|------------------|
| ETF Global + Fondo Acciones Tech | $2,500.00 | **$265.00** ✅ | $500.00 |
| ETF Global + Fondo de Dividendos | $2,300.00 | $234.00 | $700.00 |
| Fondo Acciones Tech + Fondo de Dividendos + Bonos AAA | $2,300.00 | $165.25 | $700.00 |

**Response:**
```json
{
  "id": "f6g7h8i9-j0k1-2345-fghi-678901234567",
  "usuario_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "fecha_simulacion": "2024-01-15T10:30:00Z",
  "capital_disponible": 3000.00,
  "productos_seleccionados": [
    {
      "nombre": "ETF Global",
      "precio": 1500.00,
      "porcentaje_ganancia": 12.00,
      "ganancia_esperada": 180.00
    },
    {
      "nombre": "Fondo Acciones Tech",
      "precio": 1000.00,
      "porcentaje_ganancia": 8.50,
      "ganancia_esperada": 85.00
    }
  ],
  "costo_total": 2500.00,
  "capital_restante": 500.00,
  "ganancia_total": 265.00,
  "retorno_total_porcentaje": 10.60,
  "mensaje": "Simulación exitosa con ganancias óptimas"
}
```

---

### Ejemplo 2: Simulación con Ganancias Mínimas

**Request:**
```json
{
  "usuario_id": "b2c3d4e5-f6a7-8901-bcde-f23456789012",
  "capital_disponible": 1000.00,
  "productos": [
    {"nombre": "Bonos del Tesoro", "precio": 1200.00, "porcentaje_ganancia": 4.50},
    {"nombre": "Cuenta de Ahorro", "precio": 0.00, "porcentaje_ganancia": 1.50},
    {"nombre": "Fondo Conservador", "precio": 600.00, "porcentaje_ganancia": 3.25}
  ]
}
```

**Análisis de Viabilidad:**

| Producto | Precio | ¿Viable? | Razón |
|----------|--------|----------|-------|
| Bonos del Tesoro | $1,200.00 | ❌ | Excede capital ($1,000) |
| Cuenta de Ahorro | $0.00 | ✅ | Sin costo |
| Fondo Conservador | $600.00 | ✅ | Dentro del presupuesto |

**Response:**
```json
{
  "id": "g7h8i9j0-k1l2-3456-ghij-789012345678",
  "usuario_id": "b2c3d4e5-f6a7-8901-bcde-f23456789012",
  "fecha_simulacion": "2024-01-15T11:15:00Z",
  "capital_disponible": 1000.00,
  "productos_seleccionados": [
    {
      "nombre": "Fondo Conservador",
      "precio": 600.00,
      "porcentaje_ganancia": 3.25,
      "ganancia_esperada": 19.50
    }
  ],
  "costo_total": 600.00,
  "capital_restante": 400.00,
  "ganancia_total": 19.50,
  "retorno_total_porcentaje": 3.25,
  "mensaje": "Simulación con ganancias mínimas. Considere aumentar capital para mejores opciones."
}
```

---

### Ejemplo 3: Fondos Insuficientes

**Request:**
```json
{
  "usuario_id": "c3d4e5f6-a7b8-9012-cdef-345678901234",
  "capital_disponible": 500.00,
  "productos": [
    {"nombre": "Fondo Premium", "precio": 3000.00, "porcentaje_ganancia": 15.00},
    {"nombre": "Acciones Blue Chip", "precio": 1200.00, "porcentaje_ganancia": 9.50}
  ]
}
```

**Análisis de Viabilidad:**

| Producto | Precio Requerido | Capital Disponible | Diferencia | Estado |
|----------|------------------|-------------------|------------|--------|
| Fondo Premium | $3,000.00 | $500.00 | -$2,500.00 | ❌ No viable |
| Acciones Blue Chip | $1,200.00 | $500.00 | -$700.00 | ❌ No viable |

**Response:**
```json
{
  "error": "Fondos insuficientes",
  "detalle": "El capital disponible ($500.00) es insuficiente para adquirir cualquier producto de la lista.",
  "capital_disponible": 500.00,
  "producto_mas_barato": 1200.00,
  "diferencia_necesaria": 700.00,
  "recomendacion": "Aumente su capital o consulte productos con menor inversión mínima."
}
```

---

### Ejemplo 4: Alta Eficiencia de Capital

**Request:**
```json
{
  "usuario_id": "d4e5f6a7-b8c9-0123-defa-456789012345",
  "capital_disponible": 4000.00,
  "productos": [
    {"nombre": "ETF Global", "precio": 1500.00, "porcentaje_ganancia": 12.00},
    {"nombre": "Fondo Acciones Tech", "precio": 1000.00, "porcentaje_ganancia": 8.50},
    {"nombre": "Bonos Corporativos AAA", "precio": 500.00, "porcentaje_ganancia": 5.25},
    {"nombre": "Fondo de Dividendos", "precio": 800.00, "porcentaje_ganancia": 6.75},
    {"nombre": "Bonos del Tesoro", "precio": 1200.00, "porcentaje_ganancia": 4.50}
  ]
}
```

**Combinación Óptima:**
- ETF Global ($1,500) + Fondo Acciones Tech ($1,000) + Fondo Dividendos ($800) + Bonos AAA ($500)
- **Total: $3,800.00** (95% del capital utilizado)
- **Ganancia Total: $345.25**

**Response:**
```json
{
  "id": "h8i9j0k1-l2m3-4567-hijk-890123456789",
  "usuario_id": "d4e5f6a7-b8c9-0123-defa-456789012345",
  "fecha_simulacion": "2024-01-15T14:45:00Z",
  "capital_disponible": 4000.00,
  "productos_seleccionados": [
    {"nombre": "ETF Global", "precio": 1500.00, "porcentaje_ganancia": 12.00, "ganancia_esperada": 180.00},
    {"nombre": "Fondo Acciones Tech", "precio": 1000.00, "porcentaje_ganancia": 8.50, "ganancia_esperada": 85.00},
    {"nombre": "Fondo de Dividendos", "precio": 800.00, "porcentaje_ganancia": 6.75, "ganancia_esperada": 54.00},
    {"nombre": "Bonos Corporativos AAA", "precio": 500.00, "porcentaje_ganancia": 5.25, "ganancia_esperada": 26.25}
  ],
  "costo_total": 3800.00,
  "capital_restante": 200.00,
  "ganancia_total": 345.25,
  "retorno_total_porcentaje": 8.63,
  "eficiencia_capital": 95.00,
  "mensaje": "Simulación óptima con alta eficiencia de capital (95% utilizado)"
}
```

---

## 🧮 Algoritmo de Optimización

El servicio utiliza el **Algoritmo de la Mochila 0/1 (Knapsack)** implementado con **Programación Dinámica**.

### ¿Por qué este algoritmo?

| Característica | Beneficio |
|----------------|-----------|
| **Óptimo** | Garantiza la mejor combinación posible |
| **Eficiente** | Complejidad O(n × W) |
| **Determinístico** | Resultados reproducibles |

### Funcionamiento

```
Para cada producto i y cada capacidad w:
  Si el precio del producto ≤ capacidad actual:
    dp[i][w] = max(
      dp[i-1][w],                           // No incluir producto
      dp[i-1][w-precio] + ganancia           // Incluir producto
    )
  Sino:
    dp[i][w] = dp[i-1][w]                    // No se puede incluir
```

### Ejemplo Visual

```
Capital: $3,000
Productos: [ETF($1,500, $180), Tech($1,000, $85), Div($800, $54), Bonos($500, $26.25)]

Tabla de Programación Dinámica (simplificada):
┌─────────┬────────┬────────┬────────┬────────┬────────┐
│ Prod\Cap│ $0     │ $1,000 │ $1,500 │ $2,500 │ $3,000 │
├─────────┼────────┼────────┼────────┼────────┼────────┤
│ Ninguno │ $0     │ $0     │ $0     │ $0     │ $0     │
│ ETF     │ $0     │ $0     │ $180   │ $180   │ $180   │
│ +Tech   │ $0     │ $85    │ $180   │ $265   │ $265   │
│ +Div    │ $0     │ $85    │ $180   │ $265   │ $319   │
│ +Bonos  │ $0     │ $85    │ $180   │ $265   │ $319   │
└─────────┴────────┴────────┴────────┴────────┴────────┘

Resultado: ETF Global + Fondo Acciones Tech = $265.00 de ganancia
```

---

## 📊 Datos Precargados

### Usuarios (5)

| ID | Nombre | Email | Capital |
|----|--------|-------|---------|
| a1b2c3d4-... | Juan Pérez | juan.perez@email.com | $5,000.00 |
| b2c3d4e5-... | María García | maria.garcia@email.com | $8,000.00 |
| c3d4e5f6-... | Carlos Rodríguez | carlos.rodriguez@email.com | $3,000.00 |
| d4e5f6a7-... | Ana Martínez | ana.martinez@email.com | $10,000.00 |
| e5f6a7b8-... | Luis Sánchez | luis.sanchez@email.com | $2,000.00 |

### Productos Financieros (8)

| Nombre | Costo | Retorno | Descripción |
|--------|-------|---------|-------------|
| Fondo Acciones Tech | $1,000.00 | 8.50% | Acciones tecnológicas de alto crecimiento |
| Bonos Corporativos AAA | $500.00 | 5.25% | Bonos de alta calificación crediticia |
| ETF Global | $1,500.00 | 12.00% | Réplica del índice MSCI World |
| Fondo de Dividendos | $800.00 | 6.75% | Empresas con dividendos consistentes |
| Bonos del Tesoro | $1,200.00 | 4.50% | Bonos gubernamentales |
| Crowdfunding Inmobiliario | $250.00 | 9.00% | Inversión fraccionada en inmuebles |
| Fondo Premium | $3,000.00 | 15.00% | Estrategias sofisticadas de alto rendimiento |
| Fondo Conservador | $600.00 | 3.25% | Bajo riesgo, preservación de capital |

---

## 🔧 Comandos Útiles

```bash
# Ver logs de la aplicación
docker-compose logs -f backend

# Ver logs de la base de datos
docker-compose logs -f postgres

# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes (reset completo)
docker-compose down -v

# Reconstruir la imagen
docker-compose up --build

# Ejecutar Prisma Studio (visualizar DB)
npx prisma studio

# Generar nueva migración
npx prisma migrate dev --name nombre_migracion

# Ejecutar seed manualmente
npx prisma db seed
```

---

## 📝 Licencia

Este proyecto es parte de una evaluación académica para el curso de Sistemas Distribuidos.

---

<p align="center">
  Desarrollado con ❤️ para AndesFin
</p>
