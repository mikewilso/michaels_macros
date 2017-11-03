//imacros-js:showsteps no
//--------------------------------------------------------------------------------------------------------------

//                                              TAGINATOR 2.0

//                                          Author: Michael Wilson

//--------------------------------------------------------------------------------------------------------------

//Change alias to your own alias below
var alias = "miwilson";

//--------------------------------------------------------------------------------------------------------
var affiliateId;
var priceFloor;
var tagNames, tagNamesArray;
var efp, efpToggle;
var fileName;
var isHeader;
var newLine = "\n";
var aihRevShare = 78;

function getFileName(){
	iimDisplay("Requesting new file name...");
	fileName = prompt("Please input a name for the output file: ");
	if(fileName.indexOf(" ") != -1){
		alert("Please do not use spaces in the name, thanks!  Rename file without spaces.");
		getFileName();
	}
	else return fileName += ".csv";
}

//Asks user for affiliate ID, validates that it is a number
function getAffiliateId(){
	iimDisplay("Requesting Affiliate ID...");
	affiliateId = prompt("Please input publisher's Affiliate ID: ");
	if(isNaN(affiliateId)){
		alert("Something isn\'t right about that, please input valid Affiliate ID.");
		getAffiliateId();
	}
	else return;
}

function removeBlankNames(arr){
	var noSpacesArray = [];
	for(var i = 0; i < arr.length; i++){
		if(arr[i].length == 0){
			continue;
		}
		else noSpacesArray.push(arr[i]);
	}
	return noSpacesArray;
}

//Asks for space delimited string of tag names from user and validates through tag size string existence/validity
function getAndVerifyTagNames(){
	iimDisplay("Requesting tag names...");
	var invalidNamesArray = [];
	tagNames = prompt("Copy and paste column of tag names here: ");
	tagNamesArray = removeBlankNames(tagNames.split(" "));
	
	function allNamesContainSize(arr){
		iimDisplay("Verifying tag names...");
		var arrLength = arr.length;
		for(var i = 0; i < arrLength; i++){
			var tagNameStr = arr[i];
			if(!tagNameStr.match(/\d+[xX]\d+/)){
				invalidNamesArray.push(tagNameStr + " -- needs size in name");
			}
			else if(!getSizeId(tagNameStr.match(/\d+[xX]\d+/)[0].toLowerCase())){
				invalidNamesArray.push(tagNameStr + " -- invalid size detected");
			}
			else continue;
	}
		return(invalidNamesArray.length == 0);
	}
	if(allNamesContainSize(tagNamesArray)){
		alert("All tag names valid! Yay!");
		return;
		}
	else {
		var badNameString = "";
		for(var j = 0; j < invalidNamesArray.length; j++){
			badNameString += "• " + invalidNamesArray[j] + newLine;
		}
		alert("These names seem to be missing sizes or the sizes are invalid: " + newLine + newLine + "INVALID TAG NAMES" + newLine +
			badNameString + newLine + "Please add the correct size to the name(s) and try again!");
		getAndVerifyTagNames();
	}
}
function isHeaderTags(){
	isHeader = confirm("Are these header(AIH) tags?" + "\n\n" + "Click \"OK\" for YES" + "\n\n" + "Click \"Cancel\" for NO");
	function verifyTagsAreHeader(arr){
		for(var i = 0; i < arr.length; i++){
			var tagNameStr = arr[i];
			if(tagNameStr.match(/AIH/i) != null || tagNameStr.match(/HEADER/i) != null || tagNameStr.match(/HB/i) != null){
				arr[i] = arr[i];
			}
			else{
				arr[i] = "AiH_" + arr[i];
			}
		}
	}

	if(isHeader){
		verifyTagsAreHeader(tagNamesArray);
	}
}

//Asks user for price floor, must be between 0 - 10
function getPriceFloor(){
	priceFloor = prompt("Please input starting price floor: ");
	if(isNaN(priceFloor) || priceFloor == ""){
		alert("That is not a number, please try again.");
		getPriceFloor();
	}
	else if(priceFloor < 0){
		alert("Hmmm... " + priceFloor + " seems pretty low, please use a positive number.");
		getPriceFloor();
	}
	else if(priceFloor > 10){
		alert("That seems a little high(above $10), did you mean to set a price floor that high?" + newLine + newLine + 
			"Please try again");
		getPriceFloor();
	}
	else return;
}

function getSizeId(size){
	var standardizedSize = size.toLowerCase();
	var sizeIdKey = {
		"120x600": 42,
		"160x90": 45,
		"768x640": 44,
		"468x60": 38,
		"970x250": 33,
		"300x600": 22,
		"338x280": 40,
		"728x90": 20,
		"300x250": 9,
		"300x1050": 39,
		"250x250": 37,
		"970x90": 34,
		"160x600": 8,
		"320x100": 35,
		"320x50": 25,
		"300x50": 36,
		"320x480": 43
	};
	return sizeIdKey[standardizedSize];
}

