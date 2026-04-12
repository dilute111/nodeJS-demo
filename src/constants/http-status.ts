
// TODO: Заменить сервер статусы в компонентах на енамки
enum HttpStatus {
    // 2xx success
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,

    // 4xx Client Errors
    BAD_REQUEST = 400,
    NOT_FOUND = 404,

    // 5xx Server Errors
    INTERNAL_SERVER_ERROR = 500,
}

export default HttpStatus