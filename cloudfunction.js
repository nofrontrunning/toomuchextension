const functions = require('@google-cloud/functions-framework');

functions.http('helloHttp', async (request, res) => {

    console.log("got msgs");
    let existingQuote = request.body.formattedQuote;
    console.log(existingQuote);

    // let existingQuote = {
    //   fromAmt:122000000000000000000,
    //   fromChainName:"Ethereum",
    //   fromToken: {address: '0x514910771af9ca656af840dff83e8264ecf986ca', decimal: 18, symbol: 'LINK', img: 'https://tokens.1inch.io/0x514910771af9ca656af840dff83e8264ecf986ca.png'},
    //   protocol: "uniswap",
    //   toAmt: 819499000,
    //   toChainName: "Ethereum",
    //   toToken: {address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', decimal: 6, symbol: 'USDC', img: 'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png'}
    // };
    
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

        result = await fetch(
            `https://api.1inch.dev/swap/v5.2/1/quote?src=${tokenFrom}&dst=${tokenTo}&amount=${tokenFromAmt}`,
            {method: 'GET', headers: {accept: 'application/json', Authorization: process.env.oneinchkey }}
        );
        result = await result.json();
    
        console.log(result);

        finalQuote.push({
            amt: parseFloat(result.toAmount),
            protocol: "1inch",
            url: `https://app.1inch.io/#/1/simple/swap/${tokenFromSymbol}/${tokenToSymbol}`
        });
        
    } catch (e) {
        console.log(e); 
    }

     //quote from paraswap
    try {

        result = await fetch(
            `https://apiv5.paraswap.io/prices?srcToken=${tokenFrom}&destToken=${existingQuote.toToken.address}&amount=${tokenFromAmt}&side=SELL&network=1`,
            {method: 'GET', headers: {accept: 'application/json'}}
        );

        if (result.status == 200){
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
                protocol: "ParaSwap",
                url: 'https://app.paraswap.io/#/?network=ethereum'
            });
        }
        
    } catch (e) {
        console.log(e);
    }

    try {
  
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

        if (result.status == 200){

            console.log("cowswap"); 
            result = await result.json();
            console.log(result); 
    
            finalQuote.push({
                amt: parseFloat(result.quote.buyAmount),
                protocol: "CowSwap",
                url : `https://swap.cow.fi/#/1/swap/${tokenFromSymbol}/${tokenToSymbol}`
            });

        }
    } catch (e) {
        console.log(e);
    }


    //0x
    try {

        result = await fetch(
            `https://api.0x.org/swap/v1/quote?buyToken=${tokenToSymbol}&sellToken=${tokenFromSymbol}&sellAmount=${tokenFromAmt}`,
            {method: 'GET', headers: {'0x-api-key': process.env.zeroxkey},}
        );
        
        if (result.status == 200 ){
            result = await result.json();

            console.log("Matcha(0x)");
            console.log(result);
            amtOut = parseFloat(result.price) * (10**tokenToDecimal) * tokenFromAmt/(10**tokenFromDecimal);
           
            finalQuote.push({
                amt: parseFloat(amtOut),
                protocol: "Matcha(0x)",
                url : `https://matcha.xyz/tokens/ethereum/${tokenTo}`
            });
        }

        
    } catch (e) {
        console.log(e);
    };

    //li.fi 
    try {

        result = await fetch(
            `https://li.quest/v1/quote?fromChain=ETH&toChain=ETH&fromToken=${tokenFromSymbol}&toToken=${tokenToSymbol}&fromAddress=${tokenFrom}&fromAmount=${tokenFromAmt}`,
            {method: 'GET', headers: {accept: 'application/json'}}
        );

        if (result.status == 200){
            result = await result.json();
            console.log("li.fi");
            console.log(result);
                
            finalQuote.push({
                amt: parseFloat(result.estimate.toAmount),
                protocol: "li.fi",
                url : `https://jumper.exchange/?fromAmount=${tokenFromAmt/(10**tokenFromDecimal)}&fromChain=1&fromToken=${tokenFrom}&toChain=1&toToken=${tokenTo}`
            });
        } else {
            console.log(result);
        }
        
    } catch (e) {
        console.log(e);
    };
    

  res.send(finalQuote);
});
