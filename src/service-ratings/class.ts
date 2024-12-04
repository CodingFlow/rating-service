import { IsString } from "@danet/core/validation";
import type { ObjectId } from "@db/mongo";

export class ServiceRating {
    readonly id:
        | `${string}-${string}-${string}-${string}-${string}`
        | ObjectId;

    public rating: number;

    @IsString()
    public comment: string;

    public serviceId:
        | `${string}-${string}-${string}-${string}-${string}`
        | ObjectId;

    public userId:
        | `${string}-${string}-${string}-${string}-${string}`
        | ObjectId;

    public userName: string;

    constructor(
        rating: number,
        comment: string,
        id:
            | `${string}-${string}-${string}-${string}-${string}`
            | ObjectId,
        serviceId:
            | `${string}-${string}-${string}-${string}-${string}`
            | ObjectId,
        userId:
            | `${string}-${string}-${string}-${string}-${string}`
            | ObjectId,
        userName: string,
    ) {
        this.rating = rating;
        this.comment = comment;
        this.id = id;
        this.serviceId = serviceId;
        this.userId = userId;
        this.userName = userName;
    }
}
