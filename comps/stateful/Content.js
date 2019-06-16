import fetch from 'isomorphic-unfetch';

class Content extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            id: props.itemdata
        };
    }

    /**
     * Makes API call and returns a promise. This function is executed
     * when the component is mounted.
     * @returns {object} A promise to be resolved.
     */
    fetchData = async () => {
        const res = await fetch(`https://sandbox.iexapis.com/v1/stock/${this.state.id}/financials/2?token=Tpk_4a728bea05b54378b80585aa076cb8e5&period=annual`);
        const data = await res.json();
        return data;
    }

    componentDidMount() {

        this.fetchData().then(data => {
            this.setState({
                stocks: {data}
            });
        });
        
    }

    /**
     * This function renders the stock data points if the stock is set in state.
     * @TODO Refactor if possible to make neater.
     */
    renderData = () => {
        let listItems;
        // Check stock data exists
        if (this.state.stocks){
            listItems = Object.entries(this.state.stocks.data.financials[0]).map(item => {
                return (
                    <li className="list-item">{`${item[0].toUpperCase()}: ${item[1]}`}</li>
                );
            });
        }
        return listItems;
    }

    render() {
        return (
            <div>
                <h1>{this.props.itemdata}</h1>
                <div className="stock-data">
                    <ul>
                        {this.renderData()}
                    </ul>
                </div>

                <style jsx>{`
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
                `}</style>
            </div>
        );
    }
}

export default Content;