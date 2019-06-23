import Register from '../comps/stateful/Register';
import Login from '../comps/stateful/Login';

class Forms extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            toggle: true 
        }
        this.toggleForm = this.toggleForm.bind(this);
    }

    toggleForm = () => {
        const toggleState = this.state.toggle;
        toggleState ? this.setState({ toggle: false }) : this.setState({ toggle: true })
    }

    render() {
        return (
            <div>
                { 
                    this.state.toggle 
                        ? <Register redirect={this.toggleForm}/> 
                        : <Login redirect={this.toggleForm}/>
                }
            </div>
        )
    }
}

export default Forms;
