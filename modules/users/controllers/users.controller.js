// all case of join tables in user.repo.js

const UserStatisticRepo = require("../repositories/user.repo");
const commonResponseType = require("../../../static/static.json");
const common = require("../../../lib/util");
const logger = require("../../../lib/logger");

exports.getUsers = async (req, res) => {
  const requestBody = req.body;
  const reqQuery = req.query;
  const localization = req.headers[commonResponseType.ACCEPT_LANGUAGE];
  const message = common.setLanguage(localization);
  logger.info(commonResponseType.LOGGER.USER_GET_API_START + JSON.stringify());

  let response;
  try {
    const users = await UserStatisticRepo.getUsers(localization);

    response = common.commonResponse(
      commonResponseType.RESPONSE_SUCCESS.TRUE,
      users,
      null,
      message.USERS_FETCHED
    );

    res.status(commonResponseType.HTTP_RESPONSE.HTTP_SUCCESS).json(response);
    logger.info(
      commonResponseType.LOGGER.USERS_GET_API_SUCCESS + JSON.stringify(response)
    );
  } catch (error) {
    logger.error(
      commonResponseType.LOGGER.USERS_GET_API_END + message.UNAUTHORIZED + error
    );
    response = common.commonResponse(
      commonResponseType.RESPONSE_SUCCESS.FALSE,
      null,
      null,
      message.NOT_FOUND
    );
    res
      .status(commonResponseType.HTTP_RESPONSE.HTTP_BAD_REQUEST)
      .json(response);
  }
};

exports.createUsers = async (req, res) => {
  // const requestUserId = req.user.UserId;
  const requestBody = req.body;
  const reqQuery = req.query;
  const localization = req.headers[commonResponseType.ACCEPT_LANGUAGE];
  const message = common.setLanguage(localization);
  logger.info(commonResponseType.LOGGER.USER_GET_API_START + JSON.stringify());

  let response;
  try {
    const users = await UserStatisticRepo.createUsers(requestBody);

    response = common.commonResponse(
      commonResponseType.RESPONSE_SUCCESS.TRUE,
      users.docs,
      {
        page: users.pages,
        total: users.total,
      },
      message.USERS_FETCHED
    );

    res.status(commonResponseType.HTTP_RESPONSE.HTTP_SUCCESS).json(response);
    logger.info(
      commonResponseType.LOGGER.USERS_GET_API_SUCCESS + JSON.stringify(response)
    );
  } catch (error) {
    console.log("err", error);
    logger.error(
      commonResponseType.LOGGER.USERS_GET_API_END + message.UNAUTHORIZED + error
    );
    response = common.commonResponse(
      commonResponseType.RESPONSE_SUCCESS.FALSE,
      null,
      null,
      message.NOT_FOUND
    );
    res
      .status(commonResponseType.HTTP_RESPONSE.HTTP_BAD_REQUEST)
      .json(response);
  }
};
