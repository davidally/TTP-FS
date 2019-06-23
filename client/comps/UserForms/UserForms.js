import Register from './Forms/Register';
import Login from './Forms/Login';

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
            <div className="forms-container">
                { 
                    this.state.toggle 
                        ? <Register redirect={this.toggleForm}/> 
                        : <Login redirect={this.toggleForm}/>
                }

                <style jsx>{`
                    .forms-container {
                        border: 1px solid grey;
                        border-radius: 5px;
                        box-shadow: -5px 5px 8px rgb(0, 0, 0, 0.2);
                        padding: 20px;
                        width: 600px;
                        margin: 0 auto;
                    }
                `}</style>
            </div>
        )
    }
}

export default Forms;
