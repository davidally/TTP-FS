const Purchase = ({transactions, loading}) => {
    return (
        <div className="list-items">
            {
                transactions.map(purchase => {
                    let msec = Date.parse(purchase.postTime);
                    const dtest = new Date(msec);
                    const formattedDate = `${dtest.getMonth() + 1}/${dtest.getDate()}/${dtest.getFullYear()}
                    - ${dtest.toLocaleTimeString(`en-US`)}`;

                    return (
                    <div className="transaction">
                        <div className="symbol">
                            <h3>{purchase.symbol}</h3>
                        </div>
                        <div className="item-data">
                            <div className="item-stats">
                                <label>Payment<p className="data">${purchase.totalPaid}</p></label>
                                <label>Quantity<p className="data">{purchase.quantity}</p></label>
                                <label>Share Price<p className="data">${purchase.pricePerShare}</p></label>
                                <label>Time<p className="data">{`${formattedDate}`}</p></label>
                            </div>
                        </div>
                    </div>
                    )
                })
            }
            <style jsx>{`

            .list-items {
                display: grid;
                border: 1px solid #b7b7b7;
                border-radius: 4px;
                box-shadow: 0 0 0 1px rgba(0,0,0,.1), 0 2px 4px 1px rgba(0,0,0,.18);
                padding: 20px;
                margin-top: 20px;
            }

            .transaction {
                    width: 100%;
                    display: grid;
                    grid-template-columns: 2fr 10fr;
                    align-items: center;
                }

            .symbol {
                text-align: left;
                margin: 10px 30px;
                width: 30%;
            }

            h3 {
                font-family: "Nunito Sans", sans-serif;
                font-weight: 900;
                font-size: 60px;
            }

            .item-stats {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 20px;
            }

            .data {
                font-family: "Nunito Sans", sans-serif;
                font-weight: 900;
                font-size: 38px;
                color: rgb(22,50,92);
            }

            @media only screen and (max-width: 1480px){
                .transaction {
                    grid-template-columns: 1fr;
                    margin: 20px 0;
                }

                .item-stats {
                    flex-flow: column wrap;
                    align-items: flex-start;
                }
            }
            `}</style>
        </div>
    )
}

export default Purchase
