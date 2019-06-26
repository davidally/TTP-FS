class AccountDisp extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <div className="account-info">
                    <p className="label">ACCOUNT:</p>
                    <p className="acc-title">{this.props.data.name}</p>
                    <p className="label">FUNDS:</p>
                    <p className="acc-title">{`$${this.props.data.funds}`}</p>
                    <p className="label">EMAIL:</p>
                    <p className="acc-email">{this.props.data.email}</p>
                    <div className="user-buttons">
                        <button className="btn">Update</button>
                        <button className="btn">Delete</button>
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
                        max-width: 250px;
                        border-radius: 5px;
                        border: 1px solid #b7b7b7;
                        border-bottom: 10px solid rgb(22,50,92);
                    }

                    .user-buttons {
                        display: flex;
                        justify-content: space-between;
                        padding: 15px;
                    }
                    
                    .acc-email,
                    .acc-title {
                        color: #4e4a67;
                        font-family: 'Nunito Sans', 'sans-serif';
                        font-weight: 200;
                        font-size: 23px;
                        word-wrap: break-word;
                        padding: 10px 30px;
                    }

                `}</style>
            </div>
        )
    }
}

export default AccountDisp;
