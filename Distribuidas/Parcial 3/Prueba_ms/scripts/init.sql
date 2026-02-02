-- ============================================
-- Script de inicialización de base de datos
-- AndesFin - Plataforma de Microinversiones
-- ============================================

-- Habilitar extensión UUID si no está habilitada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Nota: Las tablas se crean automáticamente con Prisma migrate
-- Este script es para referencia y datos adicionales si es necesario

-- Log de inicialización
DO $$
BEGIN
    RAISE NOTICE 'AndesFin Database initialized successfully!';
    RAISE NOTICE 'Timestamp: %', NOW();
END $$;
