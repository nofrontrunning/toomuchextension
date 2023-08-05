var waitTime = 2000;
var tokenData2  = {};


// checkURL(document.URL);
if (document.URL.includes("https://app.uniswap.org/#/swap")) {
    
    console.log("uni loaded");
    
    // This code will be executed after 2 seconds
    var uniSwapBtn = document.getElementById('swap-button');

    if (uniSwapBtn != undefined) {
        setTimeout(function() {
            uniSwapBtn.addEventListener("click", async () => await updateUniswapQuote()); 
        }, waitTime);
    } else {

        // if swap-button is not on page yet we listen to the time when it is added
        var targetNode = document.getElementsByClassName('sc-1kykgp9-2 hinWpT')[0];

        var observer = new MutationObserver(function(mutationsList, observer) {
            for(var mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    console.log("added child");
                    for (var i = 0; i < mutation.addedNodes.length; i++) {
                        var node = mutation.addedNodes[i];
                        if (node.id === 'swap-button') {
                            console.log("added btn");
                            setTimeout(function() {
                                document.getElementById('swap-button').addEventListener("click", async () => await updateUniswapQuote()); 
                            }, waitTime);
                            
                            // observer.disconnect();
                        }
                    }
                }
            }
        });

        observer.observe(targetNode, { childList: true, subtree: true });

        console.log("uni observer added");

    }

    
} else if (document.URL.includes("1inch")) {

    console.log("1 inch page loaded");

    var swapButton = document.getElementsByClassName('swap-confirmation-button ng-star-inserted')[0];

    if (swapButton != undefined) {
        console.log("got btn")
        swapButton.addEventListener("click", async () => await update1inchQuote()); 
    };

    
} else if (document.URL.includes("www.sushi.com/swap")) {

console.log("sushi page loaded");

setTimeout(function() {
    var swapButton = document.getElementsByClassName('cursor-pointer whitespace-nowrap inline-flex gap-2 items-center justify-center font-medium transition-colors !ring-0 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-blue hover:bg-blue-600 focus:bg-blue-700 active:bg-blue-600 text-white min-h-[52px] h-[52px] px-4 rounded-xl flex-1 w-full')[0];
    console.log(swapButton);

    if (swapButton != undefined) {
        swapButton.addEventListener("click", async () => await updateSushiQuote()); 
    }

}, waitTime);

} else if (document.URL.includes("curve.fi/#")){
    
    console.log("curve loaded");

    setTimeout(function() {

        var targetNode = document.getElementsByClassName('Stepper__StepsContainer-sc-1uaxpr7-2 cpYDyr')[0];
        var observer = new MutationObserver( async function(mutationsList, observer) {
       
            for(var mutation of mutationsList){
                console.log(mutation);

                if(mutation.removedNodes.length === 1){
                    console.log("removed");
                    var button = document.getElementsByClassName('Button__StyledButton-sc-15l7t19-0 bWwxNz StepAction__StyledButton-sc-1uouzsr-2 jLwXhJ  custom-font step-box')[0];
                    button.addEventListener('mouseover', async () => await updateCurveQuote());
                }
            }
        });

        observer.observe(targetNode, { attributes: true, attributeFilter: ['class'], childList: true, subtree: true });
    
    }, waitTime);


} else if (document.URL.includes("pancakeswap")){

    console.log("pancake loaded");

    setTimeout(function() {

        var button = document.getElementsByClassName('pancake-button--disabled')[0];

        button.addEventListener('click', async () => await updatePancakeQuote());
        console.log("added");

    
    }, waitTime);

} else if (document.URL.includes("balancer")) {
    console.log("balancer loaded");

    setTimeout(function() {

        var targetNode = document.getElementsByClassName('content p-4')[1];
        var observer = new MutationObserver( async function(mutationsList, observer) {
       
            for(var mutation of mutationsList){
                console.log(mutation);

                if(mutation.type === "attributes" && mutation.target.innerText == "Preview"){
                    var button = document.getElementsByClassName('bal-btn px-4 h-12 text-base')[0];
                    button.addEventListener('click', async () => await updateBalancerQuote());
                }
            }
        });

        observer.observe(targetNode, { attributes: true, attributeFilter: ['class'], childList: true, subtree: true });


    }, waitTime);
} else if (document.URL.includes("matcha")) {
    console.log("matcha loaded");

    setTimeout(function() {

        document.getElementsByClassName('mxvt6o17 mxvt6o1 _1ye189v2zd _1ye189v3dm _1ye189v3d4 _1rlm7v0y _1rlm7v00 _1d0g9qk4 _1rlm7v0j mxvt6ob _1rlm7v0z _1rlm7v0l _1ye189v6wm _1ye189v76g _1ye189v7b7 _1ye189v6hv')[0]
        .addEventListener('click', async () => await updateMatchaQuote());

    }, waitTime);

} else if (document.URL.includes("paraswap")) {
    console.log("paraswap loaded");

    setTimeout(function() {

        document.getElementsByClassName('MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12')[0]
        .addEventListener('click', async () => await updateParaswapQuote());

    }, waitTime);

} else if (document.URL.includes("cow")) {
    console.log("cow loaded");

    setTimeout(function() {

        document.getElementById('swap-button')
        .addEventListener('click', async () => await updateCowQuote());

    }, waitTime);

} else if (document.URL.includes("jumper")) {
    console.log("jumper loaded");

    setTimeout(function() {

        document.getElementsByClassName('MuiButtonBase-root MuiButton-root MuiLoadingButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation MuiButton-fullWidth MuiButton-root MuiLoadingButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation MuiButton-fullWidth css-kbmgdj')[0]
        .addEventListener('click', async () => await updateJumperQuote());

    }, waitTime);

} else if (document.URL.includes("rocketpool")) {
    console.log("rocketpool loaded");

    setTimeout(function() {

        let walletAdd = document.getElementsByClassName('hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-slate-100/30 text-slate-100 mr-3 cursor-pointer')[0];

        if (walletAdd == undefined){

            var targetNode = document.getElementsByClassName('flex justify-end items-center flex-row')[0];
            var observer = new MutationObserver( async function(mutationsList, observer) {
           
                for(var mutation of mutationsList){
                    console.log(mutation);
    
                    if(mutation.type === "childList"){
                        document.getElementsByClassName('w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-md text-white action-button md:py-5 md:text-xl md:px-10')[0]
                        .addEventListener('mousedown', async () => await updateRocketPoolQuote());
                    }
                }
            });
    
            observer.observe(targetNode, { attributes: true, attributeFilter: ['class'], childList: true, subtree: true });
    
        } else {    
            document.getElementsByClassName('w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-md text-white action-button md:py-5 md:text-xl md:px-10')[0]
            .addEventListener('mousedown', async () => await updateRocketPoolQuote());
        }
    }, waitTime);
} else if (document.URL.includes("lido")) {
    console.log("lido loaded");

    setTimeout(function() {


        let walletBtn = document.getElementsByClassName('sc-bjUoiL fYhPbI')[0];

        if (walletBtn != undefined){

            var targetNode = document.getElementsByClassName('sc-51fa3f9c-1 gXuGfb')[0];
            var observer = new MutationObserver( async function(mutationsList, observer) {
           
                for(var mutation of mutationsList){
                    console.log(mutation);
    
                    if(mutation.type === "childList"){
                        console.log("loggedin");
                        document.getElementsByClassName('sc-bjUoiL gLzAs')[0].addEventListener('mousedown', async () => await updateLidoQuote());
                    }
                }
            });
    
            observer.observe(targetNode, { attributes: true, attributeFilter: ['class'], childList: true, subtree: true });
    
        } else {    
            document.getElementsByClassName('sc-bjUoiL gLzAs')[0].addEventListener('mousedown', async () => await updateLidoQuote());
        }
    }, waitTime);
} else if (document.URL.includes("defillama")) {
    console.log("defillama loaded");

    setTimeout(function() {


        let bestQuote = document.getElementsByClassName('sc-51fa3f9c-1 gXuGfb')[0];

        if (bestQuote != undefined){

            var targetNode = document.getElementsByClassName('sc-bb167634-2 cObIGF')[0];
            var observer = new MutationObserver( async function(mutationsList, observer) {
           
                for(var mutation of mutationsList){
                    console.log(mutation);
    
                    if(mutation.type === "childList"){
                        console.log("loggedin");
                        document.getElementsByClassName('sc-d413ea6e-0 kxiweL RouteWrapper is-selected')[0].addEventListener('mousedown', async () => await updateLlamaQuote());
                    }
                }
            });
    
            observer.observe(targetNode, { attributes: true, attributeFilter: ['class'], childList: true, subtree: true });
    
        } else {    
            document.getElementsByClassName('sc-bb167634-2 cObIGF')[0].addEventListener('click', async () => await updateLlamaQuote());
        }
    }, waitTime);
} else if (document.URL.includes("dodoex")) {
    console.log("dodo loaded");

    setTimeout(function() {

        var targetNode = document.getElementsByClassName('MuiBox-root mui-style-nzjmwu')[0];
        var observer = new MutationObserver( async function(mutationsList, observer) {
        
            for(var mutation of mutationsList){
        
                if(mutation.type === "childList"){
                    document.getElementsByClassName('MuiButtonBase-root contained mui-style-1ayh7r2')[0].addEventListener('click', async () => await updateDodoQuote());
                }
            }
        });

        observer.observe(targetNode, { attributes: true, attributeFilter: ['class'], childList: true, subtree: true });

    }, waitTime);
} else if (document.URL.includes("mav.xyz")) {
    console.log("mav loaded");

    setTimeout(function() {
        var button = document.getElementsByClassName('MuiButton-root MuiButton-contained MuiButton-containedSecondary MuiButton-sizeLarge MuiButton-containedSizeLarge MuiButtonBase-root')[0];
        button.addEventListener('click', async () => await updateMavQuote());
    }, waitTime);
}





