declare class ApiError extends Error {
    statusCode: number;
    errors?: unknown;
    constructor(statusCode: number, message?: string, errors?: unknown, stack?: string);
}
export default ApiError;
//# sourceMappingURL=ApiError.d.ts.map