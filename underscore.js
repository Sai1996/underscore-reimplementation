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
  if((typeof object === "object" || typeof object === "function") && object != null){
      return true;
  }
  return false;
}

_.isEmpty = function (object) {
  if(Object.prototype.toString.call(object) === "[object String]" || Object.prototype.toString.call(object) === "[object Array]"){
    return object.length === 0;
  }
  else{
    var hasNoProp = true;
    for(const prop in object){
      if(object.hasOwnProperty(prop)){
        hasNoProp = false;
      }
    }
    return hasNoProp;
  }
}

_.isMatch = function (object,properties) {
  var isProp = true;
  
  if(_.isEmpty(properties) || _.isNull(properties)){
    return isProp;
  }
  
  if(Object.prototype.toString.call(object) === "[object Object]"){
    for(const prop in properties){

      if (object[prop] !== properties[prop]){
        isProp = false;
      }
      else if (!object.hasOwnProperty(prop)){
        if(properties[prop] === undefined){
          isProp = false;
        }
        else{
          var pto = object.constructor.prototype;
          if(!pto.hasOwnProperty(prop) || pto[prop] !== properties[prop]){
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
_.isFinite = function(object) {
  if(Object.prototype.toString.call(object) === "[object Number]" && object != Infinity && object != -Infinity && !isNaN(object)){
      return true;
  }
  else if(Object.prototype.toString.call(object) === "[object Null]" || object === ""){
    return false;
  }
  else if(Object.prototype.toString.call(object) === "[object String]"){
    object = Number(object);
    if(Object.prototype.toString.call(object) === "[object Number]" && object != Infinity && object != -Infinity && !isNaN(object)){
      return true;
    }
    return false;
  }
  else{
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
  if (object instanceof Array && other instanceof Array){
    if (object.length == other.length){
      var same = true;
      for (var i = 0; i < object.length; i++){
        if (!_.isEqual(object[i],other[i])){
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

    if (String(object) === String(other)){
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

_.isElement = function(object){
  return object instanceof Element || Object.prototype.toString.call(object) === "[object HTMLDivElement]";
}

_.each = function (list, iteratee, context) {
  if(typeof iteratee == "function"){
    if(Object.prototype.toString.call(list) === "[object Object]"){
      for(const prop in list){
        if(list.hasOwnProperty(prop)){
          iteratee.call(context,list[prop],prop,list);
        }
      }
    }
    else{
      if(list !== null){
        for (var i = 0; i < list.length; i++){
          iteratee.call(context,list[i],i,list);
        }
      }
    }  
  }
  return list;
}

_.forEach = _.each;

_.contains = function(list, value, fromIndex) {
  if(Object.prototype.toString.call(list) === "[object Array]"){
    return list.indexOf(value,fromIndex) !== -1;
  }
  else{
    return list.indexOf(value) !== -1;
  }
}

_.includes = _.contains;
_.include = _.contains;

_.partial = function(func, arguments) {
  if (arguments[0] === "_"){

  }
  else{
    return func.call(arguments,func.arguments);
  }
}

_.toArray = function (list) {
  return Array.from(list);
}

_.map = function (list, iteratee, context) {
  var output = [];
  if(Object.prototype.toString.call(list) === "[object Object]"){
    for(const prop in list){
      if(iteratee.call(context, list[prop], prop, list) !== undefined){
        output.push(iteratee.call(context, list[prop], prop, list));
      }
     
    }
  }
  else if(Object.prototype.toString.call(list) === "[object String]" || Object.prototype.toString.call(list) === "[object Array]")
  for(var i = 0; i < list.length; i++){
    if(iteratee.call(context, list[i], i, list) !== undefined){
      output.push(iteratee.call(context, list[i], i, list));
    }
    
  }
  return output;
}