////////////////////////////////////
// quote updating functions ////////
////////////////////////////////////

async function updateUniswapQuote(){

    var quote = [
        sanitizeNum(document.querySelectorAll("#swap-currency-input .token-amount-input")[0].value), //input amt
        document.querySelectorAll("#swap-currency-input .token-symbol-container")[0].innerHTML, //input symbol
        sanitizeNum(document.querySelectorAll("#swap-currency-output .token-amount-input")[0].value), //output amt
        document.querySelectorAll("#swap-currency-output .token-symbol-container")[0].innerHTML, // output symbol
        "uniswap",  //protocol
        document.querySelectorAll(".rgw6ez12d.rgw6ez19d")[0].alt //chainName
    ];

    console.log(document.querySelectorAll("#swap-currency-output .token-amount-input")[0].value, quote[2]);

    console.log(quote);

    let chainId = JSON.parse(getChainIdFromName(quote[5]));
    if (chainId != 1) {
        console.log("toomuch - chain not supported");
        return;
    }

    await formatAndCompareQuote(quote);

}



async function update1inchQuote(){
    
    console.log("quoting");

    var quote = [
        sanitizeNum(document.querySelectorAll('[data-id = "token-amount"]')[0].innerText), //input amt
        document.querySelectorAll('.ng-star-inserted .token-symbol.ng-star-inserted')[0].innerText, //input symbol
        sanitizeNum(document.querySelectorAll('[data-id = "token-amount"]')[1].innerText), //output amt
        document.querySelectorAll('.ng-star-inserted .token-symbol.ng-star-inserted')[1].innerText, // output symbol
        "1inch",  //protocol
        document.querySelectorAll(".header-button-text.ng-star-inserted")[0].innerText //chainName
    ];

    console.log(quote);

    let chainId = JSON.parse(getChainIdFromName(quote[5]));
    if (chainId != 1) {
        console.log("toomuch - chain not supported");
        return;
    }

    await formatAndCompareQuote(quote);
    
}

