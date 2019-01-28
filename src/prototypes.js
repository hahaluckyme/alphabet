String.prototype.stripLeft = function(charlist) {
  return this.replace(new RegExp("^[" + charlist + "]+"), "");
};

String.prototype.stripRight = function(charlist) {
  return this.replace(new RegExp("[" + charlist + "]+$"), "");
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
