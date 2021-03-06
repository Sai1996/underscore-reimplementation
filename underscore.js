var _ = function (obj) {
  if (obj instanceof _) return obj;
  if (!(this instanceof _)) return new _(obj);
  this._wrapped = obj;
};

window._ = _;

_.reduce = function (list, iteratee, memo, context) {
  var result = (memo === undefined ? list[0] : memo);
  if (list !== null) {
    for (var i = (memo === undefined ? 1 : 0); i < list.length; i++) {
      result = iteratee.call(context, result, list[i], i, list);
    }
  }
  return result;
}
_.inject = _.reduce;
_.foldl = _.reduce;

_.reduceRight = function (list, iteratee, memo, context) {
  var result = (memo === undefined ? list[list.length - 1] : memo);
  if (list !== null) {
    for (var i = (memo === undefined ? list.length - 2 : list.length - 1); i >= 0; i--) {
      result = iteratee.call(context, result, list[i], i, list);
    }
  }
  return result;
}

_.invoke = function (list, methodName, arg) {
  var arr = _.toArray(arguments);
  arr.splice(0, 2);
  for (var i = 0; i < list.length; i++) {
    if (list[i][methodName] === null) {
      list[i] = null;
    } else if (list[i][methodName] === undefined) {
      list[i] = undefined;
    } else {
      list[i] = list[i][methodName].apply(list[i], arr);
    }

  }
  return list;
}

_.constant = function (value) {
  return function () {
    return value;
  };
}

_.isArray = function (object) {
  if (typeof object == "object" && Object.prototype.toString.call(object) === "[object Array]") {
    return true;
  }
  return false;
}

_.isString = function (object) {
  if (Object.prototype.toString.call(object) === "[object String]") {
    return true;
  }
  return false;
}

_.isNumber = function (object) {
  if (Object.prototype.toString.call(object) === "[object Number]") {
    return true;
  }
  return false;
}

_.isBoolean = function (object) {
  if (Object.prototype.toString.call(object) === "[object Boolean]") {
    return true;
  }
  return false;
}

_.isNull = function (object) {
  if (Object.prototype.toString.call(object) === "[object Null]") {
    return true;
  }
  return false;
}

_.isUndefined = function (object) {
  return Object.prototype.toString.call(object) === "[object Undefined]";
}

_.isNaN = function (object) {
  if ((typeof object === "number" || typeof object == "object") && isNaN(object)) {
    return true;
  }
  return false;
}

_.isRegExp = function (object) {
  return Object.prototype.toString.call(object) === "[object RegExp]";
}

_.isDate = function (object) {
  return Object.prototype.toString.call(object) === "[object Date]";
}

_.isFunction = function (object) {
  return Object.prototype.toString.call(object) === "[object Function]";
}

_.isError = function (object) {
  return Object.prototype.toString.call(object) === "[object Error]";
}

_.isObject = function (object) {
  if ((typeof object === "object" && object !== null) || typeof object === "function") {
    while (Object.getPrototypeOf(object) !== null) {
      if (Object.prototype.toString.call(Object.getPrototypeOf(object)) === "[object Object]") {
        return true;
      }
      object = Object.getPrototypeOf(object);
    }
  }
  return false;
}

_.isEmpty = function (object) {
  if (_.isString(object) || _.isArray(object)) {
    return object.length === 0;
  } else {
    var hasNoProp = true;
    for (const prop in object) {
      if (object.hasOwnProperty(prop)) {
        hasNoProp = false;
      }
    }
    return hasNoProp;
  }
}

_.isMatch = function (object, properties) {
  var isProp = true;

  if (_.isEmpty(properties) || _.isNull(properties)) {
    return isProp;
  }

  if (Object.prototype.toString.call(object) === "[object Object]") {
    for (const prop in properties) {

      if (object[prop] !== properties[prop]) {
        isProp = false;
      } else if (!object.hasOwnProperty(prop)) {
        if (properties[prop] === undefined) {
          isProp = false;
        } else {
          var pto = object.constructor.prototype;
          if (!pto.hasOwnProperty(prop) || pto[prop] !== properties[prop]) {
            isProp = false;
          }
        }
      }
    }
    return isProp;
  }
  return false;

}
_.isArguments = function (object) {
  return Object.prototype.toString.call(object) === "[object Arguments]";
}
_.isFinite = function (object) {
  if (_.isNull(object) || object === "") {
    return false;
  }

  try {
    object = Number(object);
  } catch (error) {
    return false;
  } finally {

  }

  return _.isNumber(object) && object !== Infinity && object !== -Infinity && !isNaN(object);
}