async function updateSushiQuote(){
    var quote = [
        sanitizeNum(document.getElementById("swap-from-input").value), //input amt
        document.getElementById("swap-from-button").innerText, //input symbol
        sanitizeNum(document.getElementById("swap-to-input").value), //output amt
        document.getElementById("swap-to-button").innerText, // output symbol
        "sushiswap",  //protocol
        document.getElementsByClassName("hidden xl:block")[0].innerText //chainName
    ];

    console.log(quote);

    let chainId = JSON.parse(getChainIdFromName(quote[5]));
    if (chainId != 1) {
        console.log("toomuch - chain not supported");
        return;
    }

    await formatAndCompareQuote(quote);
}

async function updateCurveQuote(){

    var quote = [
        sanitizeNum(document.getElementById("inpFromAmount").value), //input amt
        document.getElementsByClassName("combo-box-tokens__SelectedLabelText-sc-cjs0do-7 guIxtP")[0].innerText, //input symbol
        sanitizeNum(document.getElementById("inpTo").value), //output amt
        document.getElementsByClassName("combo-box-tokens__SelectedLabelText-sc-cjs0do-7 guIxtP")[1].innerText, // output symbol
        "curve",  //protocol
        document.getElementsByClassName("select-network__Text-sc-1xhmszc-0 bDxSyE network-label")[0].innerText //chainName
    ];

    console.log(quote);

    let chainId = JSON.parse(getChainIdFromName(quote[5]));
    if (chainId != 1) {
        console.log("toomuch - chain not supported");
        return;
    }

    await formatAndCompareQuote(quote);
}

