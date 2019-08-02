import Router from 'next/router';
import axios from 'axios';

const AccountCard = (props) => {

    const seeTransactions = () => {
        Router.push('/purchases');
    }

    const handleFunds = () => {
        axios.post('/api/addFunds', {
            funds: 5000
        })
        .then(res => {
            res.status === 201 ? console.log('Success') : console.log('Failure');
        })
        .catch(err => console.log(err));
    }
        return (
            <div className="container">
                <div className="account-info">
                    <p className="label">ACCOUNT:</p>
                    <p className="acc-title">{props.data.name}</p>
                    <p className="label">FUNDS:</p>
                    <p className="acc-title">{`$${props.data.funds}`}</p>
                    <p className="label">EMAIL:</p>
                    <p className="acc-email">{props.data.email}</p>
                    <div className="user-buttons">
                        <button className="btn" onClick={seeTransactions}>My Transactions</button>
                        <form onSubmit={handleFunds}>
                            <button className="btn funds-btn">Add $5000</button>
                        </form>
                    </div>
                </div>
                <style jsx>{`

                    .container {
                        background-color: white;
                        margin-left: 30px;
                    }

                    .label {
                        font-family: 'Roboto', sans-serif;
                        font-weight: 700;
                        color: rgb(22,50,92);
                        padding: 10px 15px 0;
                    }

                    .account-info {
                        padding: 40px;
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

                    .funds-btn {
                        width: 100%;
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
