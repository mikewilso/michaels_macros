//imacros-js:showsteps no
//BLACK LIST BY ZONE, INCLUDES EXISTING URLS ON BLACKLIST

//Configure which blacklist to pull from
var Advertiser_Domain_Blacklist = true;

var whichList;
var erroredOut;
var m, i, k, e;
var selectTab;

//Set max number of loops
var numberOfEntries = 10000;

//Collect list of zone IDs
var zones = prompt("Paste Column of Zone IDs Here: ");

//Collect new blacklist URLs
var newUrls = prompt("Copy and paste URLs here: ");

var zoneIdArray = zones.split(" ");
var newUrlArray = newUrls.split(" ");

var zoneIdArrayLength = zoneIdArray.length;
var newUrlArrayLength = newUrlArray.length;

//Confirming all entered data is correct before proceeding
var confirmed = confirm("This all look right?" + "\n\n" + "Number of zones: " + zoneIdArrayLength + "\n\n" + "Number of new URLs: " + newUrlArrayLength);

if(!confirmed){
	alert("Please try again, thanks!");
	throw new Error("Try again!");
}

//Configures which list is being used
if (Advertiser_Domain_Blacklist){
	whichList = "block_badv_response";
	selectTab = "Advertiser<SP>Domain<SP>Blacklist"
}
else {
	whichList = "block_badv";
	selectTab = "Advertiser<SP>Domains"
}


//Main Loop 
for(m = 0; m < zoneIdArrayLength; m++){
	
	//Takes user to zone blocking page
	var urlMacro = "CODE:";
	urlMacro += "URL GOTO=http://adcenter.lijit.com/admin_zonertbblocking/index/0/" + zoneIdArray[m] + "/-1";
	urlMacro += "\n";
	urlMacro += "TAG POS=1 TYPE=A ATTR=TXT:" + selectTab;
	iimPlay(urlMacro);
	
	//Adds existing URLs to listArray
	var listArray = [];
	for (i = 1; i < numberOfEntries; i++){
		var macro = "CODE:";
		macro += "SET !TIMEOUT_STEP 1" + "\n";
		macro += "TAG POS=" + i + " TYPE=INPUT:TEXT FORM=ID:" + whichList + " ATTR=NAME:badvText[] EXTRACT=TXT" + "\n";
		iimPlay(macro);
		var lastExtract = iimGetLastExtract();
		if (lastExtract != "#EANF#"){
			listArray.push(lastExtract);
		}
		else {break;}
	}
	
	//Combine the existing URL list with the new URL list
	for (k = 0; k <newUrlArrayLength; k++){
		listArray.push(newUrlArray[k]);
	}
	
	//Add listArray URLs to black list
	var listArrayLength = listArray.length;
	var macro2 = "CODE:";
	for (e = 1; e <= listArrayLength; e++) {
		iimDisplay("Blacklisting Progress:" + "\n" + 
		"Currently on zone " + (m + 1) + " of " + zoneIdArrayLength + ".\n" + 
		listArrayLength + " URLs being added to zone's blacklist.");
		macro2 += "TAG POS=1 TYPE=INPUT:BUTTON FORM=ID:" + whichList + " ATTR=ID:add-badv-response";
		macro2 += "\n";
		macro2 += "TAG POS=" + e + " TYPE=INPUT:TEXT FORM=ID:" + whichList + " ATTR=NAME:badvText[] CONTENT=" + listArray[e - 1];
		macro2 += "\n";
		};
	iimPlay(macro2);
	
	//Submits the filled out form
	var macro3 = "CODE:";
	macro3 += "TAG POS=1 TYPE=BUTTON FORM=ID:" + whichList + " ATTR=ID:submit_button_badv";
	iimPlay(macro3);
}

iimDisplay("Successfully blacklisted " + listArrayLength + " URLs across " + zoneIdArrayLength + " zones.");

alert("All done!");
