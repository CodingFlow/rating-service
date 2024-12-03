import { IsString, LengthGreater } from "@danet/core/validation";
import type { ObjectId } from "@db/mongo";

export class User {
    readonly id:
        | `${string}-${string}-${string}-${string}-${string}`
        | ObjectId;

    @IsString()
    public name: string;

    constructor(
        name: string,
        id:
            | `${string}-${string}-${string}-${string}-${string}`
            | ObjectId,
    ) {
        this.name = name;
        this.id = id;
    }
}
