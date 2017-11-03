//Collect list of zone IDs
var zones = prompt("Paste Column of Zone IDs Here: ");
var output = prompt("Name output file: ");
output += ".csv";

var zoneIdArray = zones.split(" ");

var zoneArrayLength = zoneIdArray.length;

var n = "\n";

for(var i = 0; i < zoneArrayLength; i++){
	var macro = "CODE:";
	macro += "URL GOTO=http://adcenter.lijit.com/adminpublisher/search/zone/" + zoneIdArray[i] + n;
	macro += "ADD !EXTRACT " + zoneIdArray[i] + n;
	macro += "TAG POS=1 TYPE=TEXTAREA FORM=ID:ZoneForm ATTR=ID:passbacktag EXTRACT=TXT" + n;
	macro += "SAVEAS TYPE=EXTRACT FOLDER=/Users/miwilson/desktop FILE=" + output;
	iimPlay(macro); 
}



/*
VERSION BUILD=8970419 RECORDER=FX

CMDLINE !DATASOURCE TownNews_Passbacks.csv
SET !DATASOURCE_COLUMNS 1
SET !DATASOURCE_LINE {{!LOOP}}

URL GOTO=http://adcenter.lijit.com/adminpublisher/search/zone/{{!COL1}}

ADD !EXTRACT {{!COL1}}
TAG POS=1 TYPE=TEXTAREA FORM=ID:ZoneForm ATTR=ID:passbacktag EXTRACT=TXT
SAVEAS TYPE=EXTRACT FOLDER=/Users/miwilson/desktop FILE=TownNewsPassbacks.csv
*/