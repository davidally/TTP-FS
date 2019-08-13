import Layout from '../client/comps/Layout';
import AccountCard from '../client/comps/AccountCard';
import Transactions from '../client/comps/Transactions';
import TickerCard from '../client/comps/TickerCard';
import Search from '../client/comps/Search';
import { useState, useEffect } from 'react';
import axios from 'axios';


const Dashboard = () => { 
    const [usrData, setData] = useState({});
    const [tickerChoice, setTickerChoice] = useState('');
    const [transactions, setTransactions] = useState([]);

    const handleTickerChoice = (choice) => {
        setTickerChoice(choice);
    };

    /**
     * @TODO Fix IEX API data endpoints because they are an incompetent organization
     * Fix response coming from server, returning HTML rather than JSON.
     */
    useEffect(() => {
        const fetchData = async () => {

            const reqOne = await axios(`/api/user/data`);
            const reqTwo = await axios(`/api/transaction`);

            if (typeof(reqTwo.data) === 'string'){
                window.location.reload(true);
            } else {
                const purchaseList = reqTwo.data.transactions;
                const newArr = purchaseList.map(obj => obj.symbol);
                setData(reqOne.data);
                setTransactions(newArr);
            }
        };
        fetchData();
    }, []);

    return (
        <Layout title={'Dashboard'} authorized={true}>
            <div className="container">
                <div className="dash-title">
                    <h1>Welcome back, {!usrData ? 'User' : usrData.name}!</h1>
                </div>
                <div className="dashboard">
                    <div className="transactions">
                        <p className="dash-info">
                            Compare the price difference between
                            the current time and initial opening time today. Use the search bar below in order to look
                            up company symbols and click for more data.
                        </p>
                        <h3 className="data">Search Stocks</h3>
                        <small>Data provided by IEX Cloud.</small><br/>
                        <Search handleTicker={handleTickerChoice}/>
                        {
                            transactions.length === 0
                            ? null
                            : (
                                <div>
                                    <h3 className="data">You have stakes in:</h3>
                                    <Transactions transactions={transactions} />
                                    <small className="footnotes">
                                        * Green and red indicate higher and lower pricing than the day's open. Grey indicates no change.<br/>
                                        ** IMPORTANT: IEX API only provides scrambled data for testing purposes, which is why data shown here may appear inconsistent.<br/>
                                        This board would simulate realtime tracking in a production environment.
                                    </small>
                                </div>
                            )
                        }
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
                display: block;
            }

            .footnotes,
            h3 {
                margin-top: 50px;
            }

            .container {
                padding: 30px 150px;
            }
            
            .data {
                font-family: "Nunito Sans", sans-serif;
                font-weight: 900;
                font-size: 38px;
                color: rgb(22,50,92);
            }

            .dash-title {
                display: flex;
                justify-content: center;
                margin-bottom: 50px;
            }
            .dashboard {
                display: grid;
                grid-template-columns: 9fr 3fr;
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
