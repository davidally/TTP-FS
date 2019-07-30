const StockCard = ({name, data}) => {
    const rendercolor = () => {
        if (data.quote.latestPrice > data.quote.open){
            return "greater";
        } else if (data.quote.latestPrice < data.quote.open) {
            return "lower";
        } else return "same"
    }

    return (
        <div className="ticker-card">
            <h3 className={rendercolor()}>{name}</h3>
            <div>
                <p>Current Value: {data.quote.latestPrice}</p>
            </div>
            
            <style jsx>{`
                .ticker-card {
                    margin: 0 20px;
                    width: 300px;
                    height: 200px;
                    border: 1px solid #b7b7b7;
                    border-radius: 5px;
                    box-shadow: 0 0 0 1px rgba(0,0,0,.1), 0 2px 4px 1px rgba(0,0,0,.18);
                }
                 
                 h3 {
                     font-family: "Nunito Sans", sans-serif;
                     font-weight: 900;
                     font-size: 45px;
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
