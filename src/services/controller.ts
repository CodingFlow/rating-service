import { Body, Controller, Delete, Get, Param, Post, Put } from "@danet/core";
import { Service } from "./class.ts";
import { ServiceService } from "./service.ts";
import { ReturnedType } from "@danet/swagger/decorators";

@Controller("services")
export class ServicesController {
    constructor(public serviceService: ServiceService) {
    }

    @ReturnedType(Service, true)
    @Get()
    async getAllServices() {
        return this.serviceService.getAll();
    }

    @ReturnedType(Service)
    @Get(":id")
    async getServiceById(@Param("id") serviceId: string) {
        return this.serviceService.getById(serviceId);
    }

    @Post()
    async createService(@Body() service: Service) {
        return this.serviceService.create(service);
    }

    @Put(":id")
    async updateService(
        @Param("id") serviceId:
            `${string}-${string}-${string}-${string}-${string}`,
        @Body() service: Omit<Service, "id">,
    ) {
        return this.serviceService.update(serviceId, service);
    }

    @Delete(":id")
    async deleteOne(@Param("id") serviceId: string) {
        return this.serviceService.deleteOneById(serviceId);
    }
}
