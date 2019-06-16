class Authenticate extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="auth-container">
                <div>
                    <h1>REGISTER/LOGIN</h1>
                    <small>All data provided by the IPEX.</small>
                    <div className="auth-form">

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" ref="email"/>
                        </div>

                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" ref="user"/>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" ref="password"/>
                        </div>
                    </div>
                    
                </div>

                <style jsx>{`
                    .auth-container {
                        border: 1px solid grey;
                        border-radius: 5px;
                        padding: 20px;
                        width: 500px;
                        margin: 0 auto;
                    }

                    .auth-form {
                        margin-top: 20px;
                    }

                    .auth-form input {
                        float: right;
                        width: 70%;
                    }

                    .auth-form input,
                    .auth-form label{
                        display: inline-block;
                    }

                    .form-group {
                        margin-bottom: 20px;
                    }
                `}</style>
            </div>
        );
    }
}

export default Authenticate;