_.isEqual = function (object, other) {
  var testIsNaN = function (a, b) {
    //Number
    if (typeof a === "number" && typeof b === "number" && isNaN(a) && isNaN(b)) {
      return true;
    }
    return false;
  }
  //Array
  if (object instanceof Array && other instanceof Array) {
    if (object.length === other.length) {
      var same = true;
      for (var i = 0; i < object.length; i++) {
        if (!_.isEqual(object[i], other[i])) {
          same = false;
          break;
        }
      }
      return same;
    }
    return false;
  }
  //Object
  if (object === other) {
    if ((1 / object === -Infinity && 1 / other !== -Infinity) || (1 / object !== -Infinity && 1 / other === -Infinity)) {
      return false;
    } else {
      return true;
    }
  } else {
    if (testIsNaN(object, other)) {
      return true;
    }
    if (object !== null && object !== undefined && other !== null && other !== undefined) {
      var a = object.valueOf();
      var b = other.valueOf();
      if (object.constructor !== other.constructor) {
        return false;
      }
      if (testIsNaN(a, b)) {
        if (object instanceof Number) {
          return true;
        }
        return false;
      }
      if (a === b) {
        if ((1 / a === -Infinity && 1 / b !== -Infinity) || (1 / a !== -Infinity && 1 / b === -Infinity)) {
          return false;
        } else {
          return true;
        }
      }
    }

    if (String(object) === String(other)) {
      if (_.isObject(object) && _.isObject(other)) {
        for (const prop in object) {
          if (!other.hasOwnProperty(prop) || other[prop] !== object[prop]) {
            //return false;
          }
        }
      }
      return true;
    }
    return false;
  }
}

_.findIndex = function (array, predicate, context) {
  var found = -1;
  if (_.isNull(array)) {
    return found;
  }
  for (var i = 0; i < array.length; i++) {
    if (_.isFunction(predicate) && predicate.call(context, array[i], i, array)) {
      found = i;
      break;
    } else if (_.isString(predicate)) {
      if (array[i].hasOwnProperty(predicate) && !!array[i][predicate]) {
        found = i;
        break;
      }
    }
  }

  return found;
}

_.findLastIndex = function (array, predicate, context) {
  var found = -1;
  if (_.isNull(array)) {
    return found;
  }
  for (var i = array.length - 1; i >= 0; i--) {
    if (_.isFunction(predicate) && predicate.call(context, array[i], i, array)) {
      found = i;
      break;
    } else if (_.isString(predicate)) {
      if (array[i].hasOwnProperty(predicate) && !!array[i][predicate]) {
        found = i;
        break;
      }
    }
  }

  return found;
}

_.isElement = function (object) {
  return object instanceof Element || Object.prototype.toString.call(object) === "[object HTMLDivElement]";
}

_.each = function (list, iteratee, context) {
  if (typeof iteratee === "function") {
    if (Object.prototype.toString.call(list) === "[object Object]") {
      for (const prop in list) {
        if (list.hasOwnProperty(prop)) {
          iteratee.call(context, list[prop], prop, list);
        }
      }
    } else {
      if (list !== null) {
        for (var i = 0; i < list.length; i++) {
          iteratee.call(context, list[i], i, list);
        }
      }
    }
  }
  return list;
}

_.forEach = _.each;

_.contains = function (list, value, fromIndex) {
  if (_.isArray(list)) {
    return list.indexOf(value, fromIndex) !== -1;
  } else {
    return list.indexOf(value) !== -1;
  }
}

_.includes = _.contains;
_.include = _.contains;


_.partial = function (func) {
  var args = _.toArray(arguments).slice(1);

  function newFunc() {
    var newArg = [];
    var thisArgs = _.toArray(arguments);
    var cur = 0;
    for (var i = 0; i < args.length; i++) {
      if (args[i] === _.partial.placeholder) {
        newArg.push(thisArgs[cur]);
        cur++;
      } else {
        newArg.push(args[i]);
      }
    }
    for (var i = cur; i < thisArgs.length; i++) {
      newArg.push(thisArgs[i]);
    }
    return func.apply(this, newArg);
  }
  newFunc.prototype = Object.create(func.prototype);
  return newFunc;
}
_.partial.placeholder = _;

_.toArray = function (list) {
  var output = [];
  if (Object.prototype.toString.call(list) === "[object Object]") {
    for (const prop in list) {
      output.push(list[prop]);
    }
    return output;
  } else {
    return Array.prototype.slice.call(list);
  }

}

_.map = function (list, iteratee, context) {
  var output = [];
  if (Object.prototype.toString.call(list) === "[object Object]") {
    for (const prop in list) {
      if (iteratee.call(context, list[prop], prop, list) !== undefined) {
        output.push(iteratee.call(context, list[prop], prop, list));
      }
    }
  } else if (_.isString(list) || _.isArray(list))
    for (var i = 0; i < list.length; i++) {
      if (_.isFunction(iteratee) && iteratee.call(context, list[i]) !== undefined) {
        output.push(iteratee.call(context, list[i]));
      } else {
        output.push(list[i][iteratee]);
      }
    }
  return output;
}

_.collect = _.map;

_.initial = function (array, n) {
  var args = _.toArray(arguments);
  if (args.length == 1) {
    n = 1;
  }
  if (n > array.length) {
    return [];
  }
  return Array.prototype.slice.call(array, 0, array.length - n);
}

var arraySum = [];
_.flatten = function (array, shallow) {
  if (arguments.length === 1) {
    for (var i = 0; i < array.length; i++) {

    }
  } else {

  }
}

_.without = function (array, values) {
  var args = _.toArray(arguments).slice(1);
  var output = [];
  for (var i = 0; i < array.length; i++) {
    if (args.indexOf(array[i]) === -1) {
      output.push(array[i]);
    }
  }
  return output;
}

