const Joi = require("joi");
const common = require("../../../lib/util");
const commonResponseType = require("../../../static/static.json");
const logger = require("../../../lib/logger");

exports.cmsValidator = (req, res, next) => {
  const message = common.setLanguage(
    req.headers[commonResponseType.ACCEPT_LANGUAGE]
  );

  const data = req.body;
  let schema = Joi.object()
    .options({ abortEarly: false })
    .keys({
  
      title: Joi.string()
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case commonResponseType.VALIDATION.ANY_EMPTY:
                err.message = message.PAGE_TITLE_CAN_NOT_BE_EMPTY;
                break;
              case commonResponseType.VALIDATION.STRING_BASE:
                err.message = message.PAGE_TITLE_CAN_NOT_NUMBER;
                break;
              case commonResponseType.VALIDATION.ANY_REQUIRED:
                err.message = message.PAGE_TITLE_IS_REQUIRED;
                break;
              default:
                err.message = message.VALIDATION_ERROR;
            }
          });
          return errors;
        }),
      // PageContent: Joi.string()
      //   .required()
      //   .error((errors) => {
      //     errors.forEach((err) => {
      //       switch (err.type) {
      //         case commonResponseType.VALIDATION.ANY_EMPTY:
      //           err.message = "PageContent cannot be empty";
      //           break;
      //         case commonResponseType.VALIDATION.STRING_BASE:
      //           err.message = "PageContent cannot be number";
      //           break;
      //         case commonResponseType.VALIDATION.ANY_REQUIRED:
      //           err.message = "PageContent is required";
      //           break;
      //         default:
      //           err.message = message.VALIDATION_ERROR;
      //       }
      //     });
      //     return errors;
      //   }),
      description: Joi.string()
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case commonResponseType.VALIDATION.ANY_EMPTY:
                err.message =message.PAGE_DESCRIPTION_CAN_NOT_EMPTY;
                break;
              case commonResponseType.VALIDATION.STRING_BASE:
                err.message =message.PAGE_DESCRIPTION_CAN_NOT_NUMBER;
                break;
              case commonResponseType.VALIDATION.ANY_REQUIRED:
                err.message = message.PAGE_DESCRIPTION_IS_REQUIRED;
                break;
              default:
                err.message = message.VALIDATION_ERROR;
            }
          });
          return errors;
        }),
    });

  Joi.validate(data, schema, (err) => {
    if (err) {
      logger.log(
        commonResponseType.LOGGER.ERROR,
        commonResponseType.LOGGER.LOGIN_API_END +
          JSON.stringify(err.details[0].message)
      );
      const response = common.commonResponse(
        commonResponseType.RESPONSE_SUCCESS.FALSE,
        null,
        err.details[0].message,
        err.details
      );
      res
        .status(commonResponseType.HTTP_RESPONSE.HTTP_VALIDATION_ERROR)
        .json(response);
    } else {
      next();
    }
  });
};

exports.validateChangeStatus = (req, res, next) => {
  const message = common.setLanguage(
    req.headers[commonResponseType.ACCEPT_LANGUAGE]
  );
  const data = req.body;
  let schema = Joi.object()
    .options({ abortEarly: false })
    .keys({
      isActive: Joi.boolean()
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case commonResponseType.VALIDATION.ANY_EMPTY:
                err.message = "Status cannot be empty";
                break;
              case commonResponseType.VALIDATION.BOOLEAN_BASE:
                err.message = "Status should be boolean";
                break;
              case commonResponseType.VALIDATION.ANY_REQUIRED:
                err.message = "Status is required";
                break;
              default:
                err.message = message.VALIDATION_ERROR;
            }
          });
          return errors;
        }),
    });
  Joi.validate(data, schema, (err) => {
    if (err) {
      logger.log(
        commonResponseType.LOGGER.ERROR,
        commonResponseType.LOGGER.EMAIL_TEMPLATE_CHANGE_STATUS_API_END +
          JSON.stringify(err.details)
      );

      const response = common.commonResponse(
        commonResponseType.RESPONSE_SUCCESS.FALSE,
        null,
        err.details[0].message.replace(/['"]+/g, "")
      );
      res
        .status(commonResponseType.HTTP_RESPONSE.HTTP_VALIDATION_ERROR)
        .json(response);
    } else {
      next();
    }
  });
};