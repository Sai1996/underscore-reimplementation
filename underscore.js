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
  var arr = Array.prototype.slice.call(arguments);
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
  if ((typeof object == "number" || typeof object == "object") && isNaN(object)) {
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
  if ((typeof object === "object" || typeof object === "function") && object != null) {
    return true;
  }
  return false;
}

_.isEmpty = function (object) {
  if (Object.prototype.toString.call(object) === "[object String]" || Object.prototype.toString.call(object) === "[object Array]") {
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
  if (Object.prototype.toString.call(object) === "[object Number]" && object != Infinity && object != -Infinity && !isNaN(object)) {
    return true;
  } else if (Object.prototype.toString.call(object) === "[object Null]" || object === "") {
    return false;
  } else if (Object.prototype.toString.call(object) === "[object String]") {
    object = Number(object);
    if (Object.prototype.toString.call(object) === "[object Number]" && object != Infinity && object != -Infinity && !isNaN(object)) {
      return true;
    }
    return false;
  } else {
    return false;
  }
}

_.isEqual = function (object, other) {
  var testIsNaN = function (a, b) {
    if (typeof a == "number" && typeof b == "number" && isNaN(a) && isNaN(b)) {
      return true;
    }
    return false;
  }
  if (object instanceof Array && other instanceof Array) {
    if (object.length == other.length) {
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
      return true;
    }
    return false;
  }
}
_.findIndex = function (array, predicate, context) {
  var found = -1;
  if (typeof predicate == "function") {
    for (var i = 0; i < array.length; i++) {
      if (predicate.call(context, array[i], i, array)) {
        found = i;
        break;
      }
    }
  }
  return found;
}

_.findLastIndex = function (array, predicate, context) {
  var found = -1;
  if (typeof predicate == "function") {
    for (var i = array.length - 1; i >= 0; i--) {
      if (predicate.call(context, array[i], i, array)) {
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
  if (typeof iteratee == "function") {
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
  if (Object.prototype.toString.call(list) === "[object Array]") {
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
  } else if (Object.prototype.toString.call(list) === "[object String]" || Object.prototype.toString.call(list) === "[object Array]")
    for (var i = 0; i < list.length; i++) {
      if (Object.prototype.toString.call(iteratee) === "[object Function]" && iteratee.call(context, list[i], i, list) !== undefined) {
        output.push(iteratee.call(context, list[i], i, list));
      } else {
        output.push(list[i][iteratee]);
      }
    }
  return output;
}

_.initial = function (array, n) {
  var args = Array.prototype.slice.call(arguments);
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

_.every = function (list, predicate, context) {
return true;
}
_.identity = function (value) {
  return value;
}