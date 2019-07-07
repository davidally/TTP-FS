import Layout from '../client/comps/Layout';
import AccountCard from '../client/comps/AccountCard';
import Transactions from '../client/comps/Transactions';
import TickerCard from '../client/comps/TickerCard';
import Pagination from '../client/comps/Pagination';
import Search from '../client/comps/Search';
import { useState, useEffect } from 'react';
import axios from 'axios';


const Dashboard = () => { 
    const [loading, setLoading] = useState(false);
    const [usrData, setData] = useState({});
    const [tickerChoice, setTickerChoice] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [perPage, setPerPage] = useState(5);

    const handleTickerChoice = (choice) => {
        setTickerChoice(choice);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const resOne = await axios(`/api/data`);
            const resTwo = await axios(`/api/transData`);
            const purchaseList = resTwo.data.transactions;
            const newArr = purchaseList.map(obj => obj.symbol);

            setData(resOne.data);
            setTransactions(newArr);

            setLoading(false);
        };
        fetchData();
    }, []);

    // Transaction pagination
    const lastIndex = currPage * perPage;
    const firstIndex = lastIndex - perPage;
    const currentTransactions = transactions.slice(firstIndex, lastIndex);
    const paginate = (pageNum) => setCurrPage(pageNum);
    // END: Transaction pagination

    return (
        <Layout title={'Dashboard'}>
            <div className="container">
                <div className="dash-title">
                    <h1>Welcome back, {!usrData ? 'User' : usrData.name}!</h1>
                </div>
                <div className="dashboard">
                    <div className="transactions">
                        <p className="dash-info">
                            Here is a list of all your recent transactions. Compare the price difference between
                            the current time and initial opening time today. Use the search bar below in order to look
                            up company symbols and click for more data.
                        </p>
                        <small>Data provided by IEX Cloud.</small>
                        <Search handleTicker={handleTickerChoice}/>
                        <Transactions transactions={currentTransactions} loading={loading} />
                        <Pagination 
                            perPage={perPage} 
                            total={transactions.length} 
                            paginate={paginate} 
                        />
                    </div>
                    <div className="account">
                    {
                        tickerChoice === '' ? null : <TickerCard ticker={tickerChoice} funds={usrData.funds}/>
                    }
                        <AccountCard data={!usrData ? '' : usrData}/>
                    </div>
                </div>
            </div>
            <style jsx>{`
            small {
                margin-top: 50px;
                display: inline-block;
            }

            .container {
                padding: 30px 150px;
            }

            .dash-title {
                display: flex;
                justify-content: center;
                margin-bottom: 50px;
            }
            .dashboard {
                display: grid;
                grid-template-columns: 9fr 3fr;
                width: 100%;
            }
            .account {
                margin-left: 30px;
            }

            @media only screen and (max-width: 1300px) and (min-width: 901px){
                .container {
                    padding: 30px 50px;
                }           
            }
            
            @media only screen and (max-width: 900px){

                .container {
                    padding: 30px 50px;
                } 

                .dashboard {
                    grid-template-columns: 1fr;
                    grid-auto-flow: row;
                    justify-content: center;
                }

                .dash-info {
                    display: none;
                }

                .account {
                    margin-bottom: 10px;
                }
                
                .transactions {
                    order: 2;
                }
            }
            `}</style>
        </Layout>
    );
}

export default Dashboard;
