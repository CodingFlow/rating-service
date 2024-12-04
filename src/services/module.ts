import { ServicesController } from "./controller.ts";
import { ServiceService } from "./service.ts";
import { Module, TokenInjector } from "@danet/core";
import {
    ASSOCIATIVE_SERVICE_RATING_REPOSITORY,
    SERVICE_REPOSITORY,
} from "./constant.ts";
import { PostgresRepository } from "./postgres-repository.ts";
import { DatabaseModule } from "../database/module.ts";
import { PostgresRepositoryServiceRating } from "./postgres-repository-service-rating.ts";

@Module({
    controllers: [ServicesController],
    injectables: [
        {
            token: SERVICE_REPOSITORY,
            useClass: PostgresRepository,
        },
        {
            token: ASSOCIATIVE_SERVICE_RATING_REPOSITORY,
            useClass: PostgresRepositoryServiceRating,
        },
        ServiceService,
    ], // change InMemoryTodoRepository by any custom repository using other database engine if needed
    imports: [DatabaseModule],
})
export class ServiceModule {}
