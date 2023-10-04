const cmsService = require("../services/cms.service");
const common = require("../../../lib/util");
const commonResponseType = require("../../../static/static.json");
const logger = require("../../../lib/logger");
const { query } = require("express");

exports.createCms = async (req, res) => {
  const requestBody = req.body;
  const requestUserId = req.user.userId;
  const localization = req.headers[commonResponseType.ACCEPT_LANGUAGE];
  const message = common.setLanguage(localization);
  logger.info(
    commonResponseType.LOGGER.CMS_CREATE_API_START + JSON.stringify(requestBody)
  );
  let response;
  try {
    const cms = await cmsService.createCms(
      requestBody,
      requestUserId,
      localization
    );

    response = common.commonResponse(
      commonResponseType.RESPONSE_SUCCESS.TRUE,
      cms,
      null,
      message.PAGE_CREATED
    );

    res.status(commonResponseType.HTTP_RESPONSE.HTTP_SUCCESS).json(response);
    logger.info(
      commonResponseType.LOGGER.CMS_CREATE_API_SUCCESS +
        JSON.stringify(response)
    );
  } catch (error) {
    console.log("error",error);
    logger.error(
      commonResponseType.LOGGER.CMS_CREATE_API_END +
        message.UNAUTHORIZED +
        " " +
        error
    );

    response = common.commonResponse(
      commonResponseType.RESPONSE_SUCCESS.FALSE,
      {},
      null,
      message.NOT_FOUND,

    );
    res
      .status(commonResponseType.HTTP_RESPONSE.HTTP_BAD_REQUEST)
      .json(response);
  }
};

exports.getListCms = async (req, res) => {
  const requestUserId = req.user.userId;
  const reqQuery = req.query;
  const localization = req.headers[commonResponseType.ACCEPT_LANGUAGE];
  const message = common.setLanguage(localization);
  logger.info(
    commonResponseType.LOGGER.CMS_GET_API_START + JSON.stringify(req.query)
  );

  let response;
  try {
    const getAllCms = await cmsService.getListOfCms(
      requestUserId,
      common.paginateRequestParams(reqQuery),
      reqQuery,
      localization
    );

    response = common.commonResponse(
      commonResponseType.RESPONSE_SUCCESS.TRUE,
      getAllCms.docs,
      {
        pages: getAllCms.pages,
        total: getAllCms.total,
      },
      message.PAGE_FETCHED,
     
    );
    res.status(commonResponseType.HTTP_RESPONSE.HTTP_SUCCESS).json(response);
    logger.info(
      commonResponseType.LOGGER.CMS_GET_API_SUCCESS + JSON.stringify(response)
    );
  } catch (error) {
    console.log("error",error);
    logger.error(
      commonResponseType.LOGGER.CMS_GET_API_END + message.UNAUTHORIZED + error
    );
    response = common.commonResponse(
      commonResponseType.RESPONSE_SUCCESS.FALSE,
      [],
      null,
      message.NOT_FOUND
    );
    res
      .status(commonResponseType.HTTP_RESPONSE.HTTP_BAD_REQUEST)
      .json(response);
  }
};

exports.getCMSById = async (req, res) => {
  const requestUserId = req.params.id;
  const localization = req.headers[commonResponseType.ACCEPT_LANGUAGE];
  const message = common.setLanguage(localization);
  logger.info(commonResponseType.LOGGER.CMS_GET_ID_API_START + requestUserId);
  let response;
  try {
    const getCMSById = await cmsService.getCmsById(requestUserId, localization);

    if (!getCMSById) {
      response = common.commonResponse(
        commonResponseType.RESPONSE_SUCCESS.FALSE,
        {},
        null,
        message.CMS_NOT_FOUND
      );
      return res
        .status(commonResponseType.HTTP_RESPONSE.HTTP_NOT_FOUND)
        .json(response);
    }
    logger.info(
      commonResponseType.LOGGER.CMS_GET_ID_API_SUCCESS +
        JSON.stringify(getCMSById)
    );
    response = common.commonResponse(
      commonResponseType.RESPONSE_SUCCESS.TRUE,
      getCMSById,
      null,
      message.CMS_PAGE_GET
    );

    res.status(commonResponseType.HTTP_RESPONSE.HTTP_SUCCESS).json(response);
    logger.info(
      commonResponseType.LOGGER.CMS_GET_ID_API_END + JSON.stringify(response)
    );
  } catch (error) {
    logger.error(
      commonResponseType.LOGGER.CMS_GET_ID_API_END + message.UNAUTHORIZED
    );
    response = common.commonResponse(
      commonResponseType.RESPONSE_SUCCESS.FALSE,
      [],
      null,
      message.NOT_FOUND,
      
    );
    res
      .status(commonResponseType.HTTP_RESPONSE.HTTP_BAD_REQUEST)
      .json(response);
  }
};

