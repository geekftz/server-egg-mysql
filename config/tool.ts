function hump2Underline(word) {
  return word.replace(/([A-Z])/g, '_$1').toLowerCase();
}

export const toUnderline = (obj: any) => {
  if (obj instanceof Array) {
    obj.forEach(function (v, i) {
      toUnderline(v);
    });
  } else if (obj instanceof Object) {
    Object.keys(obj).forEach(function (key) {
      var newKey = hump2Underline(key);
      if (newKey !== key) {
        obj[newKey] = obj[key];
        delete obj[key];
      }
      toUnderline(obj[newKey]);
    });
  }
  return obj;
};
