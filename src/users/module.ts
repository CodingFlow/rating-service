import { UserController } from "./controller.ts";
import { UserService } from "./service.ts";
import { Module, TokenInjector } from "@danet/core";
import { USER_REPOSITORY } from "./constant.ts";
import { PostgresRepository } from "./postgres-repository.ts";
import { DatabaseModule } from "../database/module.ts";

@Module({
    controllers: [UserController],
    injectables: [
        new TokenInjector(PostgresRepository, USER_REPOSITORY),
        UserService,
    ], // change InMemoryTodoRepository by any custom repository using other database engine if needed
    imports: [DatabaseModule],
})
export class TodoModule {}
