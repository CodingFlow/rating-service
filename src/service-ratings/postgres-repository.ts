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
        >`SELECT id, rating, comment, service_id, user_id FROM public.service_rating`;
        return rows;
    }

    async getById(id: string) {
        const { rows } = await this.dbService.client.queryObject<ServiceRating>(
            `SELECT id, rating, comment, service_id, user_id FROM public.service_rating WHERE id = '${id}'`,
        );

        return rows[0];
    }

    async create(serviceRating: ServiceRating) {
        const { rows } = await this.dbService.client.queryObject<ServiceRating>(
            `INSERT INTO public.service_rating (id, rating, comment, service_id, user_id) VALUES ('${serviceRating.id}', '${serviceRating.comment}', '${serviceRating.serviceId}', '${serviceRating.userId}') RETURNING id, rating, comment, service_id, user_id;`,
        );
        return rows[0];
    }

    async updateOne(serviceRating: ServiceRating) {
        const { rows } = await this.dbService.client.queryObject<ServiceRating>(
            `UPDATE public.service_rating SET rating = '${serviceRating.rating}', comment = '${serviceRating.comment}' WHERE id = '${serviceRating.id}' RETURNING id, rating, comment;`,
        );
        return rows[0];
    }

    async deleteOne(id: string) {
        return this.dbService.client.queryObject<ServiceRating>(
            `DELETE FROM public.service_rating WHERE id = '${id}';`,
        );
    }

    async deleteAll() {
        return this.dbService.client.queryObject<ServiceRating>(
            `DELETE FROM public.service_rating`,
        );
    }
}
