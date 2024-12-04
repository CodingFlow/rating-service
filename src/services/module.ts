import { ServicesController } from "./controller.ts";
import { serviceService } from "./service.ts";
import { Module, TokenInjector } from "@danet/core";
import { SERVICE_RATING_REPOSITORY, SERVICE_REPOSITORY } from "./constant.ts";
import { PostgresRepository } from "./postgres-repository.ts";
import { DatabaseModule } from "../database/module.ts";
import { PostgresRepositoryServiceRating } from "./postgres-repository-service-rating.ts";

@Module({
    controllers: [ServicesController],
    injectables: [
        new TokenInjector(PostgresRepository, SERVICE_REPOSITORY),
        new TokenInjector(
            PostgresRepositoryServiceRating,
            SERVICE_RATING_REPOSITORY,
        ),
        serviceService,
    ], // change InMemoryTodoRepository by any custom repository using other database engine if needed
    imports: [DatabaseModule],
})
export class ServiceModule {}
