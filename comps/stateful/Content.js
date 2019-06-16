import fetch from 'isomorphic-unfetch';

class Content extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            id: props.itemdata
        };
    }

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

    render() {

        // Check that data has been retrieved
        const dataIsHere = () => {
            if (this.state.stocks){
                console.log(this.state.stocks.data)
                return this.state.stocks.data.financials[0]["grossProfit"]
             }
        }

        return (
            <div>
                <h1>{this.state.id}</h1>
                <p>{dataIsHere()}</p>

                <style jsx>{`
                    h1 {
                        font-family: "Muli", sans-serif;
                        font-size: 50px;
                        font-weight: 700;
                    }
                `}</style>
            </div>
        );
    }
}

export default Content;