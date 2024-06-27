const CODES = {
  SUCCESS: {
    OK: 200, //The request has succeeded.
    CREATED: 201, // The request has been fulfilled, resulting in the creation of a new resource.
    NO_CONTENT: 204, //The server successfully processed the request but is not returning any content.
  },

  CLIENT_ERROR: {
    BAD_REQUEST: 400, //The server cannot process the request due to a client error.
    UNAUTHORIZED: 401, //The request requires user authentication.
    FORBIDDEN: 403, //The client does not have permission to access the requested resource.
    NOT_FOUND: 404, //The requested resource could not be found on the server.
    CONFLICT_ERROR: 409, //request could not be completed due to a conflict with the current state of the target resource
  },

  SERVER_ERROR: {
    INTERNAL_SERVER_ERROR: 500, // A generic error message indicating that something has gone wrong on the server.
  },
};

export { CODES };
