var fs = require("fs");
module.exports = BasicCard;
function BasicCard(pfront,pback) {
	this.front = pfront;
	this.back  = pback;
}
