import { Injectable, SCOPE } from "@danet/core";
import { OnAppBootstrap, OnAppClose } from "@danet/core/hook";
import { Client } from "@bartlomieju/postgres";

@Injectable()
export class PostgresService implements OnAppBootstrap, OnAppClose {
    constructor() {}

    public client: Client = new Client({
        user: Deno.env.get("DB_USERNAME"),
        password: Deno.env.get("DB_PASSWORD"),
        database: Deno.env.get("DB_NAME"),
        hostname: Deno.env.get("DB_HOST"),
    });

    async onAppBootstrap() {
        await this.client.connect();
    }

    async onAppClose() {
        await this.client.end();
    }
}
