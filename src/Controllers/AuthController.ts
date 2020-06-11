import { Request, Response, Router } from "express";
import { ModelBase } from "../Core/models/ModelBase";
import { UserEntity } from "../Entities/UserEntity";

let bcrypt = require('bcrypt');
var jwToken = require("../policies/jwToken");


export class AuthController {
    userModel: ModelBase


    constructor() {
        this.userModel = new ModelBase(new UserEntity());
    }

    async login(data: { username: any, password: any }) {
        let username = data.username;
        let password = data.password;
        try {
            if (!username || !password) {
                throw new Error('username and password required');
            }
            let user: any = await this.userModel.findOne({
                equalTo: { username: username }
            });
            console.log("user: ",user);
            if (!user) {
                throw new Error('wrong username or password');
            }
            let valid = await bcrypt.compare(password, user.password);

            if (!valid) {
                throw new Error('"The username/password is incorrect');
            }

            let responseObject = {
                token: jwToken.issue({ id: user.id, expiresIn: "24h" }),
                message: 'logged in successfully',
                username: username
            };
            return responseObject;

        } catch (error) {
            throw new Error(error);
        }

    }
}