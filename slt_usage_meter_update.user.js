// ==UserScript==
// @name         SLTMobitel Off Peak Usage Calculator
// @namespace    https://github.com/crashzonecz/SLTUsage/
// @version      0.2
// @description  SLTMobitel Off Peak Usage Calculator
// @author       CrasHz, skaveesh
// @match        https://myslt.slt.lk/boardBand/summary
// @icon         https://www.google.com/s2/favicons?sz=64&domain=slt.lk
// @require      https://code.jquery.com/jquery-1.12.4.min.js
// @updateURL    https://github.com/crashzonecz/SLTUsage/raw/main/slt_usage_meter_update.user.js
// @downloadURL  https://github.com/crashzonecz/SLTUsage/raw/main/slt_usage_meter_update.user.js
// @grant        none
// ==/UserScript==

function waitForKeyElements ( selectorTxt, actionFunction, bWaitOnce, iframeSelector ) { var targetNodes, btargetsFound; if (typeof iframeSelector == "undefined") targetNodes = $(selectorTxt); else targetNodes = $(iframeSelector).contents () .find (selectorTxt); if (targetNodes && targetNodes.length > 0) { btargetsFound = true; targetNodes.each ( function () { var jThis = $(this); var alreadyFound = jThis.data ('alreadyFound') || false; if (!alreadyFound) { var cancelFound = actionFunction (jThis); if (cancelFound) btargetsFound = false; else jThis.data ('alreadyFound', true); } } ); } else { btargetsFound = false; } var controlObj = waitForKeyElements.controlObj || {}; var controlKey = selectorTxt.replace (/[^\w]/g, "_"); var timeControl = controlObj [controlKey]; if (btargetsFound && bWaitOnce && timeControl) { clearInterval (timeControl); delete controlObj [controlKey]; } else { if ( ! timeControl) { timeControl = setInterval ( function () { waitForKeyElements ( selectorTxt, actionFunction, bWaitOnce, iframeSelector ); }, 300 ); controlObj [controlKey] = timeControl; } } waitForKeyElements.controlObj = controlObj; }


