const { validationResult } = require('express-validator');

const checkErrors = (req, cb) => {
  const validateBody = validationResult.withDefaults({
    formatter: (err) => {
      return {
        err: true,
        message: err.msg,
      };
    },
  });
  const errors = validateBody(req);
  if (!errors.isEmpty()) {
    const { err, message } = errors.array({ onlyFirstError: true })[0];
    return cb(err, message);
  }
  return cb(false);
};

const UNIQUE_ERROR_CODE = 23505;

module.exports = {
  checkErrors,
  UNIQUE_ERROR_CODE,
};