_.union = function (arrays) {
  var args = _.toArray(arguments)
  var curArg = [];
  for (var i = 0; i < args.length; i++) {
    for (var j = 0; j < args[i].length; j++) {
      curArg.push(args[i][j]);
    }
  }
  var output = [];
  for (var i = 0; i < curArg.length; i++) {
    if (output.indexOf(curArg[i]) === -1) {
      output.push(curArg[i]);
    }
  }
  return output;
}

_.intersection = function (arrays) {
  var args = _.toArray(arguments);
  var output = [];
  for (var i = 0; i < args.length; i++) {
    if (_.isNull(args[i])) {
      return output;
    }
    args[i] = _.toArray(args[i]);
  }
  var lastInterSec = args[0]
  for (var i = 0; i < args.length - 1; i++) {
    lastInterSec = lastInterSec.filter(function (e) {
      return args[i + 1].indexOf(e) !== -1;
    });
  }
  output = lastInterSec.filter(function (element, index) {
    return lastInterSec.indexOf(element) === index;
  });
  return output;
}

_.difference = function (array, others) {
  if (!_.isArray(array)) {
    array = _.toArray(array);
  }
  var other = _.toArray(arguments).slice(1);
  var uni = _.union.apply(null, other);
  var output = [];
  output = array.filter(function (e) {
    return uni.indexOf(e) === -1;
  });
  return output;
}

_.uniq = function (array, isSorted, iteratee) {
  if (_.isNull(array) || _.isUndefined(array)) {
    return [];
  }
  if (!_.isArray(array)) {
    array = _.toArray(array);
  }

  var output = [];
  var temp = [];

  if (arguments.length === 2 && !_.isBoolean(isSorted)) {
    iteratee = arguments[1];
  }
  if (_.isFunction(iteratee)) {
    for (var i = 0; i < array.length; i++) {
      temp[i] = iteratee(array[i]);
    }
    temp = temp.filter(function (e, i) {
      if (temp.indexOf(e) === i) {
        output.push(array[i]);
      }
      return temp.indexOf(e) === i;
    });
    return output;
  } else if (_.isString(iteratee) || _.isNumber(iteratee)) {
    var record = [];
    temp = array;
    for (var i = 0; i < temp.length; i++) {
      if (record.indexOf(temp[i][iteratee]) === -1) {
        output.push(temp[i]);
        record.push(temp[i][iteratee]);
      }
    }
    return output;
  }
  if (isSorted) {
    output = array.filter(function (e, i) {
      return array.indexOf(e) === i;
    })
  } else {
    for (var i = 0; i < array.length; i++) {
      if (output.indexOf(array[i]) === -1) {
        output.push(array[i]);
      }
    }
  }
  return output;
}

_.unique = _.uniq;

_.clone = function (object) {
  var output;
  if (_.isObject(object) && !_.isNull(object) && !_.isUndefined(object)) {
    output = Object.assign({}, object);
  } else if (_.isUndefined(object)) {
    output = undefined;
  } else if (_.isNull(object)) {
    output = null;
  } else {
    output = object;
  }
  return output;
}

_.last = function (array, n) {
  if (_.isNull(array)) {
    return void 0;
  } else if (_.isEmpty(array)) {
    return undefined;
  }
  if (arguments.length === 1) {
    return array[array.length - 1];
  } else if (arguments.length > 2) {
    return _.last(array);
  } else {
    if (n > array.length) {
      return array;
    }
    return array.slice(array.length - n);
  }
}

_.lastIndexOf = function (array, value, fromIndex) {
  var pos = -1;
  if (_.isNull(array) || _.isUndefined(array)) {
    return pos;
  }
  if (_.isNaN(fromIndex)) {
    return pos;
  }
  if (_.isUndefined(fromIndex) || !_.isFinite(fromIndex) || fromIndex >= array.length || !_.isNumber(fromIndex)) {
    if (fromIndex === -Infinity) {
      return pos;
    }
    fromIndex = array.length - 1;
  }

  if (fromIndex < 0) {
    fromIndex += array.length;
  }
  for (var i = fromIndex; i >= 0; i--) {
    if (array[i] === value || (_.isNaN(array[i]) && _.isNaN(value))) {
      pos = i;
      break;
    }
  }

  return pos;
}

_.indexOf = function (array, value, isSorted) {
  if (_.isNull(array) || _.isBoolean(array) || _.isUndefined(array)) {
    return -1;
  }
  var arr = _.toArray(array);
  var pos = -1;
  if (isSorted === -Infinity) {
    isSorted = 0;
  }
  if (!_.isUndefined(isSorted) && !_.isNumber(isSorted)) {
    isSorted = true;
  }
  if (isSorted < 0) {
    isSorted += arr.length;
  }
  if (_.isBoolean(isSorted)) {
    isSorted = undefined;
  }
  if (_.isArray(arr)) {
    for (var i = (_.isUndefined(isSorted) ? 0 : Number(isSorted)); i < arr.length; i++) {
      if (arr[i] === value || (_.isNaN(arr[i]) && _.isNaN(value))) {
        pos = i;
        break;
      }
    }
  }
  return pos;
}

_.identity = function (value) {
  return value;
}

