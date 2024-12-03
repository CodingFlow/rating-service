import { Body, Controller, Delete, Get, Param, Post, Put } from "@danet/core";
import { User } from "./class.ts";
import { UserService } from "./service.ts";
import { ReturnedType } from "@danet/swagger/decorators";

@Controller("users")
export class UserController {
    constructor(public userService: UserService) {
    }

    @ReturnedType(User, true)
    @Get()
    async getAllTodo() {
        return this.userService.getAll();
    }

    @ReturnedType(User)
    @Get(":id")
    async getUserById(@Param("id") userId: string) {
        return this.userService.getById(userId);
    }

    @Post()
    async createUser(@Body() user: User) {
        return this.userService.create(user);
    }

    @Put(":id")
    async updateUser(
        @Param("id") userId:
            `${string}-${string}-${string}-${string}-${string}`,
        @Body() user: Omit<User, "id">,
    ) {
        return this.userService.update(userId, user);
    }

    @Delete(":id")
    async deleteOne(@Param("id") todoId: string) {
        return this.userService.deleteOneById(todoId);
    }
}
