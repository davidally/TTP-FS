import { useState, useEffect } from 'react';
import axios from 'axios';

const TickerCard = (props) => {
    // React hooks initialize state and their setter functions
    const [cardData, setCard] = useState(0);
    const [buyShares, setBuyButton] = useState(false);
    const [successMsg, setSuccessMsg] = useState(null);
    const [costPrev, setCostPrev] = useState(0);

    const currentDate = new Date();
    const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;

    /**
     * @TODO Fix IEX API data endpoints because they are an incompetent organization
     */
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`https://sandbox.iexapis.com/v1/stock/${props.ticker}/ohlc?token=Tpk_4a728bea05b54378b80585aa076cb8e5`);

            result === {} ? null : setCard(result.data)
        };
        fetchData();
    }, [props.ticker]);

    const postTransaction = (arr) => {
        axios.post('/api/buyStock', {
            symbol: props.ticker,
            totalPaid: arr[2],
            pricePerShare: arr[0],
            quantity: arr[1],
            remainingFunds: arr[3]
        })
        .then(res => {
            res.status === 201 ? console.log('Success') : console.log('Failure');
        })
        .catch(err => console.log(err));
    };  

    /**
     * 
     * @param {object} e Form submission event.
     * @desc Handles the values of the purchase from the form then checks
     * if the total purchase is more or less than the available funds. If
     * the cost is less then postTransaction will fire with the handles form values.
     */
    const handlePurchase = (e) => {
        e.preventDefault();
        let remainingFunds;
        const { price } = cardData.open;
        const { funds } = props;
        const quantity = parseInt(e.target.amount.value);
        const cost = quantity * price;

        if (cost > funds) {
            setSuccessMsg(false);
        } else {
            remainingFunds = funds - cost;
            setSuccessMsg(true);
            postTransaction([price, quantity, cost, remainingFunds.toFixed(2)]);
        }
    };

    const showCost = (e) => {
        const quantity = e.target.value;
        const { price } = cardData.open;
        const result = quantity * price;
        setCostPrev(result.toFixed(2));
    };

    const submitMessage = () => {
        if (successMsg === true ){
            return (<p style={{color: '#4293f5'}}>Purchase successful!</p>)
        } else if (successMsg === false) {
            return (<p style={{color: '#f5424b'}}>You cannot make this purchase.</p>)
        } else null
    }

    return (
        <div className="container">
            <div>
                <h3>{props.ticker}</h3>
                {
                    cardData === 0 
                    ? null 
                    : (
                        <ul>
                            <li><label>As of: </label>{formattedDate}</li>
                            <li><label>Open: </label>${cardData.open.price}</li>
                            <li><label>Volume: </label>{cardData.volume}</li>
                        </ul>
                    )
                }
                <p><a onClick={() => setBuyButton(buyShares === false ? true : false)}>Would you like to buy shares in {props.ticker}?</a></p>
                {
                    buyShares === false 
                    ? null  
                    : (
                        <div>
                            <form onSubmit={handlePurchase}>
                                {
                                    costPrev === 0 
                                    ? null 
                                    : (
                                        <div>
                                            <p className="preview">You will pay:</p><p className="preview">${costPrev}</p>
                                        </div>
                                    )
                                }
                                {submitMessage()}
                                <input type="number" name="amount" onChange={showCost}/>
                                <br/><button className="btn" type="submit">Purchase</button>
                            </form>
                        </div>
                    )
                }
            </div>

            <style jsx>{`
                p {
                    margin: 20px 0;
                }

                .preview {
                    font-style: italic;
                    margin: 0;
                    color: grey;
                }

                input {
                    margin: 15px 0;
                    width: 100%;
                }

                .btn{
                    margin: 0;
                    letter-spacing: 2px;
                    width: 100%;
                }

                .container {
                    border: 1px solid #b7b7b7;
                    border-radius: 4px;
                    margin-top: 20px;
                    margin-left: 30px;
                    box-shadow: 0 0 0 1px rgba(0,0,0,.1), 0 2px 4px 1px rgba(0,0,0,.18);
                    margin-bottom: 20px;
                    padding: 20px;
                    background-color: white;
                }

                 h3 {
                    font-family: "Nunito Sans", sans-serif;
                    color: rgb(22,50,92);
                    font-weight: 900;
                    font-size: 45px;
                }
            `}</style>
        </div>
    );
}

export default TickerCard;