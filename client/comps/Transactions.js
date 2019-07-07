const Transactions = ({transactions, loading}) => {
    return (
        <div>
            <div className="transaction-list">
               {
                   transactions.map(item => {
                       return (
                       <div className="ticker-card">
                           <h3>{item}</h3>
                       </div>
                       )
                   })
               }
            </div>
            <style jsx>{`

               .ticker-card {
                   width: 300px;
                   height: 200px;
                   border: 1px solid #b7b7b7;
                   border-radius: 5px;
                   box-shadow: 0 0 0 1px rgba(0,0,0,.1), 0 2px 4px 1px rgba(0,0,0,.18);
               }
                
                h3 {
                    font-family: "Nunito Sans", sans-serif;
                    font-weight: 900;
                    font-size: 45px;
                }

                .transaction-list {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-row-gap: 40px;
                    justify-items: center;
                    margin-top: 20px;
                }
            `}</style>
        </div>
    );

}

export default Transactions;

// <ul>
//                         <li key={`${stock.toLowerCase()}`}>
//                             <Link as={`/stock/${stock}`} href={`/post?id=${stock}`}>
//                                 <a>{stock}</a>
//                             </Link>
//                         </li>
//                     </ul>