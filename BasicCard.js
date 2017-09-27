var fs = require("fs");
module.exports = BasicCard;
function BasicCard(pfront,pback) {
	this.front = pfront;
	this.back  = pback;
	this.type  = 'basic';
	var data = {
            front: this.front,
            back: this.back,
            type: "basic",
        };
}
