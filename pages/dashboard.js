import Layout from '../client/comps/Layout/Layout';
import AccountDisp from '../client/comps/AccountDisp';
import Transactions from '../client/comps/Transactions';
import fetch from 'isomorphic-unfetch';



class Dashboard extends React.Component {
    static async getInitialProps({req}) {
        const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
        const response = await fetch(`${baseUrl}/api/data`);
        const data = await response.json();
        return {data}
    }

    render() {
        return (
            <Layout>
                <div className="container">
                    <div className="dash-title">
                        <h1>Welcome back, {this.props.data.name}</h1>
                    </div>
                    <div className="dashboard">
                        <div className="dash-col transactions">
                            <Transactions />
                        </div>
                        <div className="dash-col account">
                            <AccountDisp data={this.props.data}/>
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
        )
    }
}

export default Dashboard;
