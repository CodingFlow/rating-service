import { Repository } from "../database/repository.ts";
import { Service } from "./class.ts";
import { Inject } from "@danet/core";
import { DATABASE } from "../database/module.ts";
import { PostgresService } from "../database/postgres.service.ts";

export class PostgresRepository implements Repository<Service> {
    constructor(@Inject(DATABASE) private dbService: PostgresService) {
    }
    async getAll(): Promise<Service[]> {
        const { rows } = await this.dbService.client.queryObject<
            Service
        >`SELECT id, name, description FROM public.service`;
        return rows;
    }

    async getById(id: string) {
        const { rows } = await this.dbService.client.queryObject<Service>(
            `SELECT id, name, description FROM public.service WHERE id = '${id}'`,
        );
        return rows[0];
    }

    async create(service: Service) {
        const { rows } = await this.dbService.client.queryObject<Service>(
            `INSERT INTO public.service (id, name, description) VALUES ('${service.id}', '${service.name}', '${service.description}') RETURNING id, name, description;`,
        );
        return rows[0];
    }

    async updateOne(service: Service) {
        const { rows } = await this.dbService.client.queryObject<Service>(
            `UPDATE public.service SET name = '${service.name}', description = '${service.description}' WHERE id = '${service.id}' RETURNING id, name, description;`,
        );
        return rows[0];
    }

    async deleteOne(serviceId: string) {
        return this.dbService.client.queryObject<Service>(
            `DELETE FROM public.service WHERE id = '${serviceId}';`,
        );
    }

    async deleteAll() {
        return this.dbService.client.queryObject<Service>(
            `DELETE FROM public.service`,
        );
    }
}
