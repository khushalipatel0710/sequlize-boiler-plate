/**
 * Paginated query params
 *
 * @param {Object} param0 Request query params
 */
function paginateRequestParams({ page, limit, ...otherParams }) {
  const defaultPaginationLimit = require("config").get("paginationLimit");

  limit = limit || defaultPaginationLimit;
  page = Number(page) || 1;

  return {
    ...otherParams,
    page,
    limit,
  };
}

module.exports = {
  paginateRequestParams,
};
