class Content extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            mounted: false
        };
    }

    componentDidMount() {
        this.setState({
            mounted: true
        });
    }

    /**
     * This function renders the stock data points if the stock is set in state.
     * @returns listItems - Returns JSX tags which contain the data.
     */
    renderData = () => {
        return Object.entries(this.props.data.financials[0]).map((item, index) => (
                <tr key={`${item}-${index}`}>
                    <td className="list-item">{`${item[0].toUpperCase()}`}</td>
                    <td className="list-item">{`${item[1]}`}</td>
                </tr>
            )
        );
    }

    /**
     * This function creates a dynamic styles block which is separate from the static
     * styles. All dynamic styling after the component renders should be placed here.
     */
    renderDynamicStyles = () => {
        if (this.state.mounted == true){
            return (
                `
                tr:nth-child(odd) {
                    background-color: 'grey';
                }
                `
            );
        }
    }

    render() {
        return (
            <div>
                <small>All data provided by the IPEX.</small>
                <h1>{this.props.name}</h1>
                <div className="stock-data">
                    <table>
                        <tbody>
                            {this.renderData()}
                        </tbody>
                    </table>
                </div>
                
                <style jsx>{
                    // Static styles
                    `
                    h1 {
                        font-family: "Muli", sans-serif;
                        font-size: 50px;
                        font-weight: 700;
                    }

                    .stock-data {
                        border: 1px solid grey;
                        border-radius: 5px;
                        padding: 20px;
                        color: #474747;
                        background-color: #efefef;
                    }
                    `
                }</style>
                <style>
                    {
                        // Render dynamic styles from dynamicStyles.
                        this.renderDynamicStyles()
                    }
                </style>
            </div>
        );
    }
}

export default Content;