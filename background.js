// let monitoredURLs = [
   // "https://app.uniswap.org/#/swap",
   // "app.1inch.io/",
   // "www.sushi.com/swap",
   // "curve.fi/#",
   // "pancakeswap.finance/swap",
//    "app.balancer.fi", //continue
//    "matcha",
//    "paraswap",
//    "cowswap",
//    "li.fi",
//    "swap.defillama.com"
// ];

// [^\/]+
let monitoredURLs = [
   new RegExp('https:\/\/app\.uniswap\.org\/swap'),
   new RegExp('https:\/\/app\.1inch\.io\/#\/1\/simple\/swap\/'),
   new RegExp('https:\/\/www\.sushi\.com\/swap'),
   new RegExp('https:\/\/curve.fi\/\#\/[^\/]+\/swap'),
   new RegExp('https:\/\/pancakeswap\.finance\/swap'),
   new RegExp('https:\/\/app\.balancer\.fi\/#\/.+/swap'),
   new RegExp('https:\/\/matcha\.xyz\/tokens\/[^\/]+\/[^\/]+'),
   new RegExp('https:\/\/app\.paraswap\.io\/\#\/'),
   new RegExp('https:\/\/swap\.cow\.fi\/\#\/1\/swap\/[^\/]+\/[^\/]+'),
   new RegExp('https:\/\/jumper\.exchange\/'),
   new RegExp('https:\/\/stake\.rocketpool\.net\/'),
   new RegExp('https:\/\/stake\.lido\.fi\/'),
   new RegExp('https:\/\/swap\.defillama\.com\/'),
   new RegExp('https:\/\/app\.dodoex\.io\/'),
   new RegExp('https:\/\/app\.mav\.xyz\/'),
];

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {

   if (changeInfo.status === "complete"){
      console.log(tab.url);
     if(checkURL(tab.url)){

      chrome.scripting.executeScript({
         files:['content.js'],
         target:{tabId: tabId}
      });

     };

      // if (tags !== null){
      //    chrome.scripting.executeScript({
      //       files:['content.js'],
      //       target:{tabId: tabId}
      //    });
      // }


      // chrome.windows.create({url: "popup.html", type: "popup", width:370, height:655});
      // popped = true;
   }
});

let lastPopupTime = 0;
let formattedQuote;

// chrome.runtime.onMessage.addListener(
//    async (request, sender, sendResponse) => {   

//       if (request.msg == "bgCompareQuote"){
//          console.log("comparing quote");
//          formattedQuote = request.formattedQuote;

//          if(Date.now() - lastPopupTime > 3000) {
//             console.log("popup");
//             chrome.windows.create({url: "popup.html", type: "popup", width:370, height:655});
//          }

//          lastPopupTime = Date.now();

//       } else if (request.msg == "bgPopUpIsReady"){
//          console.log("popup ready");
//          setTimeout(async () => {
//             // This code will be executed after 2 seconds
//             await chrome.runtime.sendMessage({formattedQuote: formattedQuote, better:true, msg:"popupDisplayQuotes"});
//          }, 2000);

//      } 
//    }  
// );

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//    (async() => {

//       if (request.msg == "getTokensFrom1inch"){
//          console.log("getting token info from 1inch");
//          allTokensFrom1inch = await fetch('https://api.1inch.dev/token/v1.2/1/token-list?provider=1inch&country=US', {method: 'GET', headers: {accept: 'application/json', Authorization: 'Bearer hnublqdJv7RnoG0QFI37FWteJCrSIdRr'}});
//          sendResponse({tokenData2: allTokensFrom1inch}); //issue response from 1inch is a readable stream not a standard token list
//          console.log(await allTokensFrom1inch.json());
//       }
//    })();

//    return true;
// })

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
   (async() => {

     if(request.msg == "formatAndCompareQuote"){
         
         let quote = request.quote;

         if(quote[0]>0 && quote[2]>0 && quote[1].length>0 && quote[3].length < 7){
            console.log("ready");
            console.log(quote);

            //format quote
            let fromToken = await getTokenFromSymbol(quote[1]);
            let toToken = await  getTokenFromSymbol(quote[3]);
         
            console.log(fromToken);
            console.log(toToken);
            if (fromToken == null || toToken == null) {
               console.log("toomuch - token not supported");
               return;
            }

            formattedQuote =  {
               fromToken: fromToken,
               toToken: toToken,
               fromAmt: quote[0] * 10**fromToken.decimal,
               toAmt: quote[2] * 10**toToken.decimal,
               fromChainName: quote[5],
               toChainName: quote[5],
               protocol: quote[4]
            };

            console.log(JSON.stringify(formattedQuote));

            if(Date.now() - lastPopupTime > 3000) {
               console.log("popup");
               chrome.windows.create({url: "popup.html", type: "popup", width:370, height:655});
            }
   
            lastPopupTime = Date.now();
         }

      } else if (request.msg == "bgPopUpIsReady"){
         console.log("popup ready");
         setTimeout(async () => {
            // This code will be executed after 2 seconds
            await chrome.runtime.sendMessage({formattedQuote: formattedQuote, better:true, msg:"popupDisplayQuotes"});
         }, 2000);
      } 
   })();

   return true;
})

function checkURL(tabUrl) {

   for(var i=0; i<monitoredURLs.length; i++){
      if (monitoredURLs[i].test(tabUrl)){
         console.log("injectingg");
         return true
      }
   }
   return false;
}

async function getTokenFromSymbol(symbol) {

   let allTokensFrom1inch = await fetch('https://raw.githubusercontent.com/nofrontrunning/toomuchweb/main/assets/tokens.json', {method: 'GET', headers: {accept: 'application/json'}}); 
   allTokensFrom1inch = await allTokensFrom1inch.json();
   allTokensFrom1inch = allTokensFrom1inch.tokens;

   let token = allTokensFrom1inch.find((tk) => tk.symbol == symbol);

   console.log(token);

   if(token != undefined){
       return {
           "address" : token.address,
           "decimal" : token.decimals,
           "symbol" : symbol,
           "img" : token.logoURI
       }
   } else {
       console.log("TooMuch - can't get token from symbole via 1inch api");
       return null;
   }
}