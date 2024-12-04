import { Body, Controller, Delete, Get, Param, Post, Put } from "@danet/core";
import { ServiceRating } from "./class.ts";
import { ServiceRatingService } from "./service.ts";
import { ReturnedType } from "@danet/swagger/decorators";

@Controller("service-ratings")
export class ServiceRatingsController {
    constructor(public serviceRatingService: ServiceRatingService) {
    }

    @ReturnedType(ServiceRating, true)
    @Get()
    async getAllServiceRatings() {
        return this.serviceRatingService.getAll();
    }

    @ReturnedType(ServiceRating)
    @Get(":id")
    async getServiceRatingById(@Param("id") serviceRatingId: string) {
        return this.serviceRatingService.getById(serviceRatingId);
    }

    @Post()
    async createServiceRating(@Body() serviceRating: ServiceRating) {
        return this.serviceRatingService.create(serviceRating);
    }

    @Put(":id")
    async updateService(
        @Param("id") serviceRatingId:
            `${string}-${string}-${string}-${string}-${string}`,
        @Body() serviceRating: Omit<ServiceRating, "id">,
    ) {
        return this.serviceRatingService.update(serviceRatingId, serviceRating);
    }

    @Delete(":id")
    async deleteOne(@Param("id") serviceRatingId: string) {
        return this.serviceRatingService.deleteOneById(serviceRatingId);
    }
}
