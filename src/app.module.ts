import { Module } from "@danet/core";
import { TodoModule } from "./users/module.ts";
import { AppController } from "./app.controller.ts";

@Module({
    controllers: [AppController],
    imports: [TodoModule],
})
export class AppModule {}
