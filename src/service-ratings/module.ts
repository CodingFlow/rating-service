import { ServiceRatingsController } from "./controller.ts";
import { ServiceRatingService } from "./service.ts";
import { Module } from "@danet/core";
import { SERVICE_RATING_REPOSITORY } from "./constant.ts";
import { PostgresRepository } from "./postgres-repository.ts";
import { DatabaseModule } from "../database/module.ts";

@Module({
    controllers: [ServiceRatingsController],
    injectables: [
        {
            token: SERVICE_RATING_REPOSITORY,
            useClass: PostgresRepository,
        },
        ServiceRatingService,
    ], // change InMemoryTodoRepository by any custom repository using other database engine if needed
    imports: [DatabaseModule],
})
export class ServiceRatingModule {}
