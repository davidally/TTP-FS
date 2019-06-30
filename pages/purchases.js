import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../client/comps/Layout';


const Purchases = () => {
    const [transactions, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`/api/transData`);
            setData(result.data.transactions);
        };
        fetchData();
    }, []);

    const listTotal = (value) => {
        const sum = transactions.reduce((prev, next) => {
            return prev + next[value];
        }, 0);
        return sum;
    }

    return (
        <Layout title={'Transactions'}>
            <div className="container">
                <h1>Transactions</h1>
                <div className="list-items">
                    {
                        transactions.map(purchase => {
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
                                        <label>Bought at<p className="data">{purchase.postTime}</p></label>
                                    </div>
                                </div>
                            </div>
                            )
                        })
                    }
                    {
                        transactions.length >= 1 
                        ? (
                            <div>
                                <label>Total Expenses:<p className="data">${listTotal("totalPaid")}</p></label>
                                <label>Total Quantity<p className="data">{listTotal("quantity")}</p></label>
                            </div>
                        ) 
                        : null
                    }
                </div>
            </div>
            <style jsx>{`
                .container {
                    padding: 30px 90px;  
                }

                .list-items {
                    display: grid;
                    grid-auto-rows: 125px;
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
                
                .data {
                    font-family: "Nunito Sans", sans-serif;
                    font-weight: 900;
                    font-size: 38px;
                    color: rgb(22,50,92);
                }

                .item-stats {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                button {
                    margin: 0;
                }
            `}</style>
        </Layout>
    );
}

export default Purchases;
