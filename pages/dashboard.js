import Layout from '../containers/Layout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const stock = "AAPL";

class Dashboard extends React.Component {
    constructor(props){
        super(props);
    }

    static async getInitialProps() {
        const res = await fetch(`https://sandbox.iexapis.com/v1/stock/${stock}/financials/2?token=Tpk_4a728bea05b54378b80585aa076cb8e5&period=annual`);
        const data = await res.json();
        return {data};
    }

    serializeData = () => {
        return JSON.stringify(this.props.data);
    }

    render() {

        const x = this.serializeData();

        return (
            <Layout>
                <h1>Global style test</h1>
                <ul>
                    <li key={`${stock.toLowerCase()}`}>
                        <Link as={`/stock/${stock}`} href={`/post?id=${stock}&data=${x}`}>
                            <a>{stock}</a>
                        </Link>
                    </li>
                </ul>
            </Layout>
        )
    }
}

export default Dashboard;
