var fs = require("fs");
module.exports = ClozeCard;
function ClozeCard(text,cloze) {
    this.fullText = text
    this.cloze = cloze;
    this.type  = "clozen";
}