_.some = function (list, predicate, context) {
  list = _.toArray(list);
  var output = false;
  for (var i = 0; i < list.length; i++) {
    if (_.isFunction(predicate)) {
      if (predicate.call(context, list[i])) {
        output = true;
        break;
      }
    } else if (_.isUndefined(predicate) || _.isNull(predicate)) {
      if (list[i]) {
        output = true;
        break;
      }
    } else if (_.isObject(predicate)) {
      for (const prop in predicate) {
        if (list[i].hasOwnProperty(prop) && predicate[prop] === list[i][prop]) {
          output = true;
          break;
        } else {
          output = false;
          break;
        }
      }
    } else if (_.isString(predicate)) {
      for (const prop in list[i]) {
        if (prop === predicate) {
          output = true;
          break;
        }
      }
    }
  }
  return output;
}

_.any = _.some;

_.filter = function (list, predicate, context) {
  var output = [];
  if (_.isUndefined(list) || _.isNull(list) || _.isEmpty(list)) {
    return output;
  } else {
    if (_.isArray(list)) {
      for (var i = 0; i < list.length; i++) {
        if (_.isFunction(predicate)) {
          if (predicate.call(context, list[i])) {
            output.push(list[i]);
          }
        } else if (_.isString(predicate)) {

          if (list[i].hasOwnProperty(predicate)) {
            output.push(list[i]);
            break;
          }
        } else if (_.isObject(predicate)) {
          if (_.isEmpty(predicate)) {
            return list;
          }
          for (const prop in predicate) {
            if (list[i].hasOwnProperty(prop) && list[i][prop] === predicate[prop]) {
              output.push(list[i]);
              break;
            }
          }
        }
      }
    } else if (_.isObject(list)) {
      for (const prop in list) {
        if (predicate.call(context, list[prop], prop)) {
          output.push(list[prop]);
        }
      }
    }
  }

  return output;
}

_.select = _.filter;

_.where = function (list, properties) {
  var output = [];
  for (var i = 0; i < list.length; i++) {
    var fit = true;
    for (const prop in properties) {
      if (!list[i].hasOwnProperty(prop) || list[i][prop] !== properties[prop]) {
        fit = false;
        break;
      }
    }
    if (fit) {
      output.push(list[i]);
    }
  }
  return output;
}

_.findWhere = function (list, properties) {
  for (var i = 0; i < list.length; i++) {
    var fit = true;
    for (const prop in properties) {
      if (!list[i].hasOwnProperty(prop) || list[i][prop] !== properties[prop]) {
        fit = false;

      }
    }
    if (fit) {
      return list[i];
    }
  }
}

_.reject = function (list, predicate, context) {
  var passed = _.filter(list, predicate, context);
  var output = [];
  for (var i = 0; i < list.length; i++) {
    if (passed.indexOf(list[i]) === -1) {
      output.push(list[i]);
    }
  }
  return output;
}

_.every = function (list, predicate, context) {
  var allTrue = true;
  list = _.toArray(list);
  for (var i = 0; i < list.length; i++) {
    if (_.isFunction(predicate)) {
      if (!predicate.call(context, list[i])) {
        allTrue = false;
        break;
      }
    } else if (_.isObject(predicate)) {
      for (const prop in predicate) {
        if (!list[i].hasOwnProperty(prop) || list[i][prop] !== predicate[prop]) {
          allTrue = false;
          break;
        }
      }
    } else if (_.isString(predicate)) {
      if (!list[i].hasOwnProperty(predicate)) {
        allTrue = false;
        break;
      }
    }
  }
  return allTrue;
}

_.pluck = function (list, propertyName) {
  var output = [];
  for (var i = 0; i < list.length; i++) {
    output.push(list[i][propertyName]);
  }
  return output;
}

_.max = function (list, iteratee, context) {
  var output = -Infinity;
  if (_.isEmpty(list) || _.isUndefined(list)) {
    return output;
  }
  list = _.toArray(list);
  for (var i = 0; i < list.length; i++) {
    var cur;
    if (!_.isUndefined(iteratee) && _.isFunction(iteratee)) {
      cur = iteratee.call(context, list[i]);
      if (cur >= output) {
        output = list[i];
      }
    } else if (_.isObject(list[i]) && (_.isString(iteratee) || _.isNumber(iteratee))) {
      if (output === -Infinity) {
        output = list[i];
      } else {
        if (list[i][iteratee] > output[iteratee]) {
          output = list[i];
        }
      }
    } else {
      if (list[i] >= output) {
        output = list[i];
      }
    }
  }
  return output;
}

_.min = function (list, iteratee, context) {
  var output = Infinity;
  if (_.isEmpty(list)) {
    return output;
  }
  list = _.toArray(list);
  for (var i = 0; i < list.length; i++) {
    var cur;
    if (!_.isUndefined(iteratee) && _.isFunction(iteratee)) {
      cur = iteratee.call(context, list[i]);
      if (cur <= output && !_.isNull(cur)) {
        output = list[i];
      }
    } else if (_.isObject(list[i]) && (_.isString(iteratee) || _.isNumber(iteratee))) {
      cur = list[i][iteratee];
      if (output === Infinity) {
        output = list[i];
      } else {
        if (cur <= output[iteratee]) {
          output = list[i];
        }
      }
    } else {
      if (list[i] <= output && !_.isNull(list[i])) {
        output = list[i];
      }
    }
  }
  return output;
}

