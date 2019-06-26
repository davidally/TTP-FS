import Layout from '../client/comps/Layout';
import AccountDisp from '../client/comps/AccountDisp';
import Transactions from '../client/comps/Transactions';
import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import axios from 'axios';



const Dashboard = () => { 
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
                    <h1>Welcome back, {!usrData ? '' : usrData.name}</h1>
                </div>
                <div className="dashboard">
                    <div className="dash-col transactions">
                        <Transactions />
                    </div>
                    <div className="dash-col account">
                        <AccountDisp data={!usrData? '' : usrData}/>
                    </div>
                </div>
            </div>
            <style jsx>{`
            .container {
                padding: 0 20px;
            }
            
            .dash-title {
                display: flex;
                justify-content: center;
            }
            .dashboard {
                display: inline-grid;
                grid-template-columns: 7fr 3fr;
                width: 100%;
            }
            .account {
                margin-left: 30px;
            }
            `}</style>
        </Layout>
    );
}

export default Dashboard;
