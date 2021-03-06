import { ResponseToolkit, Request } from '@hapi/hapi';
import { CreateUserUseCase } from './CreateUserUseCase';

export interface LoginRequestType extends Request {
    payload: {
        name: string;
        email: string;
        password: string;
    }
}

export class CreateUserController {
    constructor(
        private createUserUseCase: CreateUserUseCase
    ){}
    
    async handle(request: LoginRequestType, h: ResponseToolkit){
        const { name, email, password } = request.payload;

        try {
            await this.createUserUseCase.execute({
                name,
                email,
                password
            })

            return h.response().code(201);
        } catch (error) {
            return h.response({ message: error.message || 'Unexpected error'}).code(400);
        }
    }
}