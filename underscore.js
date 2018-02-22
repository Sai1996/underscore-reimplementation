var _ = function(obj) {
  if (obj instanceof _) return obj;
  if (!(this instanceof _)) return new _(obj);
  this._wrapped = obj;
};

window._ = _;

_.reduce = function(list,iteratee,memo,context){
  var result = (memo === undefined ? list[0] : memo);
  if (list !== null){
      for (var i = (memo === undefined ? 1 : 0); i < list.length; i++)
    {
     result = iteratee.call(context,result,list[i],i,list);
    }
  }
  return result;
}
_.inject = _.reduce;
_.foldl = _.reduce;

_.reduceRight = function(list,iteratee,memo,context){
  var result = (memo === undefined ? list[list.length - 1] : memo);
  if (list !== null){
      for (var i = (memo === undefined ? list.length - 2 : list.length - 1); i >= 0; i--)
    {
      result = iteratee.call(context,result,list[i],i,list);
    }
  }
  return result;
}

_.findIndex = function(array,predicate,context){
  var found = -1;
  if (typeof predicate == "function")
  {
    for (var i = 0; i < array.length; i++)
  {
    if (predicate.call(context,array[i],i,array))
    {
      found = i;
      break;
    }
  }
  }
  return found;
}

_.findLastIndex = function(array,predicate,context){
  var found = -1;
  if (typeof predicate == "function")
  {
    for (var i = array.length - 1; i >= 0; i--)
    {
      if (predicate.call(context,array[i],i,array))
      {
        found = i;
        break;
      }
    }
  }
  return found;
}

