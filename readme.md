
<img width="1111" alt="Screenshot 2023-07-02 at 11 04 19" src="https://raw.githubusercontent.com/nofrontrunning/toomuchweb/main/assets/screen.png">

# TooMuch

An open-sourced chrome extension auto compares DEX rate based on current URL. It reads swap quotes from your page and compare it with all major DEX aggregators including:

- 1inch
- 0x(Matcha)
- ParaSwap
- Li.fi(Jumper)
- CowSwap

# How it works

The extension detects if your are visiting supported Defi dapps, it will grab the exchange quote from the page with js and automatically compare it for you.

Current Dapps supported:

- Uniswap.org
- 1inch.io
- sushi.com
- curve.fi
- pancakeswap.finance
- balancer.fi
- matcha
- paraswap
- cowswap
- lifi
- rocket pool
- lido
- defillama
- dodo
- Maverick


# Process 

1. Background script monitors current tab URL, if it is a supported Dapp, inject content script onto the page.

2. Content script listens to current page changes, when quote is ready, it asks background script for a popup, grab the quote details and send it to the popup to compare.

3. Popup window calls the APIs of each DEX aggregator and compare the price with current quote then display the difference. 


# Setup

This repo contains both the extension and website. To setup extension locally, just load the extension folder to chrome as unpacked extension. Web is simple HTML, no server end script needed.

# Contribution

Contribution and suggestion welcome. Please open an issue for questions and suggestions. PR for code contributions.


