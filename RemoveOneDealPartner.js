var add_partner = confirm("Are we adding a partner or removing?\n\nPress OK to add, cancel to remove.");
var yesOrNo = "";

//Sets value to YES or NO based on remove_partner variable above, YES means checked, NO means unchecked.
if (add_partner) {
	yesOrNo = "YES";
}
else {
	yesOrNo = "NO";
}

var newLine = "\n";
var partnerIds = 
	
	{
		"acuityads": {id:66, name:"Acuity Ads"},
		"adforge":{id:69, name:"AdForge"},
		"aerserv":{id:63, name:"Aerserv"},
		"appnexus":{id:12, name:"Appnexus"},
		"audiencescience":{id:29, name:"AudienceScience"},
		"bidswitch":{id:26, name:"BidSwitch"},
		"centro":{id:16, name:"Centro"},
		"chango":{id:7, name:"Chango"},
		"criteo":{id:9, name:"Criteo"},
		"criteo-apac":{id:22, name:"Criteo-APAC"},
		"criteo-eu":{id:21, name:"Criteo-EU"},
		"dbm":{id:23, name:"DBM"},
		"drawbridge":{id:64, name:"Drawbridge"},
		"dstillery":{id:5, name:"Dstillery"},
		"featureforward":{id:41, name:"FeatureForward"},
		"gumgum":{id:36, name:"GumGum"},
		"indexexchange":{id:18, name:"Index Exchange"},
		"indexvideo":{id:55, name:"Index Video"},
		"intentiq":{id:61, name:"IntentIQ"},
		"mediamath":{id:3, name:"MediaMath"},
		"mybuys":{id:6, name:"MyBuys"},
		"netmining":{id:15, name:"Netmining"},
		"openxvideo":{id:1020, name:"OpenX Video"},
		"powerlinks":{id:70, name:"PowerLinks"},
		"pubmatic":{id:58, name:"Pubmatic"},
		"pubmaticuk":{id:71, name:"Pubmatic UK"},
		"pulsepoint":{id:49, name:"PulsePoint"},
		"pulsepoint-outstream":{id:68, name:"Pulsepoint - Outstream"},
		"quantcast":{id:43, name:"Quantcast"},
		"rhythmone":{id:56, name:"RhythmOne"},
		"rocketfuel":{id:10, name:"RocketFuel"},
		"simpli.fi":{id:2, name:"Simpli.fi"},
		"sociomantic":{id:30, name:"Sociomantic"},
		"sourceknowledge":{id:54, name:"SourceKnowledge"},
		"tradedesk":{id:27,  name:"TradeDesk"},
		"turn":{id:1,  name:"Turn"},
		"vertamedia":{id:59, name:"VertaMedia"},
		"videotestingprovider":{id:67,  name:"Video Testing Provider"},
		"viralgains":{id:65, name:"ViralGains"},
		"vizury":{id:45, name:"Vizury"}
	}

var numOfPages = prompt("How many pages of deals are there in AdCenter?");

if (isNaN(numOfPages)) {
	alert("Please use a number.");
	throw new Error("Invalid Entry, use a number please.");
}
var removedPartner = prompt("Which partner shall be removed?");

if (removedPartner.indexOf(' ') >= 0) {
	removedPartner = removedPartner.split(' ').join('').toLowerCase();
}
else {removedPartner.toLowerCase();}

var correctPartner = confirm("Is this the correct partner?" + newLine + newLine + partnerIds[removedPartner].name);

if(!correctPartner){
	alert("Please try again!  Type the demand partner in as you see it in AdCenter");
	throw new Error("D\'OH!");
}

for(var i = 1; i <= numOfPages; i++) {

	var pageNavMacro = "CODE:";
	pageNavMacro += "URL GOTO=http://adcenter.lijit.com/admindeals/?page=" + i + "&_search_deals=" + newLine;
	pageNavMacro += "WAIT SECONDS=2";
	iimPlay(pageNavMacro);

	for (var j = 1; j <= 20; j++) {
	
		var onPageMacro = "CODE:";
		onPageMacro += "TAG POS=" + j + " TYPE=BUTTON ATTR=CLASS:nullButton<SP>ul-button-dropdown<SP>icon-only<SP>ui-ddbutton&&TYPE:button&&ID:&&TXT:" + newLine;
		onPageMacro += "TAG POS=1 TYPE=A ATTR=ID:ui-menu-*-0" + newLine;
		onPageMacro += "TAG POS=1 TYPE=INPUT:CHECKBOX FORM=ID:edit_deal_form ATTR=NAME:ljt_rtb_provider_" + partnerIds[removedPartner].id + " CONTENT=" + yesOrNo + newLine;
		onPageMacro += "TAG POS=1 TYPE=BUTTON FORM=ID:edit_deal_form ATTR=TXT:Update<SP>Deal" + newLine;
		onPageMacro += "WAIT SECONDS=1" + newLine;
		onPageMacro += "BACK" + newLine;
		onPageMacro += "BACK" + newLine;
		iimPlay(onPageMacro);
		
	}
}
