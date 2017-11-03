var zones;
var revShare;
var confirmNumbers;

zones = prompt("Paste Column of Zone IDs Here: ");

zoneArray = zones.split(" ");

function setRevShare(){
    revShare = prompt("Please input Rev. Share: ");
    if(isNaN(revShare)){
        alert("Input is not a number, please input a number 1-100");
        setRevShare();
    }
    else if(revShare < 1 || revShare > 100){
        alert("Number out of range, please input a number 1-100");
        setRevShare();
    }
    else return;
}

setRevShare();

confirmNumbers = confirm("Number of Zones: " + zoneArray.length + "\n" + 
             "Rev Share: " + revShare + "%" + "\n" +
             "Is this correct? Cancel if not correct.");

if (!confirmNumbers) {
    alert("Check yo'self before you wreck yo'self!\n\n" + 
    "Please try again!");
    throw new Error("Macro cancelled by user");
}
alert("Let's Begin!");
iimDisplay("Lets-a Go!");

for(var i = 0; i < zoneArray.length; i++){
    iimDisplay("Adjusting Revenue Share to " + revShare + "% for zone " + (i + 1) + " of " + zoneArray.length + " zones.");
    var newLine = "\n";
    var macro = "CODE:";
    macro += "SET !TIMEOUT_STEP 1" + newLine;
    macro += "SET !ERRORIGNORE YES" + newLine;
    macro += "URL GOTO=http://adcenter.lijit.com/adminpublisher/search/zone/" + zoneArray[i] + "/revenuesplits" + newLine;
    macro += "TAG POS=1 TYPE=SELECT ATTR=NAME:zone_splits_table_length CONTENT=%100" + newLine;
    macro += "TAG POS=1 TYPE=SPAN ATTR=TXT:Select<SP>all" + newLine;
    macro += "TAG POS=1 TYPE=INPUT:NUMBER ATTR=ID:multi_split_value CONTENT=" + revShare + newLine;
    macro += "TAG POS=1 TYPE=BUTTON ATTR=ID:multi_split_submit" + newLine;
    macro += "WAIT SECONDS = 1" + newLine;
    macro += "TAG POS=1 TYPE=TR ATTR=data-campaign:3050" + newLine;
    macro += "TAG POS=R-1 TYPE=TR ATTR=data-campaign:*" + newLine;
    macro += "TAG POS=R1 TYPE=A ATTR=TXT:remove" + newLine;
    macro += "TAG POS=1 TYPE=TR ATTR=data-campaign:3299" + newLine;
    macro += "TAG POS=R-1 TYPE=TR ATTR=data-campaign:*" + newLine;
    macro += "TAG POS=R1 TYPE=A ATTR=TXT:remove" + newLine;
    macro += "TAG POS=1 TYPE=TR ATTR=data-campaign:3259" + newLine;
    macro += "TAG POS=R-1 TYPE=TR ATTR=data-campaign:*" + newLine;
    macro += "TAG POS=R1 TYPE=A ATTR=TXT:remove" + newLine;
    macro += "TAG POS=1 TYPE=TR ATTR=data-campaign:2442" + newLine;
    macro += "TAG POS=R-1 TYPE=TR ATTR=data-campaign:*" + newLine;
    macro += "TAG POS=R1 TYPE=A ATTR=TXT:remove" + newLine;
    iimPlay(macro);
}

iimDisplay("Adjusted Revenue Share to " + revShare + "% for " + zoneArray.length + " zones.");

//Author: Michael Wilson