async function updatePancakeQuote(){
    console.log("quoting");

    var quote = [
        sanitizeNum(document.getElementsByClassName("token-amount-input")[0].value), //input amt
        document.getElementsByClassName("sc-daa4d312-0 ihXAEA")[1].innerText, //input symbol
        sanitizeNum(document.getElementsByClassName("token-amount-input")[1].value), //output amt
        document.getElementsByClassName("sc-daa4d312-0 ihXAEA")[2].innerText, // output symbol
        "pancake",  //protocol
        document.getElementsByClassName("sc-3a5c8d1f-1 iGRbQA")[0].innerText //chainName
    ];

    console.log(quote);

    let chainId = JSON.parse(getChainIdFromName(quote[5]));
    if (chainId != 1) {
        console.log("toomuch - chain not supported");
        return;
    }

    await formatAndCompareQuote(quote);
}

async function updateBalancerQuote(){
    console.log("quoting");

    var quote = [
        sanitizeNum(document.getElementsByClassName("input h-10")[0].value), //input amt
        document.getElementsByClassName("text-base font-medium")[0].innerText, //input symbol
        sanitizeNum(document.getElementsByClassName("input h-10")[1].value), //output amt
        document.getElementsByClassName("text-base font-medium")[1].innerText, // output symbol
        "balancer",  //protocol
        document.URL.slice(26,-5)//chainName
    ];

    console.log(quote);

    let chainId = JSON.parse(getChainIdFromName(quote[5]));
    if (chainId != 1) {
        console.log("toomuch - chain not supported");
        return;
    }

    await formatAndCompareQuote(quote);
}

