const isNumberOrTruthyString = (value) => {
  if (Number.isNaN(Number.parseFloat(value))) {
    return !!value;
  }
  return true;
};

/**
 * Create an object that purging its falsy key-values
 * @param {Object} object
 * @returns {Object}
 */

const purge = (object) =>
  Object.entries(object)
    // eslint-disable-next-line no-unused-vars
    .filter(([key, value]) => isNumberOrTruthyString(value))
    .reduce((res, [key, value]) => Object.assign(res, { [key]: value }), {});

export default purge;
