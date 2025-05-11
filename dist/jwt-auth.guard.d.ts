declare const jwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class jwtAuthGuard extends jwtAuthGuard_base {
    handleRequest(err: any, user: any, info: any): any;
}
export {};
