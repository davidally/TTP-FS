const StockCard = ({name, data}) => {
    const rendercolor = () => {
        if (data.quote.latestPrice > data.quote.open){
            return "greater";
        } else if (data.quote.latestPrice < data.quote.open) {
            return "lower";
        } else return "same"
    }
    
    const toParse = new Date(data.quote.closeTime);
    const msec = Date.parse(toParse);
    const date = new Date(msec);
    const closeTime = date.toLocaleTimeString('en-US');

    /**
     * @TODO Look into implementing Server-side events.
     * @note Not available for testing at the moment. Only available to certain tiers.
     */
    // const events = new EventSource(`https://cloud-sse.iexapis.com/stable/stocksUS5Second?symbols=aapl,fb&token=Tpk_4a728bea05b54378b80585aa076cb8e5`);
    // events.onopen = (e) => console.log(e);
    // events.onmessage = ({data}) => console.log(data);

    return (
        <div className="container">
            <h3 className={rendercolor()}>{name}</h3>
            <div>
                <p>{data.quote.companyName}</p>
                <label className="info">Current Value:<p>${data.quote.latestPrice}</p></label>
                <label className="info">Open: <p>${data.quote.open}</p></label>
                <label className="info">Change {`(from last closing)`}:<p> {`${(data.quote.changePercent * 100).toFixed(3)} %`}</p></label>
                <label className="info">Lastest Volume:<p> {data.quote.latestVolume}</p></label>
                <label className="info">Close Time:<p> {closeTime}</p></label>
            </div>
            
            <style jsx>{`
                .container {
                    background-color: white;
                    padding: 20px;
                    max-width: 100%;
                    min-width: 300px;
                    border: 1px solid #b7b7b7;
                    border-radius: 5px;
                    box-shadow: 0 0 0 1px rgba(0,0,0,.1), 0 2px 4px 1px rgba(0,0,0,.18);
                }
                 
                 h3 {
                     font-family: "Nunito Sans", sans-serif;
                     font-weight: 900;
                     font-size: 45px;
                 }

                .info {
                    font-style: italic;
                    margin: 0;
                    color: grey;
                }

                 .greater {
                     color: green;
                 }
                 .lower {
                    color: red;
                 }
                 .same {
                    color: grey;
                 }
            `}</style>
        </div>
    )
}

export default StockCard;
