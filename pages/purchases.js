import Layout from '../client/comps/Layout';
import Pagination from '../client/comps/Pagination';
import Purchase from '../client/comps/Purchase';
import axios from 'axios';
import { useState, useEffect } from 'react';


const Purchases = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currPage, setCurrPage] = useState(1);
    const [perPage, setPerPage] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await axios(`/api/transData`);
            console.log(result);
            setTransactions(result.data.transactions.reverse());
            setLoading(false);
        };
        fetchData();
    }, []);

    const getTotal = (value) => {
        const sum = transactions.reduce((prev, next) => {
            return prev + next[value];
        }, 0);
        return sum;
    }

    // Transaction pagination
    const lastIndex = currPage * perPage;
    const firstIndex = lastIndex - perPage;
    const currentTransactions = transactions.slice(firstIndex, lastIndex);
    const paginate = (e, pageNum) => {
        e.preventDefault;
        setCurrPage(pageNum);
    };

    return (
        <Layout title={'Transactions'} authorized={true}>
            <div className="container">
                <h1>Transactions</h1>
                <h1 className="quantity">{`(${transactions.length})`}</h1>
                <div>
                    <p>Here are your current transactions. Data shown is at the time of purchase.</p>
                    <Purchase transactions={currentTransactions} loading={loading} />
                </div>
                <Pagination 
                    perPage={perPage} 
                    total={transactions.length} 
                    paginate={paginate} 
                />
                    {
                        transactions.length >= 1 
                        ? (
                            <div className="summary">
                                <h3>Portfolio Stats</h3>
                                <label>Total Expenses:<p className="data">${getTotal("totalPaid").toFixed(2)}</p></label>
                                <label>Stock Quantity<p className="data">{getTotal("quantity")}</p></label>
                            </div>
                        ) 
                        : null
                    }
            </div>
            <style jsx>{`
                .container {
                    padding: 30px 90px;  
                }
                h1,
                .quantity {
                    display: inline-block;
                }
                
                .data {
                    font-family: "Nunito Sans", sans-serif;
                    font-weight: 900;
                    font-size: 38px;
                    color: rgb(22,50,92);
                }

                .summary {
                    margin-top: 20px;
                    border: 1px solid #b7b7b7;
                    border-radius: 4px;
                    box-shadow: 0 0 0 1px rgba(0,0,0,.1), 0 2px 4px 1px rgba(0,0,0,.18);
                    padding: 20px;
                    width: 100%;
                }

                button {
                    margin: 0;
                }

                
            @media only screen and (max-width: 1000px){
                .container {
                    padding: 30px 50px; 
                }
            }
            `}</style>
        </Layout>
    );
}

export default Purchases;
