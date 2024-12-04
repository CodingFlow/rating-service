export interface AssociativeRepository<T extends unknown> {
    getAllForId(id: string): Promise<T[]>;
}
