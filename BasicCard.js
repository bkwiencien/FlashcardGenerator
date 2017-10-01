var fs = require("fs");
var os = require("os");
var myOs = "";
var eline = "\n"; //default for mac prototypoe will check what os in use
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
        fs.appendFile("log.txt", JSON.stringify(data) + "@" + eline, "utf8", function(error) {
            if (error) {
                console.log(error);
            }
        });
    };
    
}
