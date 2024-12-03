import { Inject, Injectable } from "@danet/core";
import { Service } from "./class.ts";
import type { Repository } from "../database/repository.ts";
import { SERVICE_REPOSITORY } from "./constant.ts";
import { ObjectId } from "@db/mongo";

@Injectable()
export class serviceService {
    constructor(
        @Inject(SERVICE_REPOSITORY) private repository: Repository<Service>,
    ) {
    }

    getAll() {
        return this.repository.getAll();
    }

    getById(id: string) {
        return this.repository.getById(id);
    }

    async create(serviceWithoutId: Omit<Service, "_id">) {
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
