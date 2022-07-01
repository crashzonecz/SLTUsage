// ==UserScript==
// @name        CrasHz
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://myslt.slt.lk/boardBand/summary
// @icon         https://www.google.com/s2/favicons?sz=64&domain=slt.lk
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    //alert("crashz")
    // Total Volume
    var totalMonthlylimit = 0;
    const myTimeout = setTimeout(myGreeting, 3000);

function myGreeting() {
    var myPackageBtn = document.querySelector("#root > div > div > div.mainBody > div.boardBandSummary.common-panel > div.summary-container > a:nth-child(1) > div");
    myPackageBtn.addEventListener("click", function() {
      calculate();
     });
    calculate();
}

function myStopFunction() {
  clearTimeout(myTimeout);
}
    var offPeakTotal;
    var offPeakPercentage;
    var offPeakUsed;
    var offpeakRemaining;
    var offpeakcircleOneDot;

     function calculate(){

           var regex = /\d+\.\d/g;
          var peakElement = document.querySelector("#root > div > div > div.mainBody > div.boardBandSummary.common-panel > div.graphBody-wrapper > div > div.d-flex.justify-content-between.align-items-center > div > div > div.carousel.carousel-slider > div > ul > li.slide.selected > div > div > div.used-of");
         var totalElement = document.querySelector("#root > div > div > div.mainBody > div.boardBandSummary.common-panel > div.summary-container > a:nth-child(1) > div > div > p.pkg-option");
  //var peakData = "10.0 GB USED OF 65.0 GB";
   //   var totalData = "60.5 GB USED OF 165.0 GB";
    var peakData = peakElement.innerText;
    var totalData = totalElement.innerText;


var matches = peakData.match(regex);
var usedPeak = matches[0];
var totalPeak = matches[1];

var matches2 = totalData.match(regex);
var totalUsed = matches2[0];
var totalGb = matches2[1];
 offPeakUsed = totalUsed - usedPeak;
         offPeakTotal = totalGb - totalPeak;
         offPeakPercentage = (offPeakUsed/offPeakTotal)*100;
         offpeakRemaining = 100-offPeakPercentage;
         var circilefullsize = 628.3185307179587;
         offpeakcircleOneDot = (628.3185307179587/100)*offpeakRemaining;
         CreateOffPeakElement();

    }


    function CreateOffPeakElement(){

        var offpeakcircle = '<li class="slide selected"><div class=" m-auto" style="width: 100%;"><div class="text-center"><div class="name">Off Peak Data Usage: By CrasHz</div><div class="progress-bar-container"><div class="RCP " style="position: relative; width: 240px;"><svg width="240" height="240" viewBox="0 0 240 240" style="transform: rotate(-90deg);"><circle cx="120" cy="120" r="100" fill="none" stroke="#3077b4" stroke-width="16" stroke-dasharray="628.3185307179587, 628.3185307179587" stroke-linecap="round" class="RCP__track" style="transition: all 0.3s ease 0s;"></circle><circle cx="120" cy="120" r="100" fill="none" stroke="#3ccd6a" stroke-width="19" stroke-dasharray="'+offpeakcircleOneDot+', 628.3185307179587" stroke-dashoffset="0" stroke-linecap="round" class="RCP__progress" style="transition: all 0.3s ease 0s;"></circle></svg><div class="indicator"><p class="progress-count">' +offpeakRemaining+'% </p><p class="label">  REMAINING</p></div></div></div><div class="used-of">'+offPeakUsed+' GB USED OF '+offPeakTotal+' GB</div><p class="text-center blue">(Valid Till : 31-Jul)</p></div></div></li>';
        const nnode = document.createElement("div");
        const textnode = document.createTextNode("");
        nnode.appendChild(textnode);

        document.querySelector("#root > div > div > div.mainBody > div.boardBandSummary.common-panel > div.graphBody-wrapper > div > div.d-flex.justify-content-between.align-items-center > div > div > div.carousel.carousel-slider > div > ul > li.slide.selected").appendChild(nnode);
        document.querySelector("#root > div > div > div.mainBody > div.boardBandSummary.common-panel > div.graphBody-wrapper > div > div.d-flex.justify-content-between.align-items-center > div > div > div.carousel.carousel-slider > div > ul > li.slide.selected > div:nth-child(2)").innerHTML= offpeakcircle;


    }



})();