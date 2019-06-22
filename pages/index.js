import Layout from '../containers/Layout';
import Register from '../comps/stateful/Register';
import Login from '../comps/stateful/Login';


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
                { 
                    this.state.renderReg ? 
                    <Register redirect={this.redirectToLogin}/> : 
                    <Login redirect={this.redirectToReg}/>
                }
            </Layout>
        )
    }
}

export default Index;