function mobileOrDesktop(size){
	var sizeId = getSizeId(size);
	if(sizeId == 25 || sizeId == 35 || sizeId == 36 || sizeId == 43){
		return 6;
	}
	else return 0;
}

function getEFP(){
	if(priceFloor == 0){
		efpToggle = "NO";
		return;
	}
	iimDisplay("Requesting EFP status...");
	efp = confirm("Do you want EFP enabled on these tags?" + "\n\n" + "Click \"OK\" for YES" + "\n\n" + "Click \"Cancel\" for NO");
	
	if(efp){
		efpToggle = "YES";
	}
	else efpToggle = "NO";
}

function runGoToMacro(){
	iimDisplay("Going to publisher's zone creation page...");
	var goToPageMacro = "CODE:";
	goToPageMacro += "URL GOTO=http://adcenter.lijit.com/adminpublisher/search/zone/new/" + affiliateId;
	iimPlay(goToPageMacro);
}
//Get user input
getAffiliateId();
getAndVerifyTagNames();
isHeaderTags();
getPriceFloor();

getEFP();
getFileName();

var confirmInput = confirm("PLEASE CONFIRM: " + newLine + newLine +
	"Pub's Affiliate ID: " + affiliateId + newLine +
	"Number of tags: " + tagNamesArray.length + newLine +
	"Starting Price Floor: $" + priceFloor + newLine +
	"Header Tags: " + (isHeader ? "YES":"NO") + newLine +
	"EFP will be turned: " + (efp ? "ON":"OFF") + newLine +
	"Output file name: " + fileName
	);

if(!confirmInput){
	alert("Please try again, thanks!");
	throw new Error("Taginator cancelled by user due to inadequate input.");
}

function writeHeaders(){
	iimDisplay("Writing file headers...");
	var headerMacro = "CODE:";
	headerMacro += "ADD !EXTRACT ZONE_ID" + newLine;
	headerMacro += "ADD !EXTRACT TAG_NAME" + newLine;
	headerMacro += "ADD !EXTRACT PRICE_FLOOR" + newLine;
	headerMacro += "SAVEAS TYPE=EXTRACT FOLDER=/Users/" + alias + "/desktop FILE=" + fileName;
	iimPlay(headerMacro);
}

var newZonesArray = [];
function createTags(){
	for(var m = 0; m < tagNamesArray.length; m++){
		iimDisplay("Currently creating tag " + (m + 1) + " of " + tagNamesArray.length + " total tags.");
		var size = tagNamesArray[m].match(/\d+[xX]\d+/)[0];
		var formFillMacro = "CODE:";
		formFillMacro += "TAG POS=1 TYPE=INPUT:CHECKBOX FORM=ID:ZoneForm ATTR=ID:international CONTENT=NO" + newLine;
		formFillMacro += "TAG POS=1 TYPE=INPUT:CHECKBOX FORM=ID:ZoneForm ATTR=ID:using_efp CONTENT=" + efpToggle + newLine;
		formFillMacro += "TAG POS=1 TYPE=INPUT:CHECKBOX FORM=ID:ZoneForm ATTR=ID:geo_opt_in CONTENT=NO" + newLine;
		formFillMacro += "TAG POS=1 TYPE=INPUT:CHECKBOX FORM=ID:ZoneForm ATTR=ID:chain_optimization CONTENT=NO" + newLine;
		formFillMacro += "TAG POS=1 TYPE=SELECT FORM=ID:ZoneForm ATTR=ID:delivery_type CONTENT=%" + mobileOrDesktop(size) + newLine;
		formFillMacro += "TAG POS=1 TYPE=SELECT FORM=ID:ZoneForm ATTR=ID:ad_type CONTENT=%" + getSizeId(size) + newLine;
		if(mobileOrDesktop(size) == 6){
			formFillMacro += "TAG POS=1 TYPE=INPUT:RADIO FORM=ID:ZoneForm ATTR=ID:mobileWeb" + newLine;
		}
		formFillMacro += "TAG POS=1 TYPE=A ATTR=TXT:Advanced<SP>Options" + newLine;
		formFillMacro += "TAG POS=1 TYPE=INPUT:TEXT FORM=ID:ZoneForm ATTR=ID:userzonename CONTENT=" + tagNamesArray[m] + newLine;
		formFillMacro += "TAG POS=1 TYPE=INPUT:TEXT FORM=ID:ZoneForm ATTR=ID:cpmfloor CONTENT=" + priceFloor + newLine;
		formFillMacro += "TAG POS=1 TYPE=BUTTON FORM=ID:ZoneForm ATTR=NAME:another_button" + newLine;
		formFillMacro += "WAIT SECONDS=1" + newLine;
		formFillMacro += "TAG POS=1 TYPE=LI ATTR=TXT:New<SP>Zone<SP>Created<SP>(*)* EXTRACT=TXT" + newLine;
		
		iimPlay(formFillMacro);

		var newZone = iimGetExtract();
		newZone = newZone.match(/([0-9])\d+/)[0];
		newZonesArray[m] = newZone;

		var printResultsMacro = "CODE:";
		printResultsMacro += "ADD !EXTRACT " + newZone + newLine;
		printResultsMacro += "ADD !EXTRACT " + tagNamesArray[m] + newLine;
		printResultsMacro += "ADD !EXTRACT " + priceFloor + newLine;
		printResultsMacro += "SAVEAS TYPE=EXTRACT FOLDER=/Users/" + alias + "/desktop FILE=" + fileName;

		iimPlay(printResultsMacro);

	}
}

