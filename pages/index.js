import Layout from '../containers/Layout';
import Authenticate from '../comps/stateful/Authenticate';
import Login from '../comps/stateful/Login';
import Link from 'next/link';


const stock = "AAPL";


class Index extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            renderReg: true 
        }
        this.redirectToLogin = this.redirectToLogin.bind(this);
        this.redirectToReg = this.redirectToReg.bind(this);
    }

    redirectToLogin = () => {
        this.setState({
            renderReg: false
        });
    }
    redirectToReg = () => {
        this.setState({
            renderReg: true
        });
    }

    render() {
        return (
            <Layout>
                { this.state.renderReg ? <Authenticate redirect={this.redirectToLogin}/> : <Login redirect={this.redirectToReg}/>}
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

export default Index;