_.range = function (start, stop, step) {
  var args = Array.prototype.slice.call(arguments);
  if (args.length === 3) {
    start = args[0];
    stop = args[1];
    step = args[2];
  } else if (args.length === 2) {
    start = args[0];
    stop = args[1];
    step = (start > stop ? -1 : 1);
  } else {
    start = 0;
    stop = args[0];
    step = (start > stop ? -1 : 1);
  }
  var output = [];
  if (stop <= start && step > 0) {
    return output;
  }
  if (stop < start) {
    for (var i = start; i > stop; i += step) {
      output.push(i);
    }
  } else {
    for (var i = start; i < stop; i += step) {
      output.push(i);
    }
  }
  return output;
}

_.shuffle = function (list) {
  list = _.toArray(list);
  for (var i = list.length - 1; i >= 0; i--) {
    var posIndex = Math.floor(Math.random() * Math.floor(i));
    var posVal = list[posIndex];
    var toPos = i;
    var toVal = list[i];
    list[toPos] = posVal;
    list[posIndex] = toVal;
  }
  return list;
}

_.sortBy = function (list, iteratee, context) {
  list = _.toArray(list);
  var output = list.sort(function (a, b) {
    if (_.isFunction(iteratee)) {
      return iteratee.call(context, a) - iteratee.call(context, b);
    } else if (_.isString(iteratee)) {
      if (iteratee === 'length') {
        return a.length - b.length;
      } else {
        return list[a][iteratee] - list[b][iteratee];
      }
    }
  })
  return output;
}

_.object = function (list, values) {
  if (arguments.length !== 1) {
    values = _.toArray(values);
  }
  list = _.toArray(list);
  var output = new Object();
  for (var i = 0; i < list.length; i++) {
    if (!_.isUndefined(values)) {
      output.list[i] = values[i];
    } else {
      output.list[i][0] = list[i][1];
    }
  }
  return output;
}

_.size = function (list) {
  if (_.isNull(list) || _.isUndefined(list)) {
    return 0;
  }
  if (list.hasOwnProperty(length)) {
    return list.length;
  }
  list = _.toArray(list);
  return list.length;
}

_.sample = function (list, n) {
  if (arguments.length === 1) {
    n = 1;
  }
  var index;
  var output = [];
  var dup = [];
  list = _.toArray(list);
  for (var i = 0; i < list.length; i++) {
    dup.push(list[i]);
  }
  if (n === 1) {
    index = Math.floor(Math.random() * Math.floor(list.length))
    return list[index];
  }
  if (n > list.length) {
    n = list.length;
  }
  for (var i = 0; i < n; i++) {
    index = Math.floor(Math.random() * Math.floor(dup.length))
    output.push(dup[index]);
    dup.splice(index, 1);
  }
  return output;
}

_.find = function (list, predicate, context) {
  list = _.toArray(list);
  var output = undefined;
  for (var i = 0; i < list.length; i++) {
    if (_.isFunction(predicate) && predicate.call(context, list[i])) {
      output = list[i];
      return output;
    } else if (_.isObject(predicate)) {
      for (const prop in predicate) {
        if (list[i].hasOwnProperty(prop) && list[i][prop] === predicate[prop]) {
          output = list[i];
        } else {
          output = undefined;
          break;
        }
      }
      if (!_.isUndefined(output)) {
        return output;
      }
    }
  }
}

_.findKey = function (object, predicate, context) {
  var found = undefined;
  if (_.isNull(object)) {
    return found;
  }
  for (const prop in object) {
    if (_.isFunction(predicate) && predicate.call(context, object[prop], prop, object)) {
      found = prop;
      break;
    } else if (_.isString(predicate) && object.hasOwnProperty(predicate) && !!object[prop][predicate]) {
      found = prop;
      break;
    }
  }
  return found;
}

_.partition = function (list, predicate, context) {
  if (!_.isObject(list)) {
    list = _.toArray(list);
  }
  var pass = [];
  var notPass = [];
  var output = [];
  if (_.isObject(list)) {
    for (const prop in list) {
      if (_.isFunction(predicate)) {
        if (predicate.call(context, list[prop], prop, list)) {
          pass.push(list[prop]);
        } else {
          notPass.push(list[prop]);
        }
      }
    }
  } else {
    for (var i = 0; i < list.length; i++) {
      if (_.isFunction(predicate)) {
        if (predicate.call(context, list[i], i, list)) {
          pass.push(list[i]);
        } else {
          notPass.push(list[i]);
        }
      } else if (_.isUndefined(predicate)) {
        if (!!list[i]) {
          pass.push(list[i]);
        } else {
          notPass.push(list[i]);
        }
      } else if (_.isString(predicate)) {
        if (!!list[i][predicate]) {
          pass.push(list[i]);
        } else {
          notPass.push(list[i]);
        }
      } else if (_.isObject(predicate)) {
        for (const prop in predicate) {
          if (list[i].hasOwnProperty(prop) && list[i][prop] === predicate[prop]) {
            pass.push(list[i]);
          } else {
            notPass.push(list[i]);
          }
        }
      }
    }

  }

  output.push(pass);
  output.push(notPass);
  return output;
}

