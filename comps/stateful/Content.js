import fetch from 'isomorphic-unfetch';

class Content extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            id: props.itemdata,
            mounted: false
        };
    }

    /**
     * This function is executed when the component is mounted.
     * It makes an API call and returns a promise which will eventually update the component state.
     * @returns {object} data - A promise to be resolved.
     */
    fetchData = async () => {
        const res = await fetch(`https://sandbox.iexapis.com/v1/stock/${this.state.id}/financials/2?token=Tpk_4a728bea05b54378b80585aa076cb8e5&period=annual`);
        const data = await res.json();
        return data;
    }

    componentDidMount() {

        this.fetchData().then(data => {
            this.setState({
                stocks: {data},
                mounted: true
            });
        });
        
    }

    /**
     * This function renders the stock data points if the stock is set in state.
     * @TODO Refactor if possible to make neater.
     * @returns listItems - Returns JSX tags which contain the data.
     */
    renderData = () => {
        let listItems;
        // Check stock data exists
        if (this.state.stocks){
            listItems = Object.entries(this.state.stocks.data.financials[0]).map(item => {
                return (
                    <tr>
                        <td className="list-item">{`${item[0].toUpperCase()}`}</td>
                        <td className="list-item">{`${item[1]}`}</td>
                    </tr>
                );
            });
        }
        return listItems;
    }

    /**
     * This function creates a dynamic styles block which is separate from the static
     * styles. All dynamic styling after the component renders should be placed here.
     */
    renderDynamicStyles = () => {
        if (this.state.mounted == true){
            return (
                <style jsx>{`
                    tr:nth-child(odd) {
                        background-color: ${this.state.mounted === true ? 'grey' : 'black'};
                    }
                `}</style>
            );
        }
    }

    render() {
        return (
            <div>
                <small>All data provided by the IPEX.</small>
                <h1>{this.props.itemdata}</h1>
                <div className="stock-data">
                    <tbody>
                        {this.renderData()}
                    </tbody>
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
                {
                    // Render dynamic styles from dynamicStyles.
                    this.renderDynamicStyles()
                }
            </div>
        );
    }
}

export default Content;