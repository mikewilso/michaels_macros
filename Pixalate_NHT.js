//imacros-js:showsteps no
var alias = "miwilson";

var sites;
var outputFileName;
var siteArray;
var siteArrayLength;

function pasteTheSites() {
	sites = prompt("Paste column of URLs here: ");
	if (sites.length === 0){
		alert("You need at least one site, dawg.  You're giving me nothing.")
		pasteTheSites();
    }
    siteArray = sites.split(" ");
    siteArrayLength = siteArray.length;
}


function cleanURL(url){
	var site_holder;
	site_holder = url;
	site_holder = site_holder.toLowerCase();

	if(site_holder.includes("http://")){
		site_holder = site_holder.replace(/http:\/\//i, "");
	}
	
	if(site_holder.includes("https://")){
		site_holder = site_holder.replace(/https:\/\//i, "");
	}
	
	if(site_holder.includes("www.")){
		site_holder = site_holder.replace(/www\./i, "");
	}
	
	if(site_holder.indexOf("/") != -1){
		var end = site_holder.indexOf("/");
		site_holder = site_holder.slice(0, end);
	}

	return site_holder;
}

function nameTheFile(){
	outputFileName = prompt("Create file name: ");
	if (outputFileName.length === 0){
		alert("Name of file must be a least one character, c'mon.");
		nameTheFile();
	}
	else if(outputFileName.indexOf(" ") != -1){
		alert("Please do not use spaces in the name, thanks!  Rename file without spaces.");
		nameTheFile();
	}
	else return;
}

//Clean the URLs in site array
for(var m = 0; m < siteArrayLength; m++){
	siteArray[m] = cleanURL(siteArray[m]);
}

function runMacro(){
    for(var i = 0; i < siteArrayLength; i++){
        var macro = "CODE:";
        macro += "SET !ERRORIGNORE YES" + "\n";
        macro += "URL GOTO=https://ratings2.pixalate.com/domain-details/" + siteArray[i] + "/GLOBAL/desktop/201705" + "\n";
        macro += "WAIT SECONDS = 2" + "\n";
        macro += "ADD !EXTRACT " + siteArray[i] + "\n";
        macro += "TAG POS=1 TYPE=P ATTR=CLASS:big-number EXTRACT=TXT" + "\n";
        macro += "SAVEAS TYPE=EXTRACT FOLDER=/Users/" + alias + "/desktop FILE=" + outputFileName + "\n";
        iimPlay(macro);
    }
}
pasteTheSites();
nameTheFile();
runMacro();

/*
' Pixalate NTH% Grab

VERSION BUILD=8031994
TAB T=1

CMDLINE !DATASOURCE test_nht.csv
SET !DATASOURCE_COLUMNS 1
SET !ERRORIGNORE YES
SET !DATASOURCE_LINE {{!LOOP}}

URL GOTO=https://ratings2.pixalate.com/domain-details/{{!COL1}}/GLOBAL/desktop/201705
WAIT SECONDS = 2

ADD !EXTRACT {{!COL1}}
TAG POS=1 TYPE=P ATTR=CLASS:big-number EXTRACT=TXT
SAVEAS TYPE=EXTRACT FOLDER=/Users/miwilson/desktop FILE=NHT_TEST2.csv

' Author: Michael Wilson
*/