import Layout from '../containers/Layout';

class Account extends React.Component {
    constructor(props){
        super(props)
    }

    static async getInitialProps(ctx) {
        const account = ctx.res.json();
        return {account};
    }

    render() {
        return (
            <Layout>
                <h1>Welcome back {this.props.account.email}!</h1>
                
            </Layout>
        )
    }
}

export default Account;
