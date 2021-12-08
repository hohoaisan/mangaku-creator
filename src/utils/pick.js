/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */

const defaultOptions = { allowNull: true, allowEmptyString: true };
const pick = (object, keys, options = {}) =>
  keys.reduce((obj, key) => {
    const { allowNull, allowEmptyString } = Object.assign(defaultOptions, options);

    if (!allowNull && object[key] === null) {
      return obj;
    }

    if (!allowEmptyString && typeof object[key] === 'string' && object[key].length === 0) {
      return obj;
    }

    if (object && key in object) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});

module.exports = pick;
