import { Repository } from "../database/repository.ts";
import { User } from "./class.ts";
import { Inject } from "@danet/core";
import { DATABASE } from "../database/module.ts";
import { PostgresService } from "../database/postgres.service.ts";

export class PostgresRepository implements Repository<User> {
    constructor(@Inject(DATABASE) private dbService: PostgresService) {
    }
    async getAll(): Promise<User[]> {
        const { rows } = await this.dbService.client.queryObject<
            User
        >`SELECT id, name FROM public.user`;
        return rows;
    }

    async getById(id: string) {
        const { rows } = await this.dbService.client.queryObject<User>(
            `SELECT id, name FROM public.user WHERE id = '${id}'`,
        );
        return rows[0];
    }

    async create(user: User) {
        const { rows } = await this.dbService.client.queryObject<User>(
            `INSERT INTO public.user (id, name) VALUES ('${user.id}', '${user.name}') RETURNING id, name;`,
        );
        return rows[0];
    }

    async updateOne(user: User) {
        const { rows } = await this.dbService.client.queryObject<User>(
            `UPDATE public.user SET name = '${user.name}' WHERE id = '${user.id}' RETURNING id, name;`,
        );
        return rows[0];
    }

    async deleteOne(userId: string) {
        return this.dbService.client.queryObject<User>(
            `DELETE FROM public.user WHERE id = '${userId}';`,
        );
    }

    async deleteAll() {
        return this.dbService.client.queryObject<User>(
            `DELETE FROM public.user`,
        );
    }
}