_.first = function (list, n) {
  if (_.isNull(list) || _.isEmpty(list)) {
    return undefined;
  }
  if (arguments.length === 1) {
    return list[0];
  }
  list = _.toArray(list);
  var output = list.splice(0, n);
  return output;
}

_.head = _.first;
_.take = _.first;

_.initial = function (list, n) {
  if (_.isNull(list) || _.isEmpty(list)) {
    return undefined;
  }
  list = _.toArray(list);
  var output = [];
  if (arguments.length === 1) {
    output = list.splice(0, list.length - 1);
    return output;
  }
  output = list.splice(0, list.length - n);
  return output;
}

_.last = function (list, n) {
  if (_.isNull(list) || _.isEmpty(list)) {
    return undefined;
  }
  list = _.toArray(list);
  var output;
  if (arguments.length === 1) {
    output = list[list.length - 1];
    return output;
  }
  if (n > list.length) {
    return list;
  }
  output = list.splice(list.length - n);
  return output;
}

_.rest = function (list, index) {
  if (_.isNull(list) || _.isEmpty(list)) {
    return undefined;
  }
  list = _.toArray(list);
  var output;
  if (arguments.length === 1) {
    output = list.splice(1, list.length - 1);
    return output;
  }
  output = list.splice(index);
  return output;
}

_.compact = function (list) {
  var output = [];
  for (var i = 0; i < list.length; i++) {
    if (!!list[i]) {
      output.push(list[i]);
    }
  }
  return output;
}

_.without = function (list, values) {
  var output = [];
  var valueList = [];
  for (var i = 1; i < arguments.length; i++) {
    valueList.push(arguments[i]);
  }
  for (var i = 0; i < list.length; i++) {
    if (valueList.indexOf(list[i]) === -1) {
      output.push(list[i]);
    }
  }
  return output;
}

_.zip = function (arrays) {

  var output = [];
  if (_.isNull(arrays) || _.isUndefined(arrays) || _.isEmpty(arrays)) {
    return output;
  }
  var arr = _.toArray(arguments);
  var maxLength = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].length > maxLength) {
      maxLength = arr[i].length;
    }
  }
  for (var i = 0; i < maxLength; i++) {
    var cur = [];
    for (var j = 0; j < arr.length; j++) {
      if (_.isUndefined(arr[j][i])) {
        cur.push(undefined);
      } else {
        cur.push(arr[j][i]);
      }
    }
    output.push(cur);
  }
  return output;
}

_.unzip = function (array) {
  var output = [];
  if (_.isNull(array) || _.isUndefined(array) || _.isEmpty(array)) {
    return output;
  }
  for (var i = 0; i < array[0].length; i++) {
    var cur = [];
    for (var j = 0; j < array.length; j++) {
      if (_.isUndefined(array[j][i])) {
        cur.push(undefined);
      } else {
        cur.push(array[j][i]);
      }
    }
    output.push(cur);
  }
  return output;
}

_.chunk = function (array, length) {
  var output = [];
  if (_.isNull(array) || _.isUndefined(array) || _.isEmpty(array) || _.isUndefined(length) || length === -1 || length === 0) {
    return output;
  }
  while (!_.isEmpty(array)) {
    var cur = array.splice(0, length);
    output.push(cur);
  }
  return output;
}

_.keys = function (object) {
  if (_.isNull(object) || _.isUndefined(object) || _.isString(object)) {
    return [];
  }
  var output = Object.keys(object);
  return output;
}

_.allKeys = function (object) {
  if (_.isNull(object) || _.isUndefined(object) || _.isString(object)) {
    return [];
  }
  var output = [];
  for (const prop in object) {
    output.push(prop);
  }
  return output;
}

_.values = function (object) {
  if (_.isNull(object) || _.isUndefined(object) || _.isString(object)) {
    return [];
  }
  var output = [];
  for (const prop in object) {
    output.push(object[prop]);
  }
  return output;
}

_.mapObject = function (object, iteratee, context) {
  var output = new Object();
  if (!_.isArray(object)) {
    for (const prop in object) {
      if (_.isObject(object[prop])) {
        output = _.mapObject.call(context, object[prop], iteratee);
      } else {
        output[prop] = iteratee.call(context, object[prop], prop, object);
      }

    }
  } else {

    for (var i = 0; i < object.length; i++) {
      output[i] = iteratee.call(context, object[i], i, object);
    }

  }
  return output;
}

_.pairs = function (object) {
  var output = [];
  for (const prop in object) {
    var cur = [];
    cur.push(prop);
    cur.push(object[prop]);
    output.push(cur);
  }
  return output;
}

_.invert = function (object) {
  var output = new Object();
  for (const prop in object) {
    output[object[prop]] = prop;
  }
  return output;
}

_.create = function (prototype, props) {
  if (!_.isObject(prototype)) {
    if (!_.isArray(prototype)) {
      return {};
    } else {
      return new Array();
    }
  }
  var output = Object.create(prototype);
  for (const prop in props) {
    output[prop] = props[prop];
  }
  return output;
}

_.functions = function (object) {
  var output = [];
  for (const prop in object) {
    if (_.isFunction(object[prop])) {
      output.push(prop);
    }
  }
  output.sort();
  return output;
}

