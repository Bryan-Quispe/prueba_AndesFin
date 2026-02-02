import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('🌱 Starting database seed...');

  // ===== Crear Usuarios =====
  console.log('👥 Creating users...');
  
  const usuarios = await Promise.all([
    prisma.usuario.upsert({
      where: { email: 'juan.perez@email.com' },
      update: {},
      create: {
        id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        nombre: 'Juan Pérez',
        email: 'juan.perez@email.com',
        capital_disponible: 5000.00,
      },
    }),
    prisma.usuario.upsert({
      where: { email: 'maria.garcia@email.com' },
      update: {},
      create: {
        id: 'b2c3d4e5-f6a7-8901-bcde-f23456789012',
        nombre: 'María García',
        email: 'maria.garcia@email.com',
        capital_disponible: 8000.00,
      },
    }),
    prisma.usuario.upsert({
      where: { email: 'carlos.rodriguez@email.com' },
      update: {},
      create: {
        id: 'c3d4e5f6-a7b8-9012-cdef-345678901234',
        nombre: 'Carlos Rodríguez',
        email: 'carlos.rodriguez@email.com',
        capital_disponible: 3000.00,
      },
    }),
    prisma.usuario.upsert({
      where: { email: 'ana.martinez@email.com' },
      update: {},
      create: {
        id: 'd4e5f6a7-b8c9-0123-defa-456789012345',
        nombre: 'Ana Martínez',
        email: 'ana.martinez@email.com',
        capital_disponible: 10000.00,
      },
    }),
    prisma.usuario.upsert({
      where: { email: 'luis.sanchez@email.com' },
      update: {},
      create: {
        id: 'e5f6a7b8-c9d0-1234-efab-567890123456',
        nombre: 'Luis Sánchez',
        email: 'luis.sanchez@email.com',
        capital_disponible: 2000.00,
      },
    }),
  ]);

  console.log(`✅ Created ${usuarios.length} users`);

  // ===== Crear Productos Financieros =====
  console.log('💰 Creating financial products...');

  const productos = await Promise.all([
    prisma.productoFinanciero.upsert({
      where: { id: 'f6a7b8c9-d0e1-2345-fabc-678901234567' },
      update: {},
      create: {
        id: 'f6a7b8c9-d0e1-2345-fabc-678901234567',
        nombre: 'Fondo Acciones Tech',
        descripcion: 'Fondo de inversión en acciones tecnológicas de alto crecimiento. Incluye empresas como Apple, Google, Microsoft y Amazon.',
        costo: 1000.00,
        porcentaje_retorno: 8.50,
        activo: true,
      },
    }),
    prisma.productoFinanciero.upsert({
      where: { id: 'a7b8c9d0-e1f2-3456-abcd-789012345678' },
      update: {},
      create: {
        id: 'a7b8c9d0-e1f2-3456-abcd-789012345678',
        nombre: 'Bonos Corporativos AAA',
        descripcion: 'Bonos corporativos de alta calificación crediticia. Inversión segura con retorno moderado.',
        costo: 500.00,
        porcentaje_retorno: 5.25,
        activo: true,
      },
    }),
    prisma.productoFinanciero.upsert({
      where: { id: 'b8c9d0e1-f2a3-4567-bcde-890123456789' },
      update: {},
      create: {
        id: 'b8c9d0e1-f2a3-4567-bcde-890123456789',
        nombre: 'ETF Global',
        descripcion: 'Fondo cotizado que replica el índice MSCI World. Diversificación global con bajo costo de gestión.',
        costo: 1500.00,
        porcentaje_retorno: 12.00,
        activo: true,
      },
    }),
    prisma.productoFinanciero.upsert({
      where: { id: 'c9d0e1f2-a3b4-5678-cdef-901234567890' },
      update: {},
      create: {
        id: 'c9d0e1f2-a3b4-5678-cdef-901234567890',
        nombre: 'Fondo de Dividendos',
        descripcion: 'Fondo enfocado en empresas que pagan dividendos consistentes. Ideal para ingresos pasivos.',
        costo: 800.00,
        porcentaje_retorno: 6.75,
        activo: true,
      },
    }),
    prisma.productoFinanciero.upsert({
      where: { id: 'd0e1f2a3-b4c5-6789-defa-012345678901' },
      update: {},
      create: {
        id: 'd0e1f2a3-b4c5-6789-defa-012345678901',
        nombre: 'Bonos del Tesoro',
        descripcion: 'Bonos gubernamentales con respaldo del estado. Máxima seguridad con retorno garantizado.',
        costo: 1200.00,
        porcentaje_retorno: 4.50,
        activo: true,
      },
    }),
    prisma.productoFinanciero.upsert({
      where: { id: 'e1f2a3b4-c5d6-7890-efab-123456789012' },
      update: {},
      create: {
        id: 'e1f2a3b4-c5d6-7890-efab-123456789012',
        nombre: 'Crowdfunding Inmobiliario',
        descripcion: 'Inversión fraccionada en proyectos inmobiliarios. Participación en el mercado inmobiliario con bajo capital.',
        costo: 250.00,
        porcentaje_retorno: 9.00,
        activo: true,
      },
    }),
    prisma.productoFinanciero.upsert({
      where: { id: 'f2a3b4c5-d6e7-8901-fabc-234567890123' },
      update: {},
      create: {
        id: 'f2a3b4c5-d6e7-8901-fabc-234567890123',
        nombre: 'Fondo Premium',
        descripcion: 'Fondo exclusivo de alto rendimiento para inversores calificados. Estrategias de inversión sofisticadas.',
        costo: 3000.00,
        porcentaje_retorno: 15.00,
        activo: true,
      },
    }),
    prisma.productoFinanciero.upsert({
      where: { id: 'a3b4c5d6-e7f8-9012-abcd-345678901234' },
      update: {},
      create: {
        id: 'a3b4c5d6-e7f8-9012-abcd-345678901234',
        nombre: 'Fondo Conservador',
        descripcion: 'Fondo de bajo riesgo ideal para perfiles conservadores. Preservación de capital con crecimiento moderado.',
        costo: 600.00,
        porcentaje_retorno: 3.25,
        activo: true,
      },
    }),
  ]);

  console.log(`✅ Created ${productos.length} financial products`);

  console.log('');
  console.log('✅ Database seed completed successfully!');
  console.log('');
  console.log('📊 Summary:');
  console.log(`   - Users: ${usuarios.length}`);
  console.log(`   - Products: ${productos.length}`);
  console.log('');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });