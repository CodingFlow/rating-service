import { Module } from "@danet/core";
import { UserModule } from "./users/module.ts";
import { AppController } from "./app.controller.ts";
import { ServiceModule } from "./services/module.ts";

@Module({
    controllers: [AppController],
    imports: [UserModule, ServiceModule],
})
export class AppModule {}
