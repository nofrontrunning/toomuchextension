async function getReady(){
    await chrome.runtime.sendMessage({data:"popUpReady", msg: "bgPopUpIsReady"});
}

getReady();
console.log("popup is now ready");

chrome.runtime.onMessage.addListener( async(request, sender, sendResponse) => {   
    console.log("got msgs");
    let existingQuote = request.formattedQuote;
    console.log(existingQuote);

    //compare quote
    let finalQuote = [];
    let tokenFrom = existingQuote.fromToken.address;
    let tokenFromSymbol = existingQuote.fromToken.symbol;
    let tokenFromDecimal = existingQuote.fromToken.decimal;
    let tokenFromAmt = existingQuote.fromAmt;
    let tokenTo = existingQuote.toToken.address;
    let tokenToSymbol = existingQuote.toToken.symbol;
    let tokenToDecimal = existingQuote.toToken.decimal;
    let chainFrom = existingQuote.fromChainName;
    let chainTo = existingQuote.toChainName;
    let result;
    let targetTokenImg = existingQuote.toToken.img

    let weth = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

    //getting quote from 1inch
    try {
        var protocolName = "1inch";
        document.getElementById("compareProtocol_tm").innerHTML = `${protocolName}`;

        result = await fetch(
            `https://api.1inch.io/v5.0/1/quote?fromTokenAddress=${tokenFrom}&toTokenAddress=${tokenTo}&amount=${tokenFromAmt}`,
            {method: 'GET', headers: {accept: 'application/json'}}
        );
        result = await result.json();
    
        console.log(result);

        finalQuote.push({
            amt: parseFloat(result.toTokenAmount),
            protocol: protocolName,
            url: `https://app.1inch.io/#/1/simple/swap/${tokenFromSymbol}/${tokenToSymbol}`
        });
        
    } catch (e) {
        console.log(e); 
    }
 

    //quote from paraswap
    try {
        var protocolName = "ParaSwap";
        document.getElementById("compareProtocol_tm").innerHTML = `${protocolName}`;

        result = await fetch(
            `https://apiv5.paraswap.io/prices?srcToken=${tokenFrom}&destToken=${existingQuote.toToken.address}&amount=${tokenFromAmt}&side=SELL&network=1`,
            {method: 'GET', headers: {accept: 'application/json'}}
        );

        result = await result.json();
    
        console.log(result);
        var swapSteps = result.priceRoute.bestRoute[0].swaps[0].swapExchanges;
        console.log(swapSteps);
        var amtOut = 0;
        for(var i=0; i<swapSteps.length; i++){
            amtOut += parseFloat(swapSteps[i].destAmount);
        }
        console.log(amtOut);
           
        finalQuote.push({
            amt: parseFloat(amtOut),
            protocol: protocolName,
            url: 'https://app.paraswap.io/#/?network=ethereum'
        });
        
    } catch (e) {
        console.log(e);
    }

    //quote from cow swap
    try {
        var protocolName = "CowSwap";
        document.getElementById("compareProtocol_tm").innerHTML = `${protocolName}`;
        
        var params = {
            "sellToken": tokenFrom.toString() == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" ? weth : tokenFrom.toString(),
            "buyToken": tokenTo.toString() == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" ? weth : tokenTo.toString(),
            "receiver": "0x6810e776880c02933d47db1b9fc05908e5386b96",
            "appData": "0x0000000000000000000000000000000000000000000000000000000000000000",
            "partiallyFillable": false,
            "sellTokenBalance": "erc20",
            "buyTokenBalance": "erc20",
            "from": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            "priceQuality": "optimal",
            "signingScheme": "eip712",
            "onchainOrder": false,
            "kind": "sell",
            "sellAmountBeforeFee": tokenFromAmt.toString()
          };

        result = await fetch(
            "https://api.cow.fi/mainnet/api/v1/quote",
            {method: 'POST', headers: {'accept': 'application/json', 'content-type':'application/json'}, body: JSON.stringify(params)},
        );

        console.log("cowswap"); 
        result = await result.json();
        console.log(result); 

        finalQuote.push({
            amt: parseFloat(result.quote.buyAmount),
            protocol: protocolName,
            url : `https://swap.cow.fi/#/1/swap/${tokenFromSymbol}/${tokenToSymbol}`
        });


    } catch (e) {
        console.log(e);
    }


    //0x
    try {
        var protocolName = "Matcha(0x)";
        document.getElementById("compareProtocol_tm").innerHTML = `${protocolName}`;

        result = await fetch(
            `https://api.0x.org/swap/v1/quote?buyToken=${tokenToSymbol}&sellToken=${tokenFromSymbol}&sellAmount=${tokenFromAmt}`,
            {method: 'GET', headers: {'0x-api-key': '5186ec77-e0e5-4bd3-9072-3c8b273d91f4'},}
        );

        result = await result.json();

        console.log("Matcha(0x)");
        console.log(result);
        
        if (result.code == 200 ){
            amtOut = parseFloat(result.price) * (10**tokenToDecimal) * tokenFromAmt/(10**tokenFromDecimal);
           
            finalQuote.push({
                amt: parseFloat(amtOut),
                protocol: protocolName,
                url : `https://matcha.xyz/tokens/ethereum/${tokenTo}`
            });
        }

        
    } catch (e) {
        console.log(e);
    }

    //li.fi
    try {
        var protocolName = "Jumper(li.fi)";
        document.getElementById("compareProtocol_tm").innerHTML = `${protocolName}`;

        result = await fetch(
            `https://li.quest/v1/quote?fromChain=ETH&toChain=ETH&fromToken=${tokenFromSymbol}&toToken=${tokenToSymbol}&fromAddress=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&fromAmount=${tokenFromAmt}`,
            {method: 'GET', headers: {accept: 'application/json'}}
        );

        result = await result.json();
        console.log("li.fi");
        console.log(result);
           
        finalQuote.push({
            amt: parseFloat(result.estimate.toAmount),
            protocol: protocolName,
            url : `https://jumper.exchange/?fromAmount=${tokenFromAmt/(10**tokenFromDecimal)}&fromChain=1&fromToken=${tokenFrom}&toChain=1&toToken=${tokenTo}`
        });
        
    } catch (e) {
        console.log(e);
    }

      // //bungee.exchange/
    // try {
    //     result = await fetch(
    //         `https://api.socket.tech/v2/quote?fromChainId=1&fromTokenAddress=${tokenFrom}&toChainId=1&toTokenAddress=${tokenTo}&fromAmount=${tokenFromAmt}&userAddress=0x3e8cB4bd04d81498aB4b94a392c334F5328b237b&uniqueRoutesPerBridge=true&sort=output`
    //         `https://api.0x.org/swap/v1/quote?buyToken=${tokenToSymbol}&sellToken=${tokenFromSymbol}&sellAmount=${tokenFromAmt}`,
    //         {method: 'GET', headers: {'0x-API-KEY': '72a5b4b0-e727-48be-8aa1-5da9d62fe635'},}
    //     );

    //     result = await result.json();
    //     console.log("Bungee");
    //     console.log(result);
       
    //     amtOut = parseFloat(result.price) * (10**tokenToDecimal) * tokenFromAmt/(10**tokenFromDecimal);
           
    //     finalQuote.push({
    //         amt: parseFloat(amtOut),
    //         protocol: "Matcha(0x)",
    //         url : `https://matcha.xyz/tokens/ethereum/${tokenTo}`
    //     });
        
    // } catch (e) {
    //     console.log(e);
    // }

    //display quote
    finalQuote.sort((a, b) => b.amt - a.amt);
    console.log(finalQuote);
    var priceDecimal = 5;
    var percentDecimal = 2;

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

