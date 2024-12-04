import { Repository } from "../database/repository.ts";
import { ServiceRating } from "./class.ts";
import { Inject } from "@danet/core";
import { DATABASE } from "../database/module.ts";
import { PostgresService } from "../database/postgres.service.ts";

export class PostgresRepository implements Repository<ServiceRating> {
    constructor(@Inject(DATABASE) private dbService: PostgresService) {
    }
    async getAll(): Promise<ServiceRating[]> {
        const { rows } = await this.dbService.client.queryObject<
            ServiceRating
        >`SELECT id, name, description FROM public.service`;
        return rows;
    }

    async getById(id: string) {
        const { rows } = await this.dbService.client.queryObject<ServiceRating>(
            `SELECT id, name, description FROM public.service WHERE id = '${id}'`,
        );

        return rows[0];
    }

    async create(service: ServiceRating) {
        const { rows } = await this.dbService.client.queryObject<ServiceRating>(
            `INSERT INTO public.service (id, name, description) VALUES ('${service.id}', '${service.name}', '${service.description}') RETURNING id, name, description;`,
        );
        return rows[0];
    }

    async updateOne(service: ServiceRating) {
        const { rows } = await this.dbService.client.queryObject<ServiceRating>(
            `UPDATE public.service SET name = '${service.name}', description = '${service.description}' WHERE id = '${service.id}' RETURNING id, name, description;`,
        );
        return rows[0];
    }

    async deleteOne(serviceId: string) {
        return this.dbService.client.queryObject<ServiceRating>(
            `DELETE FROM public.service WHERE id = '${serviceId}';`,
        );
    }

    async deleteAll() {
        return this.dbService.client.queryObject<ServiceRating>(
            `DELETE FROM public.service`,
        );
    }
}
