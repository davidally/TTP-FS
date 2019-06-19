import Layout from '../containers/Layout';
import Link from 'next/link';

const stock = "AAPL";

class Dashboard extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Layout>
                <h1>Global style test</h1>
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
