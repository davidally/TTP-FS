import { useState, useEffect } from 'react';
import getConfig from 'next/config';
import axios from 'axios';
import StockCard from './StockCard';

/**
 * @TODO Use context api to make key availble from top of app, hidden from user
 */
const { publicRuntimeConfig } = getConfig();
const { IEX_API_KEY, IEX_BASE_URL } = publicRuntimeConfig;

const Transactions = ({transactions, loading}) => {
    const [realTime, setRealTime] = useState(null);

    useEffect(() => {
        let counter = 0;
        const fetchData = async () => {
            const tickerList = transactions.join();
            const res = await axios(`${IEX_BASE_URL}/v1/stock/market/batch?types=quote&symbols=${tickerList}&filter=latestPrice,previousClose,companyName,changePercent,latestSource,latestTime,latestUpdate&token=${IEX_API_KEY}`);
            const data = res.data;
            setRealTime(data);
        };
        if (counter === 0) {
            counter++;
            fetchData();
        } 
        if (counter > 0) {
            setInterval(() => fetchData(), 4000)
        }
    }, []);

    return (
        <div className="container">
            <div className="transaction-list">
               {
                   realTime === null
                   ? null
                   :
                   Object.entries(realTime).map(entry => {
                       return (
                       <StockCard name={entry[0]} data={entry[1]} />
                       )
                   })
               }
            </div>
            <style jsx>{`
                .transaction-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(342px, 12fr));
                    grid-row-gap: 40px;
                    justify-items: center;
                    margin-top: 20px;
                }
            `}</style>
        </div>
    );

}

export default Transactions;