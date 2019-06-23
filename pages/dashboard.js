import Layout from '../client/comps/Layout/Layout';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

const stock = "AAPL";

class Dashboard extends React.Component {
    static async getInitialProps({req, query}){
        console.log("\n DASHBOARD QUERY\n", query);
        
        const baseURL = req ? `${req.protocol}://${req.get("Host")}` : "";
        const res = await fetch(`${baseURL}/api/access`);
        if (res.status === 200){
            const data = await res.json();
        }
        return {data}
    }

    render() {
        return (
            <Layout>
                <h1>Welcome back {this.props.data.xyz}</h1>
                <ul>
                    <li key={`${stock.toLowerCase()}`}>
                        <Link as={`/stock/${stock}`} href={`/post?id=${stock}`}>
                            <a>{stock}</a>
                        </Link>
                    </li>
                </ul>
            </Layout>
        )
    }
}

export default Dashboard;
