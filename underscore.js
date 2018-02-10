var _ = function(obj) {
  if (obj instanceof _) return obj;
  if (!(this instanceof _)) return new _(obj);
  this._wrapped = obj;
};

window._ = _;

_.findIndex = function(array,predicate){
  var found = -1;
  if (typeof predicate == "function")
  {
    for (var i = 0; i < array.length; i++)
  {
    if (predicate(array[i]))
    {
      found = i;
      break;
    }
  }
  }
  return found;
}