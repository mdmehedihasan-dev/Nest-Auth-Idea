import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";
import { Strategy } from "passport-jwt";
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    constructor(userRepository: Repository<User>);
    validate(payload: any): Promise<{
        userId: number;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
    }>;
}
export {};
