import { useState, useEffect } from 'react';
import axios from 'axios';
import StockCard from './StockCard';

const Transactions = ({transactions, loading}) => {
    const [realTime, setRealTime] = useState(null);

    useEffect(() => {
        let counter = 0;
        const fetchData = async () => {
            const tickerList = transactions.join();
            const res = await axios(`https://sandbox.iexapis.com/v1/stock/market/batch?types=quote&symbols=${tickerList}&filter=open,close,latestPrice,companyName,high,low,changePercent,latestVolume,closeTime&token=Tpk_4a728bea05b54378b80585aa076cb8e5`);
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