async function updateMatchaQuote(){
    console.log("quoting");

    var quotePanel = document.getElementsByClassName('_1ye189v6hv _1ye189v2yy _1ye189v2zm _1ye189v3dd _1ye189v4gj')[0];

    var quote = [
        sanitizeNum(document.getElementsByClassName("_1f2jl0f1 _1ye189v6my _1ye189v59a _1rlm7v0r _1rlm7v00 _1d0g9qk4 _1rlm7v05 _1f2jl0f3 _1ye189v4vg _1ye189v4zs _1ye189v6pd")[0].value), //input amt
        quotePanel.getElementsByClassName('_1ye189v5lv')[0].innerText, //input symbol
        sanitizeNum(document.getElementsByClassName("_1f2jl0f1 _1ye189v6my _1ye189v59a _1rlm7v0r _1rlm7v00 _1d0g9qk4 _1rlm7v05 _1f2jl0f3 _1ye189v4vg _1ye189v4zs _1ye189v6pd")[1].value), //output amt
        quotePanel.getElementsByClassName('_1ye189v5lv')[1].innerText, // output symbol
        "matcha",  //protocol
        document.getElementsByClassName('_1ye189v5lv')[0].innerText//chainName
    ];

    console.log(quote);

    let chainId = JSON.parse(getChainIdFromName(quote[5]));
    if (chainId != 1) {
        console.log("toomuch - chain not supported");
        return;
    }

    await formatAndCompareQuote(quote);
}

async function updateParaswapQuote(){
    console.log("quoting");

    var quote = [
        sanitizeNum(document.getElementsByClassName('MuiInputBase-input')[0].value), //input amt
        document.getElementsByClassName('jss99')[0].innerText, //input symbol
        sanitizeNum(document.getElementsByClassName('MuiInputBase-input')[1].value), //output amt
        document.getElementsByClassName('jss99')[1].innerText, // output symbol
        "paraswap",  //protocol
        document.getElementsByClassName('jss16 jss17')[0].getElementsByClassName('jss23')[0].querySelector('img').alt//chainName
    ];

    console.log(quote);

    let chainId = JSON.parse(getChainIdFromName(quote[5]));
    if (chainId != 1) {
        console.log("toomuch - chain not supported");
        return;
    }

    await formatAndCompareQuote(quote);
}

async function updateCowQuote(){
    console.log("quoting");

    var quote = [
        sanitizeNum(document.getElementsByClassName('sc-1pwzfxs-0 ggsRKG sc-1e1t2tl-3 KRnqG token-amount-input')[0].value), //input amt
        document.getElementsByClassName('sc-gd5mbo-2 kbAhOy token-symbol-container')[0].querySelectorAll('span')[0].innerText, //input symbol
        sanitizeNum(document.getElementsByClassName('sc-1pwzfxs-0 ggsRKG sc-1e1t2tl-3 KRnqG token-amount-input')[1].value), //output amt
        document.getElementsByClassName('sc-gd5mbo-2 kbAhOy token-symbol-container')[1].querySelectorAll('span')[0].innerText, // output symbol
        "cowswap",  //protocol
        document.getElementsByClassName('sc-jpbl2b-9 sc-jpbl2b-10 jPZhFf kqMNGQ')[0].innerText//chainName
    ];

    console.log(quote);

    let chainId = JSON.parse(getChainIdFromName(quote[5]));
    if (chainId != 1) {
        console.log("toomuch - chain not supported");
        return;
    }

    await formatAndCompareQuote(quote);
}

async function updateJumperQuote(){
    console.log("quoting");

    var quote = [
        sanitizeNum(document.getElementsByClassName('MuiInputBase-input MuiInputBase-inputSizeSmall MuiInputBase-inputAdornedStart MuiInputBase-inputAdornedEnd css-1yrz7eg')[0].value), //input amt
        document.getElementsByClassName('MuiTypography-root MuiTypography-body2 MuiCardHeader-title css-1787jda')[0].innerText, //input symbol
        sanitizeNum(document.getElementsByClassName('MuiBox-root css-14oqdsi')[0].querySelectorAll('text')[0].innerHTML), //output amt
        document.getElementsByClassName('MuiTypography-root MuiTypography-body2 MuiCardHeader-title css-1787jda')[1].innerText, // output symbol
        "jumper",  //protocol
        document.getElementsByClassName('MuiTypography-root MuiTypography-body2 MuiCardHeader-subheader css-23d9t0')[0].innerText//chainName
    ];

    console.log(quote);

    let chainId = JSON.parse(getChainIdFromName(quote[5]));
    if (chainId != 1) {
        console.log("toomuch - chain not supported");
        return;
    }

    await formatAndCompareQuote(quote);
}

