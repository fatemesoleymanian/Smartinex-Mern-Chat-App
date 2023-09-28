import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "./custom-error";


class UnauthorizedError extends CustomAPIError {
    statusCode: StatusCodes

    constructor(message: string) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED

    }

}

module.exports = UnauthorizedError;