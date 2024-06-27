const MESSAGES = {
  ERROR_MSG: {
    NOT_FOUND: (entity: string) => `${entity} not found!!`,
    ALREADY_EXIST: (entity: string) => `${entity} already exist!!`,
    FAILED_TO_UPDATE: (entity: string) => `Failed to update ${entity}!!`,
    INVALID_PASSWORD: "Password Invalid!!",
    EMAIL_NOT_ASSOCIATED: "Provided email is not registered with this user!!",
    NAME_TAKEN: (entity: string) =>
      `${entity} is not available. Try different name.`,
    NO_CONTENT: (entity: string) => `There is not any ${entity}`,
    INTERNAL_SERVER_ERROR: "Server Error!!",
    PASSWORD_NOT_SAME: "New password and confirm new password do not match.",
    UNAUTHORIZED: "Login Required!!",
    TOKEN_REQUIRED: "Unauthorized Request!!",
    INVALID_TOKEN: "Token verification failed!!",
    NO_CURRENT_USER: "No user logged in!!",
    INVALID_REFERSH_TOKEN: "Invalid Refresh Token!!",
    REFRESH_TOKEN_EXPIRED: "Refresh token is expired or used!!",
    NO_PRODUCT: "No product found matching your criteria!!",
    GEN_TOKEN: "Error generating token!!",
    NO_ACCESS: "Anauthorized Action!!",
  },

  SUCCESS_MSG: {
    DELETE: (entity: string) => `${entity} deleted successfully!!`,
    LOGIN: "Login Successful!!",
    REGISTER: "User Registered!!",
    PASSWORD_CHANGED: "Password changed successfully!!",
    UPDATE: (entity: string) => `${entity} updtaed successfully!!`,
    LOG_OUT: "User logged out successfully!!",
    NEW_TOKEN: "New tokens generated!!",
    CREATE: (entity: string) => `${entity} added successfully!!`,
  },
};
export { MESSAGES };