async function updateRocketPoolQuote(){
    console.log("quoting");
    
    console.log(document.getElementById('ethAmountToStake'));

    var quote = [
        sanitizeNum(document.getElementById('ethAmountToStake').value), //input amt
        document.getElementsByClassName('text-sm pl-3 h-sm:text-xs')[0].innerText.includes('ETH') ? 'ETH' : 'rETH', //input symbol
        sanitizeNum(document.getElementsByClassName('calculation')[0].innerText), //output amt
        document.getElementsByClassName('text-sm pl-3 h-sm:text-xs')[0].innerText.includes('ETH') ? 'rETH' : 'ETH',// output symbol
        "rocketpool",  //protocol
        'Ethereum'//chainName
    ];

    console.log(quote);

    let chainId = JSON.parse(getChainIdFromName(quote[5]));
    if (chainId != 1) {
        console.log("toomuch - chain not supported");
        return;
    }

    await formatAndCompareQuote(quote);
}

async function updateLidoQuote(){
    console.log("quoting");
    
    var quote = [
        sanitizeNum(document.getElementsByClassName('sc-cOFTSb coqqWo')[0].value), //input amt
        'ETH', //input symbol
        sanitizeNum(document.getElementsByClassName('sc-cOFTSb coqqWo')[0].value), //output amt
        'stETH',// output symbol
        "lido",  //protocol
        'Ethereum'//chainName
    ];

    console.log(quote);

    let chainId = JSON.parse(getChainIdFromName(quote[5]));
    if (chainId != 1) {
        console.log("toomuch - chain not supported");
        return;
    }

    await formatAndCompareQuote(quote);
}

async function updateLlamaQuote() {

    console.log("quoting");

    setTimeout( async function() {
        var quote = [
            sanitizeNum(document.getElementsByClassName('chakra-input css-lv0ed5')[0].value), //input amt
            document.getElementsByClassName('chakra-text css-sys4p8')[0].innerText, //input symbol
            sanitizeNum(document.getElementsByClassName('chakra-input css-lv0ed5')[1].value), //output amt
            document.getElementsByClassName('chakra-text css-sys4p8')[1].innerText,// output symbol
            "defillama",  //protocol
            document.getElementsByClassName(' css-3elh5k-singleValue')[0].children[0].children[1].innerText//chainName
        ];
    
        console.log(quote);
    
        let chainId = JSON.parse(getChainIdFromName(quote[5]));
        if (chainId != 1) {
            console.log("toomuch - chain not supported");
            return;
        }
    
        await formatAndCompareQuote(quote);
    }, waitTime);
    
}


async function updateDodoQuote() {

    console.log("quoting");

    setTimeout( async function() {
        var quote = [
            sanitizeNum(document.getElementsByClassName('MuiInputBase-input MuiInput-input mui-style-sg2ko9')[0].value), //input amt
            document.getElementsByClassName('MuiButtonBase-root MuiBox-root mui-style-1xb7tfc')[0].children[1].children[0].innerText, //input symbol
            sanitizeNum(document.getElementsByClassName('MuiInputBase-input MuiInput-input Mui-readOnly MuiInputBase-readOnly mui-style-sg2ko9')[0].value), //output amt
            document.getElementsByClassName('MuiButtonBase-root MuiBox-root mui-style-1xb7tfc')[1].children[1].children[0].innerText,// output symbol
            "dodo",  //protocol
            document.getElementsByClassName('showName MuiBox-root mui-style-1isemmb')[1].innerText//chainName
        ];
    
        console.log(quote);
    
        let chainId = JSON.parse(getChainIdFromName(quote[5]));
        if (chainId != 1) {
            console.log("toomuch - chain not supported");
            return;
        }
    
        await formatAndCompareQuote(quote);
    }, waitTime);
    
}


