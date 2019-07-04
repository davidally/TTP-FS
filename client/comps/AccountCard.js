import Router from 'next/router';

const AccountCard = (props) => {

    const seeTransactions = () => {
        Router.push('/purchases');
    }

        return (
            <div>
                <div className="account-info">
                    <p className="label">ACCOUNT:</p>
                    <p className="acc-title">{props.data.name}</p>
                    <p className="label">FUNDS:</p>
                    <p className="acc-title">{`$${props.data.funds}`}</p>
                    <p className="label">EMAIL:</p>
                    <p className="acc-email">{props.data.email}</p>
                    <div className="user-buttons">
                        <button className="btn" onClick={seeTransactions}>My Transactions</button>
                        <button className="btn">Update</button>
                    </div>
                </div>
                <style jsx>{`
                    .label {
                        font-family: 'Roboto', sans-serif;
                        font-weight: 700;
                        color: rgb(22,50,92);
                        padding: 10px 15px 0;
                    }

                    .account-info {
                        padding: 0;
                        max-width: 100%;
                        border-radius: 5px;
                        border: 1px solid #b7b7b7;
                        box-shadow: 0 0 0 1px rgba(0,0,0,.1), 0 2px 4px 1px rgba(0,0,0,.18);
                    }

                    .user-buttons {
                        display: flex;
                        justify-content: space-between;
                        flex-direction: column;
                        padding: 15px;
                    }
                    
                    .acc-email,
                    .acc-title {
                        font-weight: 200;
                        word-wrap: break-word;
                        padding: 10px 30px;
                    }

                `}</style>
            </div>
        );
}

export default AccountCard;
