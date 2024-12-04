import { Module } from "@danet/core";
import { UserModule } from "./users/module.ts";
import { AppController } from "./app.controller.ts";
import { ServiceModule } from "./services/module.ts";
import { ServiceRatingModule } from "./service-ratings/module.ts";

@Module({
    controllers: [AppController],
    imports: [UserModule, ServiceModule, ServiceRatingModule],
})
export class AppModule {}
