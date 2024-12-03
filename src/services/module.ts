import { ServicesController } from "./controller.ts";
import { serviceService } from "./service.ts";
import { Module, TokenInjector } from "@danet/core";
import { SERVICE_REPOSITORY } from "./constant.ts";
import { PostgresRepository } from "./postgres-repository.ts";
import { DatabaseModule } from "../database/module.ts";

@Module({
    controllers: [ServicesController],
    injectables: [
        new TokenInjector(PostgresRepository, SERVICE_REPOSITORY),
        serviceService,
    ], // change InMemoryTodoRepository by any custom repository using other database engine if needed
    imports: [DatabaseModule],
})
export class ServiceModule {}
