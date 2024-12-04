import { Inject, Injectable } from "@danet/core";
import { Service } from "./class.ts";
import type { Repository } from "../database/repository.ts";
import type { AssociativeRepository } from "../database/associative-repository.ts";
import {
    ASSOCIATIVE_SERVICE_RATING_REPOSITORY,
    SERVICE_REPOSITORY,
} from "./constant.ts";
import { ServiceRating } from "./class-service-rating.ts";

@Injectable()
export class ServiceService {
    constructor(
        @Inject(SERVICE_REPOSITORY) private repository: Repository<
            Service
        >,
        @Inject(
            ASSOCIATIVE_SERVICE_RATING_REPOSITORY,
        ) private serviceRatingRepository: AssociativeRepository<
            ServiceRating
        >,
    ) {
    }

    getAll() {
        return this.repository.getAll();
    }

    async getById(id: string) {
        const servicePromise = this.repository.getById(id);
        const serviceRatingsPromise = this.serviceRatingRepository.getAllForId(
            id,
        );

        const service = await servicePromise;
        const serviceRatings = await serviceRatingsPromise;

        service!.ratings = serviceRatings;

        return service;
    }

    async create(serviceWithoutId: Omit<Service, "id">) {
        const id = crypto.randomUUID();
        const service = new Service(
            serviceWithoutId.name,
            serviceWithoutId.description,
            id,
        );
        return this.repository.create(service);
    }

    update(
        serviceId: `${string}-${string}-${string}-${string}-${string}`,
        serviceWithoutId: Omit<Service, "id">,
    ) {
        const service = new Service(
            serviceWithoutId.name,
            serviceWithoutId.description,
            serviceId,
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
