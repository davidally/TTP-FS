class Content extends React.Component {

    constructor(props){
        super(props);
    }

    /**
     * This function renders the stock data points if the stock is set in state.
     * @returns listItems - Returns JSX tags which contain the data.
     */
    renderDataTable = () => {
        return Object.entries(this.props.data.financials[0]).map((item, index) => (
                <tr className="data-row" key={`${item}-${index}`}>
                    <td className="list-item">{`${item[0].toUpperCase()}`}</td>
                    <td className="list-item">{`${item[1]}`}</td>
                </tr>
            )
        );
    }

    render() {
        return (
            <div>
                <small>All data provided by the IPEX.</small>
                <h1>{this.props.data.symbol}</h1>
                <div className="stock-data">
                    <table>
                        <tbody>
                            {this.renderDataTable()}
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

                    .data-row {
                        background-color: grey;
                    }
                    `
                }</style>
            </div>
        );
    }
}

export default Content;