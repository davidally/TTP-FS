import Layout from '../client/comps/Layout';
import AccountDisp from '../client/comps/AccountDisp';
import Transactions from '../client/comps/Transactions';``
import Search from '../client/comps/Search';
import { useState, useEffect } from 'react';
import axios from 'axios';



const Dashboard = () => { 
    // Hook to fetch data 
    const [usrData, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`/api/data`);
            const test = result.data;
            setData(test);
        };
        
        fetchData();
    }, []);

    return (
        <Layout>
            <div className="container">
                <div className="dash-title">
                    <h1>Welcome back, {!usrData ? 'User' : usrData.name}!</h1>
                </div>
                <div className="dashboard">
                    <div className="transactions">
                        <p>
                            Here is a list of all your recent transactions. Compare the price difference between
                            the current time and initial opening time today. Use the search bar below in order to look
                            up company symbols and click for more data.
                        </p>
                        <Search />
                        <Transactions />
                    </div> 
                    <div className="account">
                        <AccountDisp data={!usrData? '' : usrData}/>
                    </div>
                </div>
            </div>
            <style jsx>{`
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

            @media only screen and (max-width: 1200px) and (min-width: 901px){
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

                .account {
                    margin-bottom: 50px;
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
