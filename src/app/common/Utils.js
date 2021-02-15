/**
 * Common actions and tools used by all application
 */
export default class Utils {
  /**
   * Validate if action.type is present in values list
   *
   * @param {array} values all values where to search
   * @return {function} get action and validate if action.type is present in values list
   */
  static anyMatcher(...values) {
    return action => values.includes(action.type);
  }

  /**
   * Get a sort function that sorts a String Asc
   *
   * @param {String} attribute attribute to be sorted if array contains objects
   * @param {function} secondSort sort function to be called if strings are equals
   * @return {function} sort function resulted
   */
  static getSortString(attribute, secondSort) {
    return (a, b) => {
      const valueA = typeof a === 'string' ? a : a[attribute];
      const valueB = typeof b === 'string' ? b : b[attribute];

      if (!valueA || !valueB) {
        return secondSort ? secondSort(a, b) : 0;
      }

      return valueA.toUpperCase() < valueB.toUpperCase() ? -1 :
        valueA.toUpperCase() > valueB.toUpperCase() ? 1 : secondSort ? secondSort(a, b) : 0;
    };
  }

  /**
   * Get google drive image path
   *
   * @param {String} id drive image ID
   * @return {Object} image path
   */
  static getDriveImage(id) {
    return `https://drive.google.com/uc?export=view&id=${id}`;
  }

  /**
   * Stringify a json but without quotes on keys
   *
   * @param {Object} json to be transformed
   * @return {String} resulted string
   */
  static stringifyObjectWithNoQuotesOnKeys(json) {
    // In case of an array we'll stringify all objects.
    if (Array.isArray(json)) {
      return `[${
        json
          .map(obj => `${Utils.stringifyObjectWithNoQuotesOnKeys(obj)}`)
          .join(',')
      }]`;
    }

    // if values is null or undefined
    if (!json) {
      return json;
    }

    // not an object, stringify using native function
    if (typeof json !== 'object') {
      return JSON.stringify(json);
    }

    // Implements recursive object serialization according to JSON spec
    // but without quotes around the keys.
    return `{${
      Object
        .keys(json)
        .map(key => `${key}:${Utils.stringifyObjectWithNoQuotesOnKeys(json[key])}`)
        .join(',')
    }}`;
  }

  /**
   * Stringify a PageDataRequest used in graphql page, it uses constant ASC and DESC instead of "ASC" and "DESC"
   *
   * @param {Object} json to be transformed
   * @return {String} resulted string
   */
  static stringifyPageDataRequest(json) {
    return Utils.stringifyObjectWithNoQuotesOnKeys(json).replace('"ASC"', 'ASC').replace('"DESC"', 'DESC');
  }

  /**
   * Reset values of an useInfiniteQuery hook, using new parameters to reload
   *
   * @param {Object} queryClient object created by useQueryClient() hook
   * @param {String} queryKey unique query's identifier
   * @param {Object} newPageParams new parameter to be used in useInfiniteQuery
   * @return {void}
   */
  static resetInfiniteQuery(queryClient, queryKey, newPageParams) {
    queryClient.setQueryData(queryKey, data => ({pages: [data.pages[0]], pageParams: [newPageParams]}));
    queryClient.invalidateQueries(queryKey);
  }

  /**
   * Hide loading animation and display application content
   *
   * @return {void}
   */
  static completeLoading() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('content').style.display = 'block';
  }

  /**
   * Create a drawing animation to a SVG icon
   *
   * @param {string} id SVG icon id
   * @param {Object} configuration animation configuration
   * @param {number} configuration.strokeWidth width of drawing stroke (default 40)
   * @param {boolean} configuration.restoreOnComplete if true, icon will restore its original fill color (default true)
   * @param {number} configuration.duration animation duration (default 50)
   * @param {string} configuration.animation animation type (default 'sync'), it could be 'delayed', 'sync', 'oneByOne'
   * @param {function} configuration.callback function to call when animation completes
   * @return {Object} Vivus object
   */
  static async animateIcon(id, configuration = {}) {
    const {strokeWidth = 40, restoreOnComplete = true, duration = 50, animation = 'sync', callback} = configuration;
    const paths = document.getElementById(id).querySelectorAll('path');
    const restore = () => {
      [].forEach.call(paths, element => {
        element.setAttribute('fill', 'currentColor');
        element.setAttribute('stroke-width', 0);
      });

      callback && callback();
    };

    [].forEach.call(paths, element => {
      element.setAttribute('fill', 'transparent');
      element.setAttribute('stroke', 'currentColor');
      element.setAttribute('stroke-width', strokeWidth);
    });
    const {default: Vivus} = await import('vivus');
    return new Vivus(id, {duration, type: animation}, restoreOnComplete ? restore : callback);
  }
}