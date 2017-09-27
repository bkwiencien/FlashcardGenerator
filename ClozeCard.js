var fs = require("fs");
module.exports = ClozeCard;
function ClozeCard(text,cloze,partial) {
    this.fullText = text
    this.cloze = cloze;
    this.partial = partial;
    this.type  = "clozen";
    var data = {
            fullText: this.fullText,
            cloze: this.cloze,
            partial: this.partial,
            type: "clozen",
        };
    this.logit = function() {
        fs.appendFile("log.txt", JSON.stringify(data) + ';\n', "utf8", function(error) {
            if (error) {
                console.log(error);
            }
        });
    };
}