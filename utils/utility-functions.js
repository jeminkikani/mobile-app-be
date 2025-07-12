module.exports = {
  // constant
  USER_CONSTANT: require("./constant/User.consts"),

  responseGenerator(statusCode, message, data = [ ], isError = false) {
    return {
      statusCode,
      success: !isError,
      message,
      data: data ? data : [ ],
      error: isError ? true : false,
    };
  },
};