(function() {
    'use strict';

    waitForKeyElements (".pkg-option", myGreeting);


    // Total Volume
    var totalMonthlylimit = 0;

function myGreeting() {
    var myPackageBtn = document.querySelector("#root > div > div > div.mainBody > div.boardBandSummary.common-panel > div.summary-container > a:nth-child(1) > div");
    myPackageBtn.addEventListener("click", function() {
      //calculate();
        const myTimeout = setTimeout(myGreeting, 1000);

        function myStopFunction() {
             calculate();
            clearTimeout(myTimeout);
        }

     });
    calculate();
    funCalculation();
    //funDebug();
    funInsertData2Page();
}

    var offPeakTotal;
    var offPeakPercentage;
    var offPeakUsed;
    var offpeakRemaining;
    var offpeakcircleOneDot;
    var validDate;
    var totalPeak;
    var usedPeak;
    var totalGb;
    var totalUsed;

    var totalRemaining;
    var peakMonthlylimit;
    var peakUsed;
    var peakRemaining;
    var offPeakMonthlylimit;
    var offPeakRemaining;
    var daysInThisMonth;
    var dayOfTheMonth;
    var noOfComingDays;
    var peakDataPerDay;

    var offPeakDataPerDay;
    var peakDataAvailablePerDay;
    var offPeakDataAvailablePerDay;
    var avgUsage;
    var avgPeakUsage;
    var avgOffPeakUsage;
    var dataExceeded;
    var dataExceededWarning;
    var peakDataExceeded;
    var peakDataExceededWarning;
    var offPeakDataExceeded;
    var offPeakDataExceededWarning;
    var percentagePeakRem;
    var percentagePeakUsed;
    var percentageOffPeakRem;
    var percentageOffPeakUsed;


     function calculate(){

           var regex = /\d+\.\d/g;
          var peakElement = document.querySelector("#root > div > div > div.mainBody > div.boardBandSummary.common-panel > div.graphBody-wrapper > div > div.d-flex.justify-content-between.align-items-center > div > div > div.carousel.carousel-slider > div > ul > li.slide.selected > div > div > div.used-of");
         var totalElement = document.querySelector("#root > div > div > div.mainBody > div.boardBandSummary.common-panel > div.summary-container > a:nth-child(1) > div > div > p.pkg-option");
  //var peakData = "10.0 GB USED OF 65.0 GB";
   //   var totalData = "60.5 GB USED OF 165.0 GB";
    validDate = document.querySelector("#root > div > div > div.mainBody > div.boardBandSummary.common-panel > div.graphBody-wrapper > div > div.d-flex.justify-content-between.align-items-center > div > div > div.carousel.carousel-slider > div > ul > li.slide.selected > div.m-auto > div > p").innerText;
    var peakData = peakElement.innerText;
    var totalData = totalElement.innerText;


var matches = peakData.match(regex);
 usedPeak = matches[0];
 totalPeak = matches[1];

var matches2 = totalData.match(regex);
 totalUsed = matches2[0];

 totalGb = matches2[1];
 offPeakUsed = totalUsed - usedPeak;
         offPeakTotal = totalGb - totalPeak;
         offPeakPercentage = (offPeakUsed/offPeakTotal)*100;
         offpeakRemaining = 100-offPeakPercentage;
         var circilefullsize = 628.3185307179587;
         offpeakcircleOneDot = (628.3185307179587/100)*offpeakRemaining;
         CreateOffPeakElement();

    }


    function CreateOffPeakElement(){

        var offpeakcircle = '<li class="slide selected"><div class=" m-auto" style="width: 100%;"><div class="text-center"><div class="name">Off Peak Data Usage: By CrasHz</div><div class="progress-bar-container"><div class="RCP " style="position: relative; width: 240px;"><svg width="240" height="240" viewBox="0 0 240 240" style="transform: rotate(-90deg);"><circle cx="120" cy="120" r="100" fill="none" stroke="#3077b4" stroke-width="16" stroke-dasharray="628.3185307179587, 628.3185307179587" stroke-linecap="round" class="RCP__track" style="transition: all 0.3s ease 0s;"></circle><circle cx="120" cy="120" r="100" fill="none" stroke="#3ccd6a" stroke-width="19" stroke-dasharray="'+offpeakcircleOneDot+', 628.3185307179587" stroke-dashoffset="0" stroke-linecap="round" class="RCP__progress" style="transition: all 0.3s ease 0s;"></circle></svg><div class="indicator"><p class="progress-count">' +Number(offpeakRemaining).toFixed(2)+'% </p><p class="label">  REMAINING</p></div></div></div><div class="used-of">'+parseFloat(offPeakUsed).toFixed(2)+' GB USED OF '+offPeakTotal+' GB</div><p class="text-center blue">'+validDate+'</p><div class="FullDetails"></div></div></div></li>';
        const nnode = document.createElement("div");
        const textnode = document.createTextNode("");
        nnode.appendChild(textnode);

        document.querySelector("#root > div > div > div.mainBody > div.boardBandSummary.common-panel > div.graphBody-wrapper > div > div.d-flex.justify-content-between.align-items-center > div > div > div.carousel.carousel-slider > div > ul > li.slide.selected").appendChild(nnode);
        document.querySelector("#root > div > div > div.mainBody > div.boardBandSummary.common-panel > div.graphBody-wrapper > div > div.d-flex.justify-content-between.align-items-center > div > div > div.carousel.carousel-slider > div > ul > li.slide.selected > div:nth-child(2)").innerHTML= offpeakcircle;


    }



    function funCalculation() {
	// Get data from the page

	// Total: Volume // 90.0GB
	totalMonthlylimit = totalGb;
	// Total: Used Volume // 16.7GB
	totalUsed = totalUsed;
    // Total: Remaining Volume // 73.3GB
	totalRemaining = (totalMonthlylimit - totalUsed).toFixed(2);

	// Peak: Volume // 36.0GB
	peakMonthlylimit = totalPeak;
    // Peak: Used Volume // 09.4GB
	peakUsed = usedPeak;
    // Peak: Remaining Volume // 26.6GB
	peakRemaining = (peakMonthlylimit - peakUsed).toFixed(2);


    // Off-Peak details
    offPeakMonthlylimit = Number((totalMonthlylimit - peakMonthlylimit).toFixed(2)) || 0;
    // 90-36 = 54GB
    offPeakUsed = Number((totalUsed - peakUsed).toFixed(2)) || 0;
    // 16.7-09.4 = 07.3GB
    offPeakRemaining = Number((offPeakMonthlylimit - offPeakUsed).toFixed(2)) || 0;
    // 54-07.3 = 46.7GB

    // Date details
    daysInThisMonth = new Date(new Date().getFullYear(),new Date().getMonth() + 1,0).getDate();
    // 31
    dayOfTheMonth = new Date().getDate();
    // 11
    noOfComingDays = daysInThisMonth - dayOfTheMonth;
    // 31-11 = 20

    // Per day details // Given data
    peakDataPerDay = Number((peakMonthlylimit / daysInThisMonth).toFixed(2)) || 0;
    offPeakDataPerDay = Number((totalMonthlylimit / daysInThisMonth).toFixed(2)) || 0;

    // Per day availability details
    peakDataAvailablePerDay = Number((peakRemaining / (daysInThisMonth - dayOfTheMonth)).toFixed(2)) || 0;
    offPeakDataAvailablePerDay = Number((offPeakRemaining / noOfComingDays).toFixed(2)) || 0;

    // Calculate average
    avgUsage = Number((totalUsed / dayOfTheMonth).toFixed(2)) || 0;
    avgPeakUsage = Number((peakUsed / dayOfTheMonth).toFixed(2)) || 0;
    avgOffPeakUsage = Number((offPeakUsed / dayOfTheMonth).toFixed(2)) || 0;

    // Data exceed details + warning
    let dataExceededFun;
    dataExceededFun = funVolExceed(totalRemaining, avgUsage);
    dataExceeded = dataExceededFun.val;
    dataExceededWarning = dataExceededFun.warning;

    dataExceededFun = funVolExceed(peakRemaining, avgPeakUsage);
    peakDataExceeded = dataExceededFun.val;
    peakDataExceededWarning = dataExceededFun.warning;

    dataExceededFun = funVolExceed(offPeakRemaining, avgOffPeakUsage);
    offPeakDataExceeded = dataExceededFun.val;
    offPeakDataExceededWarning = dataExceededFun.warning;

    // Calculate Percentages
    percentagePeakRem = ((peakRemaining / peakMonthlylimit) * 100).toFixed(0);
    // Peak Remaining
    percentagePeakUsed = ((peakUsed / peakMonthlylimit) * 100).toFixed(0);
    // Peak Used
    percentageOffPeakRem = ((offPeakRemaining / offPeakMonthlylimit) * 100).toFixed(0);
    // Off-Peak Remaining
    percentageOffPeakUsed = ((offPeakUsed / offPeakMonthlylimit) * 100).toFixed(0);
    // Off-Peak Used
}

function funDebug() {
    // Logs
    console.log("");
    console.log("%cLK SLT Usage (Unofficial): Logs", "font-weight: bold; font-size: 1.2em;");

    // Total Volume
    console.log("");
    console.log("%cTotal Volume", "font-weight: bold;");
    console.log("totalMonthlylimit: " + totalMonthlylimit);
    console.log("totalRemaining: " + totalRemaining);
    console.log("totalUsed: " + totalUsed);

    // Peak Volume
    console.log("");
    console.log("%cPeak Volume", "font-weight: bold;");
    console.log("peakMonthlylimit: " + peakMonthlylimit);
    console.log("peakUsed: " + peakUsed);
    console.log("peakRemaining: " + peakRemaining);

    // Off-Peak Volume
    console.log("");
    console.log("%cOff-Peak Volume", "font-weight: bold;");
    console.log("offPeakMonthlylimit: " + offPeakMonthlylimit);
    console.log("offPeakUsed: " + offPeakUsed);
    console.log("offPeakRemaining: " + offPeakRemaining);

    // Dates
    console.log("");
    console.log("%cDates", "font-weight: bold;");
    console.log("daysInThisMonth: " + daysInThisMonth);
    console.log("dayOfTheMonth: " + dayOfTheMonth);
    console.log("noOfComingDays: " + noOfComingDays);

    // Given data
    console.log("");
    console.log("%cGiven data", "font-weight: bold;");
    console.log("peakDataPerDay: " + peakDataPerDay);
    console.log("offPeakDataPerDay: " + offPeakDataPerDay);

    // Available data
    console.log("");
    console.log("%cAvailable data", "font-weight: bold;");
    console.log("peakDataAvailablePerDay: " + peakDataAvailablePerDay);
    console.log("offPeakDataAvailablePerDay: " + offPeakDataAvailablePerDay);

    // Average Data
    console.log("");
    console.log("%cAverage Data", "font-weight: bold;");
    console.log("avgUsage: " + avgUsage);
    console.log("avgPeakUsage: " + avgPeakUsage);
    console.log("avgOffPeakUsage: " + avgOffPeakUsage);

    // Data exceed details
    console.log("");
    console.log("%cData exceed details", "font-weight: bold;");
    console.log("dataExceeded: " + dataExceeded);
    console.log("peakDataExceeded: " + peakDataExceeded);
    console.log("offPeakDataExceeded: " + offPeakDataExceeded);

    // Data exceed details warning
    console.log("");
    console.log("%cData exceed details warning", "font-weight: bold;");
    console.log("dataExceededWarning: " + dataExceededWarning);
    console.log("peakDataExceededWarning: " + peakDataExceededWarning);
    console.log("offPeakDataExceededWarning: " + offPeakDataExceededWarning);

    // Percentages Values
    console.log("");
    console.log("%cPercentages Values", "font-weight: bold;");
    console.log("percentagePeakRem: " + percentagePeakRem);
    console.log("percentagePeakUsed: " + percentagePeakUsed);
    console.log("percentageOffPeakRem: " + percentageOffPeakRem);
    console.log("percentageOffPeakUsed: " + percentageOffPeakUsed);
}


   function funVolExceed(inputVal, inputAvg) {
    let inputWarning = "";
    try {
        inputVal = Number((inputVal / inputAvg).toFixed(0)) || 0;
        if (inputVal >= noOfComingDays) {
            inputVal = noOfComingDays;
        } else {
            inputWarning = "⚠";
        }
    } catch (err) {
        inputVal = 0;
        console.log("Error: " + err);
    } //finally {}
    return {
        val: inputVal,
        warning: inputWarning,
    };
}



///All Details fuction
function funInsertData2Page() {

    //let path = '/html/body/div/div/div/div[3]/div/div/div/div[3]/div[2]/div/div[1]/div';
    //var element = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
   // element.id = 'foreignDOMContainer';

    // INNER HTML
    var docFragment = document.createDocumentFragment();
    // contains all gathered nodes

	let maindiv = document.createElement("div");
    //maindiv.className = "col-md-12";
    docFragment.appendChild(maindiv);
    docFragment.append("\n");

    let submaindiv = document.createElement("div");
	//submaindiv.className = "sc-dxgOiQ iBKWVO";
    maindiv.appendChild(submaindiv);
    maindiv.append("\n");

    let h3 = document.createElement("h3");
    h3.style.padding = "0px 0px 10px 0px";
    submaindiv.appendChild(h3);
	h3.className = "sc-dnqmqq iOmaMf";
    h3.append("Monthly Data Usage Statistics");
    submaindiv.append("\n");

    let table = document.createElement("table");
    table.className = "table-hover";
    submaindiv.appendChild(table);
    table.append("\n");

    let tbody = document.createElement("tbody");
    table.appendChild(tbody);

    // TR Head 01
    let trhead1 = document.createElement("tr");
    trhead1.className = "info";
    tbody.appendChild(trhead1);
    // ------------------------------------------------------
    let trhead1_td1 = document.createElement("td");
    trhead1_td1.style.padding = "0px 10px 0px 0px";
	trhead1_td1.colSpan = 3;
    trhead1.appendChild(trhead1_td1);
    let trhead1_td1_strong = document.createElement("strong");
    trhead1_td1.appendChild(trhead1_td1_strong);
    trhead1_td1_strong.append("Total Volume");

    // ------------------------------------------------------
    //let trhead1_td2 = document.createElement("td");
	//trhead1_td2.style.padding = "0px 10px 0px 0px";
    //trhead1.appendChild(trhead1_td2);
    //trhead1_td2.append("\u00A0");
    // ------------------------------------------------------
    //let trhead1_td3 = document.createElement("td");
    //trhead1_td3.style.padding = "0px 10px 0px 0px";
    //trhead1.appendChild(trhead1_td3);
    //trhead1_td3.append("\u00A0");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 01
    let tr1 = document.createElement("tr");
    tbody.appendChild(tr1);
    // ------------------------------------------------------
    let tr1_td1 = document.createElement("td");
    tr1_td1.style.padding = "0px 10px 0px 0px";
    tr1.appendChild(tr1_td1);
    tr1_td1.append("Monthly Bandwidth Limit");
    // ------------------------------------------------------
    let tr1_td2 = document.createElement("td");
	tr1_td2.style.padding = "0px 10px 0px 0px";
    tr1.appendChild(tr1_td2);
    tr1_td2.append(totalMonthlylimit + " GB");
    // ------------------------------------------------------
    let tr1_td3 = document.createElement("td");
    tr1_td3.style.padding = "0px 10px 0px 0px";
    tr1.appendChild(tr1_td3);
    tr1_td3.append("");

    let tr1_td3_span = document.createElement("span");
    tr1_td3_span.className = "text-muted";
    tr1_td3.appendChild(tr1_td3_span);
    tr1_td3_span.append("(Data cap)");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 02
    let tr2 = document.createElement("tr");
    tbody.appendChild(tr2);
    // ------------------------------------------------------
    let tr2_td1 = document.createElement("td");
    tr2_td1.style.padding = "0px 10px 0px 0px";
    tr2.appendChild(tr2_td1);
    tr2_td1.append("Total Remaining");
    // ------------------------------------------------------
    let tr2_td2 = document.createElement("td");
	tr2_td2.style.padding = "0px 10px 0px 0px";
    tr2.appendChild(tr2_td2);
    tr2_td2.append(totalRemaining + " GB");
    // ------------------------------------------------------
    let tr2_td3 = document.createElement("td");
    tr2_td3.style.padding = "0px 10px 0px 0px";
    tr2.appendChild(tr2_td3);
    tr2_td3.append("");

    let tr2_td3_span = document.createElement("span");
    tr2_td3_span.className = "text-muted";
    tr2_td3.appendChild(tr2_td3_span);
    tr2_td3_span.append("(For the upcoming " + noOfComingDays + " days)");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 03
    let tr3 = document.createElement("tr");
    tbody.appendChild(tr3);
    // ------------------------------------------------------
    let tr3_td1 = document.createElement("td");
    tr3_td1.style.padding = "0px 10px 0px 0px";
    tr3.appendChild(tr3_td1);
    tr3_td1.append("Total Used");
    // ------------------------------------------------------
    let tr3_td2 = document.createElement("td");
	tr3_td2.style.padding = "0px 10px 0px 0px";
    tr3.appendChild(tr3_td2);
    tr3_td2.append(totalUsed + " GB");
    // ------------------------------------------------------
    let tr3_td3 = document.createElement("td");
    tr3_td3.style.padding = "0px 10px 0px 0px";
    tr3.appendChild(tr3_td3);
    tr3_td3.append("");

    let tr3_td3_span = document.createElement("span");
    tr3_td3_span.className = "text-muted";
    tr3_td3.appendChild(tr3_td3_span);
    tr3_td3_span.append("(Used in " + dayOfTheMonth + " days)");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 03 End 01
    let tr3e01 = document.createElement("tr");
    tbody.appendChild(tr3e01);
    // ------------------------------------------------------
    let tr3e01_td1 = document.createElement("td");
    tr3e01_td1.style.padding = "0px 10px 0px 0px";
    tr3e01.appendChild(tr3e01_td1);
    tr3e01_td1.append("Data will be exceeded in ");
    // ------------------------------------------------------
    let tr3e01_td2 = document.createElement("td");
	tr3e01_td2.style.padding = "0px 10px 0px 0px";
    tr3e01.appendChild(tr3e01_td2);
    tr3e01_td2.append(dataExceeded + " days");
    // ------------------------------------------------------
    let tr3e01_td3 = document.createElement("td");
    tr3e01_td3.style.padding = "0px 10px 0px 0px";
    tr3e01.appendChild(tr3e01_td3);
    tr3e01_td3.append("");

    let tr3e01_td3_span = document.createElement("span");
    tr3e01_td3_span.className = "text-danger";
    tr3e01_td3.appendChild(tr3e01_td3_span);
    tr3e01_td3_span.append(dataExceededWarning);
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 03 End 02
    let tr3e02 = document.createElement("tr");
    tbody.appendChild(tr3e02);
    // ------------------------------------------------------
    let tr3e02_td1 = document.createElement("td");
    tr3e02_td1.style.padding = "0px 10px 0px 0px";
    tr3e02.appendChild(tr3e02_td1);
    tr3e02_td1.append("Data cap will be reset in ");
    // ------------------------------------------------------
    let tr3e02_td2 = document.createElement("td");
	tr3e02_td2.style.padding = "0px 10px 0px 0px";
    tr3e02.appendChild(tr3e02_td2);
    tr3e02_td2.append(noOfComingDays + " days");
    // ------------------------------------------------------
    let tr3e02_td3 = document.createElement("td");
    tr3e02_td3.style.padding = "0px 10px 0px 0px";
    tr3e02.appendChild(tr3e02_td3);
    tr3e02_td3.append("");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR BR 01
    let trbr01 = document.createElement("tr");
    tbody.appendChild(trbr01);
    // ------------------------------------------------------
    let trbr01_td1 = document.createElement("td");
    trbr01_td1.style.padding = "0px 10px 0px 0px";
    trbr01.appendChild(trbr01_td1);
    trbr01_td1.append("\u00A0");
    // ------------------------------------------------------
    let trbr01_td2 = document.createElement("td");
	trbr01_td2.style.padding = "0px 10px 0px 0px";
    trbr01.appendChild(trbr01_td2);
    trbr01_td2.append("\u00A0");
    // ------------------------------------------------------
    let trbr01_td3 = document.createElement("td");
    trbr01_td3.style.padding = "0px 10px 0px 0px";
    trbr01.appendChild(trbr01_td3);
    trbr01_td3.append("\u00A0");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR Head 02
    let trhead2 = document.createElement("tr");
    trhead2.className = "info";
    tbody.appendChild(trhead2);
    // ------------------------------------------------------
    let trhead2_td1 = document.createElement("td");
    trhead2_td1.style.padding = "0px 10px 0px 0px";
	trhead2_td1.colSpan = 3;
    trhead2.appendChild(trhead2_td1);
    let trhead2_td1_strong = document.createElement("strong");
    trhead2_td1.appendChild(trhead2_td1_strong);
    trhead2_td1_strong.append("Total Peak Volume");

    // ------------------------------------------------------
    //let trhead2_td2 = document.createElement("td");
	//trhead2_td2.style.padding = "0px 10px 0px 0px";
    //trhead2.appendChild(trhead2_td2);
    //trhead2_td2.append("\u00A0");
    // ------------------------------------------------------
    //let trhead2_td3 = document.createElement("td");
    //trhead2_td3.style.padding = "0px 10px 0px 0px";
    //trhead2.appendChild(trhead2_td3);
    //trhead2_td3.append("\u00A0");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 04
    let tr4 = document.createElement("tr");
    tbody.appendChild(tr4);
    // ------------------------------------------------------
    let tr4_td1 = document.createElement("td");
    tr4_td1.style.padding = "0px 10px 0px 0px";
    tr4.appendChild(tr4_td1);
    tr4_td1.append("Total Peak Data Monthly Limit");
    // ------------------------------------------------------
    let tr4_td2 = document.createElement("td");
	tr4_td2.style.padding = "0px 10px 0px 0px";
    tr4.appendChild(tr4_td2);
    tr4_td2.append(peakMonthlylimit + " GB");
    // ------------------------------------------------------
    let tr4_td3 = document.createElement("td");
    tr4_td3.style.padding = "0px 10px 0px 0px";
    tr4.appendChild(tr4_td3);
    tr4_td3.append("");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 05
    let tr5 = document.createElement("tr");
    tbody.appendChild(tr5);
    // ------------------------------------------------------
    let tr5_td1 = document.createElement("td");
    tr5_td1.style.padding = "0px 10px 0px 0px";
    tr5.appendChild(tr5_td1);
    tr5_td1.append("Total Peak Data Remaining");
    // ------------------------------------------------------
    let tr5_td2 = document.createElement("td");
	tr5_td2.style.padding = "0px 10px 0px 0px";
    tr5.appendChild(tr5_td2);
    tr5_td2.append(peakRemaining + " GB");
    // ------------------------------------------------------
    let tr5_td3 = document.createElement("td");
    tr5_td3.style.padding = "0px 10px 0px 0px";
    tr5.appendChild(tr5_td3);
    //tr5_td3.append("");

    let tr5_td3_span = document.createElement("span");
    tr5_td3_span.className = "text-muted";
    tr5_td3.appendChild(tr5_td3_span);
    tr5_td3_span.append("(" + percentagePeakRem + "%)");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 06
    let tr6 = document.createElement("tr");
    tbody.appendChild(tr6);
    // ------------------------------------------------------
    let tr6_td1 = document.createElement("td");
    tr6_td1.style.padding = "0px 10px 0px 0px";
    tr6.appendChild(tr6_td1);
    tr6_td1.append("Total Peak Data Used");
    // ------------------------------------------------------
    let tr6_td2 = document.createElement("td");
	tr6_td2.style.padding = "0px 10px 0px 0px";
    tr6.appendChild(tr6_td2);
    tr6_td2.append(peakUsed + " GB");
    // ------------------------------------------------------
    let tr6_td3 = document.createElement("td");
    tr6_td3.style.padding = "0px 10px 0px 0px";
    tr6.appendChild(tr6_td3);
    //tr6_td3.append("");

    let tr6_td3_span = document.createElement("span");
    tr6_td3_span.className = "text-muted";
    tr6_td3.appendChild(tr6_td3_span);
    tr6_td3_span.append("(" + percentagePeakUsed + "%)");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 06 01
    let tr601 = document.createElement("tr");
    tbody.appendChild(tr601);
    // ------------------------------------------------------
    let tr601_td1 = document.createElement("td");
    tr601_td1.style.padding = "0px 10px 0px 0px";
    tr601.appendChild(tr601_td1);
    tr601_td1.append("Peak data will be exceeded in ");
    // ------------------------------------------------------
    let tr601_td2 = document.createElement("td");
	tr601_td2.style.padding = "0px 10px 0px 0px";
    tr601.appendChild(tr601_td2);
    tr601_td2.append(peakDataExceeded + " days");
    // ------------------------------------------------------
    let tr601_td3 = document.createElement("td");
    tr601_td3.style.padding = "0px 10px 0px 0px";
    tr601.appendChild(tr601_td3);
    tr601_td3.append("");

    let tr601_td3_span = document.createElement("span");
    tr601_td3_span.className = "text-danger";
    tr601_td3.appendChild(tr601_td3_span);
    tr601_td3_span.append(peakDataExceededWarning);
    // ------------------------------------------------------
    tbody.append("\n");

    // TR BR 02
    let trbr02 = document.createElement("tr");
    tbody.appendChild(trbr02);
    // ------------------------------------------------------
    let trbr02_td1 = document.createElement("td");
    trbr02_td1.style.padding = "0px 10px 0px 0px";
    trbr02.appendChild(trbr02_td1);
    trbr02_td1.append("\u00A0");
    // ------------------------------------------------------
    let trbr02_td2 = document.createElement("td");
	trbr02_td2.style.padding = "0px 10px 0px 0px";
    trbr02.appendChild(trbr02_td2);
    trbr02_td2.append("\u00A0");
    // ------------------------------------------------------
    let trbr02_td3 = document.createElement("td");
    trbr02_td3.style.padding = "0px 10px 0px 0px";
    trbr02.appendChild(trbr02_td3);
    trbr02_td3.append("\u00A0");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR Head 01
    let trhead3 = document.createElement("tr");
    trhead3.className = "info";
    tbody.appendChild(trhead3);
    // ------------------------------------------------------
    let trhead3_td1 = document.createElement("td");
    trhead3_td1.style.padding = "0px 10px 0px 0px";
	trhead3_td1.colSpan = 3;
    trhead3.appendChild(trhead3_td1);
    let trhead3_td1_strong = document.createElement("strong");
    trhead3_td1.appendChild(trhead3_td1_strong);
    trhead3_td1_strong.append("Total Off-Peak Volume");

    // ------------------------------------------------------
    //let trhead3_td2 = document.createElement("td");
	//trhead3_td2.style.padding = "0px 10px 0px 0px";
    //trhead3.appendChild(trhead3_td2);
    //trhead3_td2.append("\u00A0");
    // ------------------------------------------------------
    //let trhead3_td3 = document.createElement("td");
    //trhead3_td3.style.padding = "0px 10px 0px 0px";
    //trhead3.appendChild(trhead3_td3);
    //trhead3_td3.append("\u00A0");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 07
    let tr7 = document.createElement("tr");
    tbody.appendChild(tr7);
    // ------------------------------------------------------
    let tr7_td1 = document.createElement("td");
    tr7_td1.style.padding = "0px 10px 0px 0px";
    tr7.appendChild(tr7_td1);
    tr7_td1.append("Total Off-Peak Monthly Limit");
    // ------------------------------------------------------
    let tr7_td2 = document.createElement("td");
	tr7_td2.style.padding = "0px 10px 0px 0px";
    tr7.appendChild(tr7_td2);
    tr7_td2.append(offPeakMonthlylimit + " GB");
    // ------------------------------------------------------
    let tr7_td3 = document.createElement("td");
    tr7_td3.style.padding = "0px 10px 0px 0px";
    tr7.appendChild(tr7_td3);
    tr7_td3.append("");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 08
    let tr8 = document.createElement("tr");
    tbody.appendChild(tr8);
    // ------------------------------------------------------
    let tr8_td1 = document.createElement("td");
    tr8_td1.style.padding = "0px 10px 0px 0px";
    tr8.appendChild(tr8_td1);
    tr8_td1.append("Total Off-Peak Remaining");
    // ------------------------------------------------------
    let tr8_td2 = document.createElement("td");
	tr8_td2.style.padding = "0px 10px 0px 0px";
    tr8.appendChild(tr8_td2);
    tr8_td2.append(offPeakRemaining + " GB");
    // ------------------------------------------------------
    let tr8_td3 = document.createElement("td");
    tr8_td3.style.padding = "0px 10px 0px 0px";
    tr8.appendChild(tr8_td3);
    //tr8_td3.append("");

    let tr8_td3_span = document.createElement("span");
    tr8_td3_span.className = "text-muted";
    tr8_td3.appendChild(tr8_td3_span);
    tr8_td3_span.append("(" + percentageOffPeakRem + "%)");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 09
    let tr9 = document.createElement("tr");
    tbody.appendChild(tr9);
    // ------------------------------------------------------
    let tr9_td1 = document.createElement("td");
    tr9_td1.style.padding = "0px 10px 0px 0px";
    tr9.appendChild(tr9_td1);
    tr9_td1.append("Total Off-Peak Used");
    // ------------------------------------------------------
    let tr9_td2 = document.createElement("td");
	tr9_td2.style.padding = "0px 10px 0px 0px";
    tr9.appendChild(tr9_td2);
    tr9_td2.append(offPeakUsed + " GB");
    // ------------------------------------------------------
    let tr9_td3 = document.createElement("td");
    tr9_td3.style.padding = "0px 10px 0px 0px";
    tr9.appendChild(tr9_td3);
    //tr9_td3.append("");

    let tr9_td3_span = document.createElement("span");
    tr9_td3_span.className = "text-muted";
    tr9_td3.appendChild(tr9_td3_span);
    tr9_td3_span.append("(" + percentageOffPeakUsed + "%)");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 09 01
    let tr901 = document.createElement("tr");
    tbody.appendChild(tr901);
    // ------------------------------------------------------
    let tr901_td1 = document.createElement("td");
    tr901_td1.style.padding = "0px 10px 0px 0px";
    tr901.appendChild(tr901_td1);
    tr901_td1.append("Off-Peak data will be exceeded in ");
    // ------------------------------------------------------
    let tr901_td2 = document.createElement("td");
	tr901_td2.style.padding = "0px 10px 0px 0px";
    tr901.appendChild(tr901_td2);
    tr901_td2.append(offPeakDataExceeded + " days");
    // ------------------------------------------------------
    let tr901_td3 = document.createElement("td");
    tr901_td3.style.padding = "0px 10px 0px 0px";
    tr901.appendChild(tr901_td3);
    tr901_td3.append("");

    let tr901_td3_span = document.createElement("span");
    tr901_td3_span.className = "text-danger";
    tr901_td3.appendChild(tr901_td3_span);
    tr901_td3_span.append(offPeakDataExceededWarning);
    // ------------------------------------------------------
    tbody.append("\n");

    // TR BR 03
    let trbr03 = document.createElement("tr");
    tbody.appendChild(trbr03);
    // ------------------------------------------------------
    let trbr03_td1 = document.createElement("td");
    trbr03_td1.style.padding = "0px 10px 0px 0px";
    trbr03.appendChild(trbr03_td1);
    trbr03_td1.append("\u00A0");
    // ------------------------------------------------------
    let trbr03_td2 = document.createElement("td");
	trbr03_td2.style.padding = "0px 10px 0px 0px";
    trbr03.appendChild(trbr03_td2);
    trbr03_td2.append("\u00A0");
    // ------------------------------------------------------
    let trbr03_td3 = document.createElement("td");
    trbr03_td3.style.padding = "0px 10px 0px 0px";
    trbr03.appendChild(trbr03_td3);
    trbr03_td3.append("\u00A0");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR Head 04
    let trhead4 = document.createElement("tr");
    trhead4.className = "info";
    tbody.appendChild(trhead4);
    // ------------------------------------------------------
    let trhead4_td1 = document.createElement("td");
    trhead4_td1.style.padding = "0px 10px 0px 0px";
	trhead4_td1.colSpan = 3;
    trhead4.appendChild(trhead4_td1);
    let trhead4_td1_strong = document.createElement("strong");
    trhead4_td1.appendChild(trhead4_td1_strong);
    trhead4_td1_strong.append("Total Peak Volume: Per day");

    // ------------------------------------------------------
    //let trhead4_td2 = document.createElement("td");
	//trhead4_td2.style.padding = "0px 10px 0px 0px";
    //trhead4.appendChild(trhead4_td2);
    //trhead4_td2.append("\u00A0");
    // ------------------------------------------------------
    //let trhead4_td3 = document.createElement("td");
    //trhead4_td3.style.padding = "0px 10px 0px 0px";
    //trhead4.appendChild(trhead4_td3);
    //trhead4_td3.append("\u00A0");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 10
    let tr10 = document.createElement("tr");
    tbody.appendChild(tr10);
    // ------------------------------------------------------
    let tr10_td1 = document.createElement("td");
    tr10_td1.style.padding = "0px 10px 0px 0px";
    tr10.appendChild(tr10_td1);
    tr10_td1.append("Allocated Peak Data Per Day");
    // ------------------------------------------------------
    let tr10_td2 = document.createElement("td");
	tr10_td2.style.padding = "0px 10px 0px 0px";
    tr10.appendChild(tr10_td2);
    tr10_td2.append(peakDataPerDay + " GB");
    // ------------------------------------------------------
    let tr10_td3 = document.createElement("td");
    tr10_td3.style.padding = "0px 10px 0px 0px";
    tr10.appendChild(tr10_td3);

    //let tr10_td3_span = document.createElement("span");
    //tr10_td3_span.className = "text-muted";
    //tr10_td3.appendChild(tr10_td3_span);
    //tr10_td3_span.append("(Total Peak Data/" + daysInThisMonth + ")");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 11
    let tr11 = document.createElement("tr");
    tbody.appendChild(tr11);
    // ------------------------------------------------------
    let tr11_td1 = document.createElement("td");
    tr11_td1.style.padding = "0px 10px 0px 0px";
    tr11.appendChild(tr11_td1);
    tr11_td1.append("Available Peak Data Per Day");
    // ------------------------------------------------------
    let tr11_td2 = document.createElement("td");
	tr11_td2.style.padding = "0px 10px 0px 0px";
    tr11.appendChild(tr11_td2);
    tr11_td2.append(peakDataAvailablePerDay + " GB");
    // ------------------------------------------------------
    let tr11_td3 = document.createElement("td");
    tr11_td3.style.padding = "0px 10px 0px 0px";
    tr11.appendChild(tr11_td3);

    //let tr11_td3_span = document.createElement("span");
    //tr11_td3_span.className = "text-muted";
    //tr11_td3.appendChild(tr11_td3_span);
    //tr11_td3_span.append("(Available Peak Data/" + (daysInThisMonth - dayOfTheMonth) + ")");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 12
    let tr12 = document.createElement("tr");
    tbody.appendChild(tr12);
    // ------------------------------------------------------
    let tr12_td1 = document.createElement("td");
    tr12_td1.style.padding = "0px 10px 0px 0px";
    tr12.appendChild(tr12_td1);
    tr12_td1.append("Average Peak Data Usage");
    // ------------------------------------------------------
    let tr12_td2 = document.createElement("td");
	tr12_td2.style.padding = "0px 10px 0px 0px";
    tr12.appendChild(tr12_td2);
    tr12_td2.append(avgPeakUsage + " GB");
    // ------------------------------------------------------
    let tr12_td3 = document.createElement("td");
    tr12_td3.style.padding = "0px 10px 0px 0px";
    tr12.appendChild(tr12_td3);

    //let tr12_td3_span = document.createElement("span");
    //tr12_td3_span.className = "text-muted";
    //tr12_td3.appendChild(tr12_td3_span);
    //tr12_td3_span.append("(Total Peak Used Data/" + dayOfTheMonth + ")");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR BR 04
    let trbr04 = document.createElement("tr");
    tbody.appendChild(trbr04);
    // ------------------------------------------------------
    let trbr04_td1 = document.createElement("td");
    trbr04_td1.style.padding = "0px 10px 0px 0px";
    trbr04.appendChild(trbr04_td1);
    trbr04_td1.append("\u00A0");
    // ------------------------------------------------------
    let trbr04_td2 = document.createElement("td");
	trbr04_td2.style.padding = "0px 10px 0px 0px";
    trbr04.appendChild(trbr04_td2);
    trbr04_td2.append("\u00A0");
    // ------------------------------------------------------
    let trbr04_td3 = document.createElement("td");
    trbr04_td3.style.padding = "0px 10px 0px 0px";
    trbr04.appendChild(trbr04_td3);
    trbr04_td3.append("\u00A0");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR Head 03
    let trhead5 = document.createElement("tr");
    trhead5.className = "info";
    tbody.appendChild(trhead5);
    // ------------------------------------------------------
    let trhead5_td1 = document.createElement("td");
    trhead5_td1.style.padding = "0px 10px 0px 0px";
	trhead5_td1.colSpan = 3;
    trhead5.appendChild(trhead5_td1);
    let trhead5_td1_strong = document.createElement("strong");
    trhead5_td1.appendChild(trhead5_td1_strong);
    trhead5_td1_strong.append("Total Off-Peak Volume: Per day");

    // ------------------------------------------------------
    //let trhead5_td2 = document.createElement("td");
	//trhead5_td2.style.padding = "0px 10px 0px 0px";
    //trhead5.appendChild(trhead5_td2);
    //trhead5_td2.append("\u00A0");
    // ------------------------------------------------------
    //let trhead5_td3 = document.createElement("td");
    //trhead5_td3.style.padding = "0px 10px 0px 0px";
    //trhead5.appendChild(trhead5_td3);
    //trhead5_td3.append("\u00A0");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 13
    let tr13 = document.createElement("tr");
    tbody.appendChild(tr13);
    // ------------------------------------------------------
    let tr13_td1 = document.createElement("td");
    tr13_td1.style.padding = "0px 10px 0px 0px";
    tr13.appendChild(tr13_td1);
    tr13_td1.append("Allocated Off-Peak Data Per Day");
    // ------------------------------------------------------
    let tr13_td2 = document.createElement("td");
	tr13_td2.style.padding = "0px 10px 0px 0px";
    tr13.appendChild(tr13_td2);
    tr13_td2.append(offPeakDataPerDay + " GB");
    // ------------------------------------------------------
    let tr13_td3 = document.createElement("td");
    tr13_td3.style.padding = "0px 10px 0px 0px";
    tr13.appendChild(tr13_td3);

    //let tr13_td3_span = document.createElement("span");
    //tr13_td3_span.className = "text-muted";
    //tr13_td3.appendChild(tr13_td3_span);
    //tr13_td3_span.append("(Total Off-Peak Used Data/" + daysInThisMonth + ")");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 14
    let tr14 = document.createElement("tr");
    tbody.appendChild(tr14);
    // ------------------------------------------------------
    let tr14_td1 = document.createElement("td");
    tr14_td1.style.padding = "0px 10px 0px 0px";
    tr14.appendChild(tr14_td1);
    tr14_td1.append("Available Off-Peak Data Per Day");
    // ------------------------------------------------------
    let tr14_td2 = document.createElement("td");
	tr14_td2.style.padding = "0px 10px 0px 0px";
    tr14.appendChild(tr14_td2);
    tr14_td2.append(offPeakDataAvailablePerDay + " GB");
    // ------------------------------------------------------
    let tr14_td3 = document.createElement("td");
    tr14_td3.style.padding = "0px 10px 0px 0px";
    tr14.appendChild(tr14_td3);

    //let tr14_td3_span = document.createElement("span");
    //tr14_td3_span.className = "text-muted";
    //tr14_td3.appendChild(tr14_td3_span);
    //tr14_td3_span.append("(Available Off-Peak Data/" + (daysInThisMonth - dayOfTheMonth) + ")");
    // ------------------------------------------------------
    tbody.append("\n");

    // TR 15
    let tr15 = document.createElement("tr");
    tbody.appendChild(tr15);
    // ------------------------------------------------------
    let tr15_td1 = document.createElement("td");
    tr15_td1.style.padding = "0px 10px 0px 0px";
    tr15.appendChild(tr15_td1);
    tr15_td1.append("Average Off-Peak Data Usage");
    // ------------------------------------------------------
    let tr15_td2 = document.createElement("td");
	tr15_td2.style.padding = "0px 10px 0px 0px";
    tr15.appendChild(tr15_td2);
    tr15_td2.append(avgOffPeakUsage + " GB");
    // ------------------------------------------------------
    let tr15_td3 = document.createElement("td");
    tr15_td3.style.padding = "0px 10px 0px 0px";
    tr15.appendChild(tr15_td3);

    //let tr15_td3_span = document.createElement("span");
    //tr15_td3_span.className = "text-muted";
    //tr15_td3.appendChild(tr15_td3_span);
    //tr15_td3_span.append("(Total Off-Peak Used Data/" + dayOfTheMonth + ")");
    // ------------------------------------------------------
    table.append("\n");

    //let hr2 = document.createElement("hr");
    //submaindiv.appendChild(hr2);
    //submaindiv.append("\n");

    // Insert into original webpage
    //document.getElementById("foreignDOMContainer").appendChild(docFragment);
    //alert("ok")
    //document.querySelector("#root > div > div > div.valueServices > p").appendChild(docFragment);
    //document.querySelector("#root > div > div > div.mainBody > div.boardBandSummary.common-panel > div.graphBody-wrapper > div > div.d-flex.justify-content-between.align-items-center > div > div > div.carousel.carousel-slider > div > ul > li.slide.selected > div:nth-child(2) > li > div > div > p").appendChild(docFragment);
    document.querySelector("#root > div > div > div.mainBody > div.boardBandSummary.common-panel > div.graphBody-wrapper > div > div.d-flex.justify-content-between.align-items-center > div > div > div.carousel.carousel-slider > div > ul > li.slide.selected > div:nth-child(2) > li > div > div > div.FullDetails").appendChild(docFragment);
}






})();
