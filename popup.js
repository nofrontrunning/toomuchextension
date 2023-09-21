async function getReady(){
    await chrome.runtime.sendMessage({data:"popUpReady", msg: "bgPopUpIsReady"});
}

getReady();
console.log("popup is now ready");

chrome.runtime.onMessage.addListener( async(request, sender, sendResponse) => {    // continue - test
    console.log("got msgs");
    let existingQuote = request.formattedQuote;
    console.log(request.formattedQuote);
    let finalQuote = [];

    let result = await fetch("https://us-central1-notional-armor-399410.cloudfunctions.net/compareQuotes", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({formattedQuote : existingQuote})
    });

    if (result.status == 200) {

        finalQuote = await result.json();

        console.log(finalQuote);

        //display quote
        finalQuote.sort((a, b) => b.amt - a.amt);
        console.log(finalQuote);
        var priceDecimal = 5;
        var percentDecimal = 2;

        let targetTokenImg = existingQuote.toToken.img;

        for(var i=0; i<finalQuote.length; i++){

            var deltaAmt = ((finalQuote[i].amt - existingQuote.toAmt)/(10**existingQuote.toToken.decimal)).toFixed(priceDecimal);
            var sign = deltaAmt >= 0 ? "+" : "-";
            var quotedAmtAfterDecimal = (finalQuote[i].amt / (10**existingQuote.toToken.decimal)).toFixed(priceDecimal);
            var percentageChange = (deltaAmt*100/(existingQuote.toAmt/(10**existingQuote.toToken.decimal))).toFixed(percentDecimal);

            var colorClass = sign == "+" ? "greenFont_tm" : "redFont_tm"

            document.getElementById("quoteBox_tm").innerHTML +=`
                <span class="quotes_tm" id="quote_tm_${i}">
                    <span class="quotePrice_tm ${colorClass}">
                        <img src=${targetTokenImg} class="tokenImg_tm" />${sign}${Math.abs(deltaAmt)} ${existingQuote.toToken.symbol}
                    </span>
                    ${finalQuote[i].protocol} <span class=${colorClass}> ${quotedAmtAfterDecimal} ${existingQuote.toToken.symbol}</span>  
                    ${sign}${Math.abs(percentageChange)}%
                </span>
            `;
            
        };

        for(var i=0; i<finalQuote.length; i++){
            (function(i) {
                document.getElementById("quote_tm_"+i).addEventListener("mouseover", () => mouseOverQuote(i));
                document.getElementById("quote_tm_"+i).addEventListener("mouseout", () => mouseOutQuote(i));
                document.getElementById("quote_tm_"+i).addEventListener("click", () => clickQuote(finalQuote[i].url));
            })(i);
        };

        //adjust UI based on results
        if (finalQuote.length > 0 && finalQuote[0].amt > existingQuote.toAmt){
            document.getElementById("greetings").innerHTML = `Too much, wtf!`;
        } else {
            document.getElementById("greetings").innerHTML = "Your quote looks pretty good!";
        }
    }

    
});

function mouseOverQuote(quoteBoxId) {
    document.getElementById("quote_tm_"+quoteBoxId).style.opacity = 0.5;
    document.getElementById("quote_tm_"+quoteBoxId).style.cursor = "pointer";
}

function mouseOutQuote(quoteBoxId) {
    document.getElementById("quote_tm_"+quoteBoxId).style.opacity = 1;
    document.getElementById("quote_tm_"+quoteBoxId).style.cursor = "auto";
}

function clickQuote(url) {
    window.open(url, '_blank');
}

