//IAS MACRO 3.0


//CONFIGURE OUTPUT FILEPATH BY ADDING YOUR SOVRN EMAIL NAME BELOW BETWEEN QUOTES
var employeeUsername = "miwilson";

var i;
var sites;
var confirmed;
var siteArray;
var siteArrayLength;
var outputFileName;
var headers;

sites = prompt("Paste column of URLs here: ");
siteArray = sites.split(" ");
siteArrayLength = siteArray.length;
outputFileName = prompt("Create file name: ")
outputFileName += ".csv";

function addHeaders(){
	iimDisplay("Adding Headers...");
	var headerMacro = "CODE:";
	headerMacro += "SET !VAR0 SITE" + "\n";
	headerMacro += "ADD !EXTRACT {{!VAR0}}" + "\n";
	headerMacro += "SET !VAR1 RAW_DATA" + "\n";
	headerMacro += "ADD !EXTRACT {{!VAR1}}" + "\n";
	headerMacro += "SET !VAR2 VIOLENCE" + "\n";
	headerMacro += "ADD !EXTRACT {{!VAR2}}" + "\n";
	headerMacro += "SET !VAR3 DRUGS" + "\n";
	headerMacro += "ADD !EXTRACT {{!VAR3}}" + "\n";
	headerMacro += "SET !VAR4 ALCOHOL" + "\n";
	headerMacro += "ADD !EXTRACT {{!VAR4}}" + "\n";
	headerMacro += "SET !VAR5 OFFENSIVE" + "\n";
	headerMacro += "ADD !EXTRACT {{!VAR5}}" + "\n";
	headerMacro += "SET !VAR6 DOWNLOAD" + "\n";
	headerMacro += "ADD !EXTRACT {{!VAR6}}" + "\n";
	headerMacro += "SET !VAR7 ADULT" + "\n";
	headerMacro += "ADD !EXTRACT {{!VAR7}}" + "\n";
	headerMacro += "SET !VAR8 SAM" + "\n";
	headerMacro += "ADD !EXTRACT {{!VAR8}}" + "\n";
	headerMacro += "SET !VAR9 HATE" + "\n";
	headerMacro += "ADD !EXTRACT {{!VAR9}}" + "\n";
	headerMacro += "SAVEAS TYPE=EXTRACT FOLDER=/Users/" + employeeUsername + "/Desktop FILE=" + outputFileName + "\n";
	iimPlay(headerMacro);
};

confirmed = confirm("Number of sites: " + siteArrayLength + "\n" + "Output file name: " + outputFileName + "\n\n" + "Is this correct?");

if (!confirmed) {
	throw new Error("Please try again! Thanks!");
};

addHeaders();

for (i = 0; i < siteArrayLength; i++) {
	var currentSite = siteArray[i];
	var macro = "CODE:";
	macro += "URL GOTO=https://api.adsafeprotected.com/db2/client/12113/itgrl?adsafe_url=" + currentSite + "\n";
	macro += "SET !VAR9 " + currentSite + "\n";
	macro += "ADD !EXTRACT {{!VAR9}}" + "\n";
	macro += "TAG POS=1 TYPE=HTML ATTR=* EXTRACT=TXT" + " \n";
	macro += "SET !VAR0 {{!EXTRACT}}" + "\n";
	macro += "SET !VAR8 EVAL(\"var violence=\\\'{{!VAR0}}\\\'; if(violence.includes(\\\"vio\\\")){violence=violence.match(/\\\"vio\\\":\\d+/)[0];} else{violence=0;}; violence;\")" + "\n";
	macro += "ADD !EXTRACT {{!VAR8}}" + "\n";
	macro += "SET !VAR1 EVAL(\"var drugs=\\\'{{!VAR0}}\\\'; if(drugs.includes(\\\"drg\\\")){drugs=drugs.match(/\\\"drg\\\":\\d+/)[0];} else{drugs=0;}; drugs;\")" + "\n";
	macro += "ADD !EXTRACT {{!VAR1}}" + "\n";
	macro += "SET !VAR2 EVAL(\"var alcohol=\\\'{{!VAR0}}\\\'; if(alcohol.includes(\\\"alc\\\")){alcohol=alcohol.match(/\\\"alc\\\":\\d+/)[0];} else{alcohol=0;}; alcohol;\")" + "\n";
	macro += "ADD !EXTRACT {{!VAR2}}" + "\n";
	macro += "SET !VAR3 EVAL(\"var offensive=\\\'{{!VAR0}}\\\'; if(offensive.includes(\\\"off\\\")){offensive=offensive.match(/\\\"off\\\":\\d+/)[0];} else{offensive=0;}; offensive;\")" + "\n";
	macro += "ADD !EXTRACT {{!VAR3}}" + "\n";
	macro += "SET !VAR4 EVAL(\"var download=\\\'{{!VAR0}}\\\'; if(download.includes(\\\"dlm\\\")){download=download.match(/\\\"dlm\\\":\\d+/)[0];} else{download=0;}; download;\")" + "\n";
	macro += "ADD !EXTRACT {{!VAR4}}" + "\n";
	macro += "SET !VAR5 EVAL(\"var adult=\\\'{{!VAR0}}\\\'; if(adult.includes(\\\"adt\\\")){adult=adult.match(/\\\"adt\\\":\\d+/)[0];} else{adult=0;}; adult;\")" + "\n";
	macro += "ADD !EXTRACT {{!VAR5}}" + "\n";
	macro += "SET !VAR6 EVAL(\"var susp=\\\'{{!VAR0}}\\\'; if(susp.includes(\\\"sam\\\")){susp=susp.match(/\\\"sam\\\":\\d+/)[0];} else{susp=0;}; susp;\")" + "\n";
	macro += "ADD !EXTRACT {{!VAR6}}" + "\n";
	macro += "SET !VAR7 EVAL(\"var hate=\\\'{{!VAR0}}\\\'; if(hate.includes(\\\"hat\\\")){hate=hate.match(/\\\"hat\\\":\\d+/)[0];} else{hate=0;}; hate;\")" + "\n";
	macro += "ADD !EXTRACT {{!VAR7}}" + "\n";
	macro += "SAVEAS TYPE=EXTRACT FOLDER=/Users/" + employeeUsername + "/Desktop FILE=" + outputFileName + "\n";
	iimDisplay("Currently grabbing the goodies.\n\nCurrently on site " + i + " of " + siteArrayLength + "\n\nSite: " + currentSite);
	iimPlay(macro);
}

iimDisplay("All done!\n\nOutput file named " + outputFileName + " downloaded to " + employeeUsername + "\'s desktop.");


//Author: Michael Wilson