exports.getCMSByName = async (req, res) => {
  const requestUserName = req.params.name;
  const reqQuery = req.query;
  const localization = req.headers[commonResponseType.ACCEPT_LANGUAGE];
  const message = common.setLanguage(localization);
  logger.info(commonResponseType.LOGGER.CMS_GET_ID_API_START + requestUserName);
  let response;
  try {
    const getCMSByName = await cmsService.getCmsByName(
      requestUserName,
      localization
    );
    if (!getCMSByName) {
      response = common.commonResponse(
        commonResponseType.RESPONSE_SUCCESS.FALSE,
        {},
        null,
        message.CMS_NOT_FOUND,
        null
      );
      return res
        .status(commonResponseType.HTTP_RESPONSE.HTTP_NOT_FOUND)
        .json(response);
    }
    logger.info(
      commonResponseType.LOGGER.CMS_GET_ID_API_SUCCESS +
        JSON.stringify(getCMSByName)
    );
    response = common.commonResponse(
      commonResponseType.RESPONSE_SUCCESS.TRUE,
      getCMSByName,
      null,
      message.CMS_PAGE_GET
    );

    res.status(commonResponseType.HTTP_RESPONSE.HTTP_SUCCESS).json(response);
    logger.info(
      commonResponseType.LOGGER.CMS_GET_ID_API_END + JSON.stringify(response)
    );
  } catch (error) {
    console.log("error", error);
    logger.error(
      commonResponseType.LOGGER.CMS_GET_ID_API_END + message.UNAUTHORIZED
    );
    response = common.commonResponse(
      commonResponseType.RESPONSE_SUCCESS.FALSE,
      null,
      message.NOT_FOUND
    );
    res
      .status(commonResponseType.HTTP_RESPONSE.HTTP_BAD_REQUEST)
      .json(response);
  }
};
exports.updateCMS = async (req, res) => {
  const requestBody = req.body;
  const requestId = req.params.id;
  const requestUserId = req.user.userId;
  const localization = req.headers[commonResponseType.ACCEPT_LANGUAGE];
  const message = common.setLanguage(localization);
  logger.info(
    commonResponseType.LOGGER.CMS_UPDATE_API_START + JSON.stringify(requestBody)
  );
  let response;
  try {
  
    const updateCms = await cmsService.updateCms(
      requestBody,
      requestId,
      localization
    );
    if (!updateCms) {
      response = common.commonResponse(
        commonResponseType.RESPONSE_SUCCESS.FALSE,
        {},
        null,
        message.CMS_NOT_FOUND,
       
      );
      res
        .status(commonResponseType.HTTP_RESPONSE.HTTP_NOT_FOUND)
        .json(response);
    }
     const data = await cmsService.getCmsById(
      requestId,
      localization)
    logger.info(
      commonResponseType.LOGGER.EMAIL_TEMPLATE_UPDATE_API_START +
        JSON.stringify(updateCms)
    );
    response = common.commonResponse(
      commonResponseType.RESPONSE_SUCCESS.TRUE,
      data,
      null,
      message.CMS_UPDATED,
      
    );

    res.status(commonResponseType.HTTP_RESPONSE.HTTP_SUCCESS).json(response);
    logger.info(
      commonResponseType.LOGGER.CMS_UPDATE_API_SUCCESS +
        JSON.stringify(response)
    );
  } catch (error) {
    logger.error(
      commonResponseType.LOGGER.CMS_UPDATE_API_END +
        message.UNAUTHORIZED +
        error.message
    );
    response = common.commonResponse(
      commonResponseType.RESPONSE_SUCCESS.FALSE,
      {},
      null,
      message.NOT_FOUND,
     
    );
    res
      .status(commonResponseType.HTTP_RESPONSE.HTTP_BAD_REQUEST)
      .json(response);
  }
};

exports.deleteCMS = async (req, res) => {
  const requestUserId = req.user.userId;
  const requestId = req.params.id;
  const localization = req.headers[commonResponseType.ACCEPT_LANGUAGE];
  const message = common.setLanguage(localization);
  logger.info(commonResponseType.LOGGER.CMS_DELETE_API_START + requestId);
  let response;
  try {
    const deleteCms = await cmsService.deleteCms(requestId, localization);
    if (!deleteCms) {
      response = common.commonResponse(
        commonResponseType.RESPONSE_SUCCESS.FALSE,
        {},
        null,
        message.CMS_NOT_FOUND,
        null
      );
      res
        .status(commonResponseType.HTTP_RESPONSE.HTTP_NOT_FOUND)
        .json(response);
    }
    logger.info(
      commonResponseType.LOGGER.CMS_DELETE_API_START + JSON.stringify(deleteCms)
    );
    response = common.commonResponse(
      commonResponseType.RESPONSE_SUCCESS.TRUE,
      deleteCms,
      null,
      message.CMS_DELETED,
      null
    );

    res.status(commonResponseType.HTTP_RESPONSE.HTTP_SUCCESS).json(response);
    logger.info(
      commonResponseType.LOGGER.CMS_DELETE_API_SUCCESS +
        JSON.stringify(response)
    );
  } catch (error) {
    logger.error(
      commonResponseType.LOGGER.CMS_DELETE_API_END + message.UNAUTHORIZED
    );
    response = common.commonResponse(
      commonResponseType.RESPONSE_SUCCESS.FALSE,
      {},
      null,
      message.NOT_FOUND,
    
    );
    res
      .status(commonResponseType.HTTP_RESPONSE.HTTP_BAD_REQUEST)
      .json(response);
  }
};
