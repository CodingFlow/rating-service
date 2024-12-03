import { IsString, LengthGreater } from "@danet/core/validation";
import type { ObjectId } from "@db/mongo";

export class Service {
    readonly id:
        | `${string}-${string}-${string}-${string}-${string}`
        | ObjectId;

    @IsString()
    public name: string;

    @IsString()
    public description: string;

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