_.findKey = function (object, iteratee, context) {
  for (const prop in object) {
    if (_.isFunction(iteratee) && iteratee.call(context, object[prop], prop, object)) {
      return prop;
    } else if (_.isString(iteratee) && !!object[prop][iteratee]) {
      return prop;
    }
  }
}

_.extend = function (destination, sources) {
  sources = Array.prototype.slice.call(arguments);
  sources.splice(0, 1);
  if (_.isNull(destination) || _.isUndefined(destination)) {
    return destination;
  }
  for (var i = 0; i < sources.length; i++) {
    for (const prop in sources[i]) {
      destination[prop] = sources[i][prop];
    }
  }
  return destination;
}

_.extendOwn = function (destination, sources) {
  sources = Array.prototype.slice.call(arguments);
  sources.splice(0, 1);
  if (_.isNull(destination) || _.isUndefined(destination)) {
    return destination;
  }
  for (var i = 0; i < sources.length; i++) {
    for (const prop in sources[i]) {
      if (sources[i].hasOwnProperty(prop)) {
        destination[prop] = sources[i][prop];
      }

    }
  }
  return destination;
}

_.assign = _.extendOwn;

/*Not finished*/
_.pick = function (object, keys) {
  var args = Array.prototype.slice.call(arguments);
  args.splice(0, 1);
  var output = new Object();
  if (_.isObject(object) || _.isArray(object)) {
    if (_.isFunction(keys)) {
      for (const prop in object) {
        if (keys(prop, object[prop], object)) {
          output[prop] = object[prop];
        }
      }
    } else if (_.isNumber(args[0])) {
      for (var i = 0; i < args.length; i++) {
        if (args[i] < object.length) {
          output[args[i]] = object[args[i]];
        }
      }
    } else {
      for (const prop in object) {
        for (var i = 0; i < args.length; i++) {
          if (args[i].indexOf(prop) !== -1) {
            output[prop] = object[prop];
            break;
          }
        }
      }
    }
  } else if (_.isUndefined(object) || _.isNull(object)) {
    return output;
  } else {
    var type = Object.prototype.toString.call(object);
    type = type.slice(8);
    type = type.slice(0, -1);
    var oriType = new window[type];
    for (var i = 0; i < args.length; i++) {
      if (args[i] in oriType) {
        output[args[i]] = oriType[args[i]];
      }

    }
  }
  return output;
}

_.defaults = function (object, defaults) {
  var args = Array.prototype.slice.call(arguments);
  args.splice(0, 1);
  if (_.isUndefined(object) || _.isNull(object)) {
    object = new Object();
  }
  for (var i = 0; i < args.length; i++) {
    for (const prop in args[i]) {
      if (!object.hasOwnProperty(prop)) {
        object[prop] = args[i][prop];
      }
    }
  }

  return object;
}

_.has = function (object, key) {
  var args = key;
  var output = false;
  if (_.isUndefined(object) || _.isNull(object)) {
    return output;
  }
  if (_.isArray(args)) {
    for (var i = 0; i < args.length; i++) {
      if (Object.prototype.hasOwnProperty.call(object, args[i])) {
        output = true;
        if (_.isObject(object[args[i]])) {
          output = _.has(object[args[i]], args);
        }
      }
    }
  } else {
    if (Object.prototype.hasOwnProperty.call(object, args)) {
      output = true;
    }
  }
  return output;
}

_.isSymbol = function (object) {
  return Object.prototype.toString.call(object) === "[object Symbol]";
}

_.isMap = function (object) {
  return Object.prototype.toString.call(object) === "[object Map]";
}

_.property = function (path) {
  return function (object) {
    if (_.isUndefined(object) || _.isNull(object) || _.isEmpty(path)) {
      return undefined;
    }
    if (_.isArray(path)) {
      var cur = object;
      for (var i = 0; i < path.length; i++) {
        if (!_.isUndefined(cur) && !_.isNull(cur)) {
          cur = cur[path[i]];
        } else {
          return undefined;
        }
      }
      return cur;
    } else {
      return object[path];
    }
  }
}

_.propertyOf = function (object) {
  return function (path) {
    if (_.isUndefined(object) || _.isNull(object) || _.isEmpty(path)) {
      return undefined;
    }
    if (_.isArray(path)) {
      var cur = object;
      for (var i = 0; i < path.length; i++) {
        if (!_.isUndefined(cur) && !_.isNull(cur)) {
          cur = cur[path[i]];
        } else {
          return undefined;
        }
      }
      return cur;
    } else {
      return object[path];
    }
  }
}

_.isWeakMap = function (object) {
  return Object.prototype.toString.call(object) === "[object WeakMap]";
}

_.isSet = function (object) {
  return Object.prototype.toString.call(object) === "[object Set]";
}

_.noop = function () {
  return undefined;
}

