const BadRequestError = require('./bad-request');
const CustomAPIError = require('./custom-error');
const NotFoundError = require('./notFound');
const UnauthorizedError = require('./unauthorized')


module.exports = {
    BadRequestError,
    CustomAPIError,
    NotFoundError,
    UnauthorizedError
}