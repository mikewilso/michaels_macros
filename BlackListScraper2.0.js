﻿//BLACK LIST SCRAPER

var sovrnAlias = "miwilson";

var Advertiser_Domain_Blacklist = true;

var whichList;
var erroredOut;

var numberOfEntries = prompt("How many entries? (guess well above): ");

var outputFileName = prompt("Choose an output file name: ");
outputFileName += ".csv";

var confirmed = confirm("This all look right?" + "\n\n" + "Number of Entries (guessed): " + numberOfEntries + "\n\n" + "Output File Name: " + outputFileName);

if(!confirmed){
	alert("Please try again, thanks!");
	throw new Error("Try again!");
}

if (Advertiser_Domain_Blacklist){
	whichList = "block_badv_response";
}
else {whichList = "block_badv";}

for (i = 1; i < numberOfEntries; i++){
	var macro = "CODE:";
	macro += "SET ERRORIGNORE NO" + "\n";
	macro += "TAG POS=" + i + " TYPE=INPUT:TEXT FORM=ID:block_badv_response ATTR=NAME:badvText[] EXTRACT=TXT" + "\n";
	iimPlay(macro);
	var lastExtract = iimGetLastExtract();

	if (lastExtract != "#EANF#"){
		var macro2 = "CODE:";
		macro2 += "ADD !EXTRACT " + lastExtract + "\n";
		macro2 += "SAVEAS TYPE=EXTRACT FOLDER=/Users/" + sovrnAlias + "/Desktop FILE=" + outputFileName + "\n";
		iimPlay(macro2);
	}
	else {break;}
}

alert("All done!");