async function updateMavQuote() {

    console.log("quoting mav");

    setTimeout( async function() {

        var trynode = document.getElementsByClassName('MuiTypography-root MuiTypography-h4 css-1pfa1h9')[0];

        if (trynode != undefined){

            var quote = [
                sanitizeNum(document.getElementsByClassName('MuiTypography-root MuiTypography-h4 css-1pfa1h9')[0].innerText), //input amt
                document.getElementsByClassName('MuiTypography-root MuiTypography-h4 css-1p63m5p')[0].innerText, //input symbol
                sanitizeNum(document.getElementsByClassName('MuiTypography-root MuiTypography-h4 css-1pfa1h9')[1].innerText),//output amt
                document.getElementsByClassName('MuiTypography-root MuiTypography-h4 css-1p63m5p')[1].innerText, // output symbol
                "mav",  //protocol
                document.getElementsByClassName('MuiTypography-root MuiTypography-h6 css-15u73lz')[0].innerText //chainName
            ];
        
            console.log(quote);
        
            let chainId = JSON.parse(getChainIdFromName(quote[5]));
    
            if (chainId != 1) {
                console.log("toomuch - chain not supported");
                return;
            }
        
            await formatAndCompareQuote(quote);

        }
    }, waitTime);
    
}








//// Helpers

function getChainIdFromName(name){
    // return 1; //TODO - delete before deploy

    name = name.toLowerCase();
    name = name.replace(" ", "");
    console.log(name);
    switch(name){
        case "ethereum":
            return 1;
        case "eth":
            return 1;
        case "ethereummainnet":
            return 1;
        case "polygon":
            return 137;
        case "arbitrum":
            return 42161;
        case "optimism":
            return 10;
        case "celo":
            return 42220;
        case "bnb chain":
            return 56;
        default:
            return 0;
    }
}

function sanitizeNum(num){
    console.log(num.replace(/[,\s]/g, ""));
    return parseFloat(num.replace(/[,\s]/g, ""));
}

async function getTokenFromSymbol(symbol) {
    if(Object.keys(tokenData2).length === 0) {
       tokenData2 = await fetch('https://api.1inch.io/v5.0/1/tokens', {method: 'GET', headers: {accept: 'application/json'}});
       tokenData2 = await tokenData2.json();
       tokenData2 = tokenData2.tokens;
    }

    let tokenData2Arr = Object.entries(tokenData2);

    let tokenInfoArry = tokenData2Arr.filter(([key, val]) => { //returns a tokenInfoArry [add, {tokenDetails}]
        return val.symbol === symbol;
    });

    if(tokenInfoArry[0] != undefined && tokenInfoArry[0].length != 0) {
        return {
            "address" : tokenInfoArry[0][1].address,
            "decimal" : tokenInfoArry[0][1].decimals,
            "symbol" : symbol  
        }
    } else {
        console.log("TooMuch - can't get token from symbole via 1inch api");
        return null;
    }
}

async function formatAndCompareQuote(quote) {

    if(quote[0]>0 && quote[2]>0 && quote[1].length>0 && quote[3].length < 7){
        console.log("ready");
        console.log(quote);

        //format quote
        let fromToken = await getTokenFromSymbol(quote[1]);
        let toToken = await  getTokenFromSymbol(quote[3]);
        

        if (fromToken == null || toToken == null) {
            console.log("toomuch - token not supported");
            return;
        }

        let formattedQuote =  {
            fromToken: fromToken,
            toToken: toToken,
            fromAmt: quote[0] * 10**fromToken.decimal,
            toAmt: quote[2] * 10**toToken.decimal,
            fromChainName: quote[5],
            toChainName: quote[5],
            protocol: quote[4]
        };
     
        await chrome.runtime.sendMessage({formattedQuote: formattedQuote, msg: "bgCompareQuote"});
  
    } 
}
