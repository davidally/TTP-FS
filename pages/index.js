import Layout from '../containers/Layout';
import Link from 'next/link';

/**
 * The Postlink component accepts props which are like HTML attributes.
 * Props are HTML attributes. 
 * @param {*} props
 * @TODO Send chart data to each page from stocks prop 
 */
const stock = "AAPL";

const Index = (props) => (
    <div>
        <Layout>
            <h1>Viewing Stocks</h1>
            <ul>
                <li key={`${stock.toLowerCase()}`}>
                    <Link as={`/stock/${stock}`} href={`/post?id=${stock}`}>
                        <a>{stock}</a>
                    </Link>
                </li>
            </ul>
        </Layout>
    </div>
);

export default Index;