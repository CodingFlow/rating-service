import { Inject, Injectable } from "@danet/core";
import { User } from "./class.ts";
import type { Repository } from "../database/repository.ts";
import { USER_REPOSITORY } from "./constant.ts";
import { ObjectId } from "@db/mongo";

@Injectable()
export class UserService {
    constructor(@Inject(USER_REPOSITORY) private repository: Repository<User>) {
    }

    getAll() {
        return this.repository.getAll();
    }

    getById(id: string) {
        return this.repository.getById(id);
    }

    async create(userWithoutId: Omit<User, "_id">) {
        const id = crypto.randomUUID();
        const user = new User(userWithoutId.name, id);
        return this.repository.create(user);
    }

    update(
        userId: `${string}-${string}-${string}-${string}-${string}`,
        userWithoutId: Omit<User, "id">,
    ) {
        const user = new User(userWithoutId.name, userId);
        return this.repository.updateOne(user);
    }

    async deleteOneById(todoId: string) {
        await this.repository.deleteOne(todoId);
    }

    deleteAll() {
        return this.repository.deleteAll();
    }
}
