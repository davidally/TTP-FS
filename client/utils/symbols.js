const axios = require('axios');

module.exports = async function(){
    let tickerArr = [];
    const result = await axios(`https://api.iextrading.com/1.0/ref-data/symbols?filter=symbol`);
    const tickers = result.data;
    tickers.map(item => {
        tickerArr.push(item.symbol);
    });
    return tickerArr;
};

