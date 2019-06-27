import Link from 'next/link';

const stock = "AAPL";
const dummyData = [
    ["AAPL", "Price: $120"],
    ["GOOGL", "Price: $120"],
    ["AAPL", "Price: $120"],
    ["FB", "Price: $120"],
    ["SPCEX", "Price: $120"],
    ["TSLA", "Price: $120"],
    ["FB", "Price: $120"],
    ["SPCEX", "Price: $120"],
    ["TSLA", "Price: $120"],
    ["TSLA", "Price: $120"],
    ["FB", "Price: $120"],
    ["SPCEX", "Price: $120"],
    ["TSLA", "Price: $120"]
];

class Transactions extends React.Component {
    render() {
        return (
            <div>
                <div className="transaction-list">
                    {
                        dummyData.map((item, index )=> {
                            return (
                                <div key={`${item}-${index}`} className="transaction">
                                    <div className="symbol">
                                        <h3>{item[0]}</h3>
                                    </div>
                                    <div className="item-data">
                                        <div className="item-options">
                                            <p>{item[1]}</p>
                                            <p>Price Yesterday: $995.23</p>
                                            <button className="btn buy">Buy</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <style jsx>{`

                    .buy {
                        background-color: #00ff3b;
                        color: black;
                    }

                    .buy:hover {
                        background-color: rgba(0,0,0,0);
                        border: 2px solid #00ff3b;
                    }

                    .item-data {
                        display: inline-block;
                    }
                    
                    .symbol {
                        display: inline-block;
                        border-right: 1px solid black;
                        width: 200px;
                        padding: 0 10px;
                    }

                    h3 {
                        font-family: "Nunito Sans", sans-serif;
                        font-weight: 900;
                        font-size: 45px;
                    }

                    .transaction {
                        border-bottom: 1px solid #b7b7b7;
                    }

                    .transaction-list {
                        border: 1px solid #b7b7b7;
                        border-radius: 4px;
                        margin-top: 20px;
                        box-shadow: -5px 10px 15px rgba(0,0,0,0.2);
                    }

                    .item-options {
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                        padding: 0 10px;
                    }
                `}</style>
            </div>
        )
    }
}

export default Transactions

// <ul>
//                         <li key={`${stock.toLowerCase()}`}>
//                             <Link as={`/stock/${stock}`} href={`/post?id=${stock}`}>
//                                 <a>{stock}</a>
//                             </Link>
//                         </li>
//                     </ul>