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
// ];

// [^\/]+
let monitoredURLs = [
   new RegExp('https:\/\/app\.uniswap\.org\/#\/swap'),
   new RegExp('https:\/\/app\.1inch\.io\/#\/1\/simple\/swap\/[^\/]+\/[^\/]+'),
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

chrome.runtime.onMessage.addListener(
   async (request, sender, sendResponse) => {   
      // console.log(request.data);
      if (request.msg == "bgCompareQuote"){

         formattedQuote = request.formattedQuote;

         if(Date.now() - lastPopupTime > 3000) {
            chrome.windows.create({url: "popup.html", type: "popup", width:370, height:655});
         }

         lastPopupTime = Date.now();

      } else if (request.msg == "bgPopUpIsReady"){

         setTimeout(async () => {
            // This code will be executed after 2 seconds
            await chrome.runtime.sendMessage({formattedQuote: formattedQuote, better:true, msg:"popupDisplayQuotes"});
         }, 2000);

     }
   }  
);


function checkURL(tabUrl) {

   for(var i=0; i<monitoredURLs.length; i++){

      // if (tabUrl.includes(monitoredURLs[i])){
      //    console.log("injecting");
      //    return true
      // }

      if (monitoredURLs[i].test(tabUrl)){
         console.log("injectingg");
         return true
      }
   }
   return false;
}

