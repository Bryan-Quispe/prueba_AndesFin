/**
 * Interfaz base para repositorios
 * Principio de Inversión de Dependencias (DIP) de SOLID
 * Define el contrato que deben cumplir todos los repositorios
 */
export interface IBaseRepository<T, CreateDto, UpdateDto> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: CreateDto): Promise<T>;
  update(id: string, data: UpdateDto): Promise<T>;
  delete(id: string): Promise<T>;
}
