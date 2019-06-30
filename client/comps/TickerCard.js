import { useState, useEffect } from 'react';
import axios from 'axios';

const TickerCard = (props) => {
    const [cardData, setCard] = useState(0);
    const [buyShares, setBuyButton] = useState(false);
    const currentDate = new Date();
    const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`https://sandbox.iexapis.com/v1/stock/${props.ticker}/ohlc?token=Tpk_4a728bea05b54378b80585aa076cb8e5`);
            setCard(result.data);
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

    const handlePurchase = (e) => {
        e.preventDefault();
        let remainingFunds;
        const { price } = cardData.open;
        const { funds } = props;
        const quantity = parseInt(e.target.amount.value);
        const cost = quantity * price;

        if (cost > funds) {
            alert('You cannot make this purchase')
        } else {
            remainingFunds = funds - cost;
            postTransaction([price, quantity, cost, remainingFunds.toFixed(2)]);
        }
    };

    return (
        <div className="container">
            <div>
                <h3>{props.ticker}</h3>
                {
                    cardData === 0 ? null :
                    (
                        <ul>
                            <li><label>As of: </label>{formattedDate}</li>
                            <li><label>Open: </label>${cardData.open.price}</li>
                            <li><label>Volume: </label>{cardData.volume}</li>
                        </ul>
                    )
                }
                <p><a onClick={() => setBuyButton(buyShares === false ? true : false)}>Would you like to buy shares in {props.ticker}?</a></p>
                {
                    buyShares === false ? null : 
                    (
                        <div>
                            <form onSubmit={handlePurchase}>
                                <input type="number" name="amount"/>
                                <br/><button className="btn" type="submit">Purchase</button>
                            </form>
                        </div>
                    )
                }
            </div>

            <style jsx>{`
                p {
                    margin-top: 20px;
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
                    box-shadow: 0 0 0 1px rgba(0,0,0,.1), 0 2px 4px 1px rgba(0,0,0,.18);
                    margin-bottom: 20px;
                    padding: 20px;
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