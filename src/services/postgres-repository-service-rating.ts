import { Repository } from "../database/repository.ts";
import { Inject } from "@danet/core";
import { DATABASE } from "../database/module.ts";
import { PostgresService } from "../database/postgres.service.ts";
import { ServiceRating } from "./class-service-rating.ts";
import { AssociativeRepository } from "../database/associative-repository.ts";

export class PostgresRepositoryServiceRating
    implements Repository<ServiceRating>, AssociativeRepository<ServiceRating> {
    constructor(@Inject(DATABASE) private dbService: PostgresService) {
    }

    async getAllForId(serviceId: string): Promise<ServiceRating[]> {
        const { rows } = await this.dbService.client.queryObject<
            ServiceRating
        >(
            `SELECT service_rating.id, service_rating.rating, service_rating.comment, public.user.id AS userId, public.user.name FROM service_rating INNER JOIN public.user ON service_rating.user_id = public.user.id WHERE service_rating.service_id = '${serviceId}'`,
        );

        return rows;
    }

    async getAll(): Promise<ServiceRating[]> {
        const { rows } = await this.dbService.client.queryObject<
            ServiceRating
        >`SELECT id, rating, comment FROM public.service_rating`;

        return rows;
    }

    async getById(id: string) {
        const { rows } = await this.dbService.client.queryObject<ServiceRating>(
            `SELECT id, rating, comment FROM public.service_rating WHERE id = '${id}'`,
        );

        return rows[0];
    }

    async create(serviceRating: ServiceRating) {
        const { rows } = await this.dbService.client.queryObject<ServiceRating>(
            `INSERT INTO public.service_rating (id, rating, comment, service_id, user_id) VALUES ('${serviceRating.id}', '${serviceRating.rating}', '${serviceRating.comment}'), '${serviceRating.serviceId}', '${serviceRating.userId}') RETURNING id, rating, comment, service_id, user_id;`,
        );

        return rows[0];
    }

    async updateOne(serviceRating: ServiceRating) {
        const { rows } = await this.dbService.client.queryObject<ServiceRating>(
            `UPDATE public.service_rating SET rating = '${serviceRating.rating}', comment = '${serviceRating.comment}' WHERE id = '${serviceRating.id}' RETURNING id, rating, comment, service_id, user_id;`,
        );
        return rows[0];
    }

    async deleteOne(serviceRatingId: string) {
        return this.dbService.client.queryObject<ServiceRating>(
            `DELETE FROM public.service_rating WHERE id = '${serviceRatingId}';`,
        );
    }

    async deleteAll() {
        return this.dbService.client.queryObject<ServiceRating>(
            `DELETE FROM public.service_rating`,
        );
    }
}
