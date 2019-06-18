export class Confirm extends React.Component {

    // Onclick this.continue
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Confirm;
