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
    this.logit = function() {
        fs.appendFile("log.txt", JSON.stringify(data) + ';', "utf8", function(error) {
            if (error) {
                console.log(error);
            }
        });
    };
    
}