_.random = function (min, max) {
  if (arguments.length !== 2) {
    max = min;
    min = 0
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

_.uniqueId = function (prefix) {
  var output = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  if (!_.isUndefined(prefix)) {
    output = prefix + output;
  }
  return output;
}

_.unescape = function (string) {
  var text = document.createElement('text');
  text.innerHTML = string;
  return text.innerText;
}

_.escape = function (string) {
  if (_.isUndefined(string) || _.isNull(string)) {
    return "";
  }
  // List of HTML entities for escaping.
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };

  // Regex containing the keys listed immediately above.
  var htmlEscaper = /[&<>"'\/]/g;
  // Escape a string for HTML interpolation.
  return string.replace(htmlEscaper, function (match) {
    return htmlEscapes[match];
  });
}

_.result = function (object, property, defaultValue) {
  if (_.isUndefined(object) || _.isNull(object)) {
    if (_.isFunction(defaultValue)) {
      return defaultValue.call(object);
    }
    return defaultValue;
  }
  //Check for ownProperty and inherited ones
  var hasIt = false;
  var parent;
  var symbolKeys = Object.getOwnPropertySymbols(object);
  //For not nested object
  if (!_.isArray(property)) {
    for (const prop in object) {
      if (prop === property) {
        hasIt = true;
        break;
      }
    }
    if (symbolKeys.length !== 0) {
      for (var i = 0; i < symbolKeys.length; i++) {
        if (symbolKeys[i] === property) {
          hasIt = true;
          break;
        }
      }
    }
  }
  //For nested object
  else {
    var cur = object;
    for (var i = 0; i < property.length; i++) {
      if (cur.hasOwnProperty(property[i]) && !_.isUndefined(cur[property[i]])) {
        if (_.isFunction(cur[property[i]]) && i !== property.length) {
          parent = cur;
          cur = cur[property[i]].call(parent);
        } else {
          parent = cur;
          cur = cur[property[i]];
        }
        hasIt = true;
      }
    }

  }
  if (!hasIt || (!_.isArray(property) && _.isUndefined(object[property]))) {
    if (_.isFunction(defaultValue)) {
      return defaultValue.call(object);
    }
    return defaultValue;
  } else {
    if (!_.isArray(property) && _.isFunction(object[property])) {
      return object[property].call(object);
    } else if (cur) {
      if (_.isFunction(cur)) {
        return cur.call(parent);
      }
      return cur;
    } else {
      return object[property];
    }
  }
}

//Not finished
_.bind = function (func, object, args) {
  var arg = _.toArray(arguments).slice(2);
  return function () {
    var cur = _.partial.apply(_, [func].concat(arg));
    return cur.apply(object, arguments);
  }
}

_.memoize = function (func, hashFunc) {
  var cache = {};
  var newFunc = function () {
    cache = newFunc.cache;
    var firstArg = arguments[0];
    var curKey = _.isUndefined(hashFunc) ? undefined : hashFunc.apply(this, arguments);
    if (cache.hasOwnProperty(firstArg)) {
      return cache[firstArg];
    } else if (cache.hasOwnProperty(curKey)) {
      return cache[curKey];
    } else {
      if (_.isUndefined(hashFunc)) {
        cache[firstArg] = func.apply(this, arguments);
        return cache[firstArg];
      } else {
        var key = hashFunc.apply(this, arguments);
        cache[key] = func.apply(this, arguments);
        return cache[key];
      }
    }
  }
  newFunc.cache = cache;
  return newFunc;
}

_.delay = function (func, wait, argument) {
  return setTimeout.apply(window, arguments);
}

_.once = function (func) {
  var executed = false;
  var newFunc = function () {
    if (!executed) {
      executed = true;
      newFunc.result = func();
    }
    return newFunc.result;
  }
  return newFunc;
}

_.after = function (count, func) {
  var cnt = 0;
  return function () {
    if (cnt !== count) {
      cnt++;
    }
    if (cnt === count) {
      return func();
    }
  }
}

_.before = function (count, func) {
  var cnt = 0;
  var newFunc = function () {
    if (cnt < count - 1) {
      newFunc.result = func();
      cnt++;
      return newFunc.result;
    }
    if (cnt >= count - 1) {
      return newFunc.result;
    }
  }
  return newFunc;
}

_.wrap = function (func, wrapper) {
  var newFunc = function () {
    return wrapper(_.bind.apply(this, [func].concat(_.toArray(arguments))));
  }
  return newFunc;
}

_.debounce = function (func, wait, immediate) {
  if (!immediate) {
    var setId = window.setTimeout(func, wait);
    var newFunc = function () {
      newFunc.cancel = function () {
        window.clearTimeout(setId);
      };
      newFunc.cancel();
      var args = arguments;
      setId = window.setTimeout(function () {
        func.apply(this, args);
      }.bind(this), wait);
    }
    return newFunc;
  } else {
    var stillWaiting = false;
    var setId;
    var cachedFirstTimeResult;
    var newFunc = function () {
      newFunc.cancel = function () {
        if (setId) {
          stillWaiting = false;
          cachedFirstTimeResult = undefined;
          window.clearTimeout(setId);
        }
      };
      if (!stillWaiting) {
        stillWaiting = true;
        setId = window.setTimeout(function () {
          stillWaiting = false;
        }, wait);
        cachedFirstTimeResult = func.apply(this, arguments);
      } else {
        window.clearTimeout(setId);
        setId = window.setTimeout(function () {
          stillWaiting = false;
        }, wait);
      }

      return cachedFirstTimeResult;
    }
    return newFunc;
  }
}