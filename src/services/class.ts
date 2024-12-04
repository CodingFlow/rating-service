import { IsString } from "@danet/core/validation";
import type { ObjectId } from "@db/mongo";
import { ServiceRating } from "./class-service-rating.ts";

export class Service {
    readonly id:
        | `${string}-${string}-${string}-${string}-${string}`
        | ObjectId;

    @IsString()
    public name: string;

    @IsString()
    public description: string;

    public ratings: ServiceRating[] = [];

    constructor(
        name: string,
        description: string,
        id:
            | `${string}-${string}-${string}-${string}-${string}`
            | ObjectId,
    ) {
        this.name = name;
        this.description = description;
        this.id = id;
    }
}
