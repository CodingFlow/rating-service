import { Inject, Injectable } from "@danet/core";
import { ServiceRating } from "./class.ts";
import type { Repository } from "../database/repository.ts";
import { SERVICE_RATING_REPOSITORY } from "./constant.ts";

@Injectable()
export class ServiceRatingService {
    constructor(
        @Inject(SERVICE_RATING_REPOSITORY) private repository: Repository<
            ServiceRating
        >,
    ) {
    }

    getAll() {
        return this.repository.getAll();
    }

    async getById(id: string) {
        return this.repository.getById(id);
    }

    async create(serviceRatingWithoutId: Omit<ServiceRating, "id">) {
        const id = crypto.randomUUID();
        const service = new ServiceRating(
            serviceRatingWithoutId.rating,
            serviceRatingWithoutId.comment,
            id,
            serviceRatingWithoutId.serviceId,
            serviceRatingWithoutId.userId,
            serviceRatingWithoutId.userName,
        );
        return this.repository.create(service);
    }

    update(
        id: `${string}-${string}-${string}-${string}-${string}`,
        serviceRatingWithoutId: Omit<ServiceRating, "id">,
    ) {
        const service = new ServiceRating(
            serviceRatingWithoutId.rating,
            serviceRatingWithoutId.comment,
            id,
            serviceRatingWithoutId.serviceId,
            serviceRatingWithoutId.userId,
            serviceRatingWithoutId.userName,
        );
        return this.repository.updateOne(service);
    }

    async deleteOneById(serviceId: string) {
        await this.repository.deleteOne(serviceId);
    }

    deleteAll() {
        return this.repository.deleteAll();
    }
}
