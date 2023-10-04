const languageSet = require('../languages/translation.json');
const content = require("../static/static.json")
// Load the AWS SDK for Node.js
let AWS = require("aws-sdk");
// Set region
AWS.config.update({ region: "eu-west-1" });

/**
 * Prepare static response JSON
 * @param {boolean} success - True or False
 * @param {object} data - Any other date to be sent. Ex:view record data
 * @param {string} message - Optional message to be sent
 * @param {object} error - Error object
 * @returns {object}
 */
const commonResponse = (success, data,meta, message) => {
    const response = {
        'success': success,
        'message': message,
        'data': data,
        'meta': meta 
    }
   if(response.data === null) delete response.data
   if(response.meta === null ) delete response.meta
   return response 
}

/**
 * Remove attributes those not be sent with response. ex:_id, __v
 * @param {object} object - JSON object
 * @param {array} attributes - Attributes to be removed
 * @returns {object}
 */
const removeAttributes = (object, attributes) => {

    const objectRes = {};
    for (const key in object.toJSON()) {
        if (attributes.indexOf(key) == -1) {
            objectRes[key] = object[key];
        }
    }

    return objectRes;
};

/**
 * Prepare response JSON object for user when authentication. Just include permissions
 * @param {object} user - JSON object
 * @returns {object}
 */
const userAuth = user => {
    const msg = removeAttributes(user, [
        '_id',
        '__v',
        'password',
        'resetPasswordToken',
        'resetPasswordExpires',
        'lastPasswordChangeDate'
    ]);
    msg.id = user._id;
    return msg;
};

/**
 * Prepare response JSON object for user when authentication. Just include permissions
 * @param {object} user - JSON object
 * @returns {object}
 */
const userCommon = user => {
    const msg = removeAttributes(user, [
        '_id',
        '__v',
        'password',
        'resetPasswordToken',
        'resetPasswordExpires',
        'lastPasswordChangeDate',
        'accessToken',
        'refreshToken',
        'roleID'
    ]);
    msg.id = user._id;
    return msg;
};

/**
 * set response message language type
 * @param {string} lang - Language type
 * @returns {object}
 */
const setLanguage = (lang) => {
    if (lang === '' || lang === undefined || lang === 'en-US') {
        return languageSet["en-US"]
    }
    const langType = lang
    return languageSet[langType] === undefined ? languageSet["en-US"] : languageSet[langType];
};

const sendSms = async (code,phone_number) => {
    // Create publish parameters
    const params = {
      Message: `${content.SMS.OTP_CODE_MESSAGE} ${code}` /* required */,
      PhoneNumber: `${phone_number}`,
    };
    // SNS service object
    const snsInstance = new AWS.SNS({ apiVersion: content.SMS.apiVersion });
    // Create promise and publish 
    const serviceResponse = await snsInstance.publish(params).promise();
    return serviceResponse;
};

const generateReferralCode = async (str_len) => { 
    // const str_len = 6;
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < str_len; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  
}

const refactorJoiError = (error) => {
let feilds = [];
error.forEach((element) => {
    feilds.push(element.path[0]);
});
const newError = {};
error.forEach((element) => {
    newError[element.path[0]] = element.message.replace(/['"]+/g, "");
});

return newError;
};

  
function generateOtp(min, max) {   
    return Math.floor( 
      Math.random() * (max - min + 1) + min 
    ) 
  }

/**
 * Export module functions to be accessed from outside
 */
module.exports = {
    commonResponse: commonResponse,
    userAuth: userAuth,
    userCommon: userCommon,
    setLanguage: setLanguage,
    sendSms:sendSms,
    generateReferralCode:generateReferralCode,
    refactorJoiError:refactorJoiError,
    generateOtp:generateOtp,

    ...require("./paginated-request-params")
}