//Only offer rev share to people on the ops team
function revAdjustOrDone(){
	var opsPeople = ["britchey", "kmurray", "jgerlach", "ateneyck", "acarpinello", "athomas", 
					"fmaikovich", "mhanline", "thamill", "aschwemin", "rfralick", "bstottlemeyer", 
					"miwilson"];
	if(opsPeople.indexOf(alias) == -1){
		beDone(1);
	}
	else if(isHeader){
		runRevShare();
	}
	else beDone(1);
}

//Adjusts rev share to 78% if user wants
function runRevShare(){
	iimDisplay("Requesting Rev. Share adjustment...");
	var runTheRev = confirm(tagNamesArray.length + " tags have been created!" + newLine + newLine + 
		"Adjust Rev Share to 78% for these tags?");
	if(runTheRev){
		for(var i = 0; i < newZonesArray.length; i++){
			iimDisplay("Adjusting rev. share for tag " + i + " of " + newZonesArray.length + " new tags." + newLine + newLine + "Current zone: " + newZonesArray[i]);
			var revShareMacro = "CODE:";
			revShareMacro += "SET !ERRORIGNORE YES" + newLine;
			revShareMacro += "SET !TIMEOUT_STEP 1" + newLine;
			revShareMacro += "URL GOTO=http://adcenter.lijit.com/adminpublisher/search/zone/" + newZonesArray[i] + "/revenuesplits" + newLine;
			revShareMacro += "TAG POS=1 TYPE=SELECT ATTR=NAME:zone_splits_table_length CONTENT=%100" + newLine;
			revShareMacro += "TAG POS=1 TYPE=SPAN ATTR=TXT:Select<SP>all" + newLine;
			revShareMacro += "TAG POS=1 TYPE=INPUT:NUMBER ATTR=ID:multi_split_value CONTENT=" + aihRevShare + newLine;
			revShareMacro += "TAG POS=1 TYPE=BUTTON ATTR=ID:multi_split_submit" + newLine;
			revShareMacro += "WAIT SECONDS = 1" + newLine;
			revShareMacro += "TAG POS=1 TYPE=TR ATTR=data-campaign:3050" + newLine;
			revShareMacro += "TAG POS=R-1 TYPE=TR ATTR=data-campaign:*" + newLine;
			revShareMacro += "TAG POS=R1 TYPE=A ATTR=TXT:remove" + newLine;
			revShareMacro += "TAG POS=1 TYPE=TR ATTR=data-campaign:3299" + newLine;
			revShareMacro += "TAG POS=R-1 TYPE=TR ATTR=data-campaign:*" + newLine;
			revShareMacro += "TAG POS=R1 TYPE=A ATTR=TXT:remove";

			iimPlay(revShareMacro);
		}
		beDone(0);
	}
	else{
		beDone(1);
	}
}

function beDone(route){
	var q = "\"";
	if (route == 1){
		iimDisplay("Tag creation complete.  New File: " + q + fileName + q + " has downloaded onto your desktop.");
		alert("ALL DONE!" + newLine + newLine + "You created " + newZonesArray.length + " zones." + newLine + newLine + 
			"Nice." + newLine + newLine + "New File: " + q + fileName + q + " has downloaded to " + alias + "\'s' desktop.");
	}
	else {
		iimDisplay("Tag creation complete.  New File: " + q + fileName + q + " has downloaded onto your desktop.");
		alert("ALL DONE!" + newLine + newLine + "You created " + newZonesArray.length + " zones and rev. share was adjusted to " + 
			aihRevShare + "%" + newLine + newLine + "Nice." + newLine + newLine + "New File: " + q + fileName + q + " has downloaded to " + alias + "\'s' desktop.");
	}
}

//Macro Sequence
runGoToMacro();
writeHeaders();
createTags();
revAdjustOrDone();

//Author: Michael Wilson 2017