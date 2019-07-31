const getTickers = require('../utils/symbols');


class Search extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            suggestions: [],
            text: '',
        };

    }

    componentDidMount() {
        getTickers().then(res => {
            this.setState({
                tickers: res
            })
        })
    }


    onTextChanged = (e) => {
        const { tickers } = this.state;
        const value = e.target.value;
        let suggestions = [];
        if (this.state.tickers){
            if (value.length > 0) {
                const regex = new RegExp(`^${value}`, 'i');
                suggestions = tickers.filter(v => regex.test(v));
            }
            this.setState(() => ({ suggestions, text: value }));
        }
    };

    renderSuggestions = () => {
        const { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul style={{ 
                borderTop: '1px solid #b7b7b7',
                maxHeight: '200px',
                overflowY: 'scroll',
                overflowX: 'hidden'
            }}>
                {
                    suggestions.map(
                        (item, index) => <li className="ticker-item" key={`${item}-${index}`} onClick={() => this.selectedSuggestion(item)}>
                            {item}
                            <style jsx>{`

                                li {
                                    padding: 10px 15px;
                                }

                                li:hover {
                                    cursor: pointer;
                                    text-decoration: underline;
                                    background-color: rgba(128,128,128, 0.20);
                                }
                            `}</style>
                        </li>)
                }
            </ul>
        );
    };

    selectedSuggestion = (value) => {
        this.setState(() => ({
            text: value,
            suggestions: []
        }));
        this.props.handleTicker(value);
    }

    render() {
        const { text } = this.state;

        return (
            <div className="container">
                <input value={text} onChange={this.onTextChanged} placeholder="Search ticker symbols" type="text"/>
                {this.renderSuggestions()}

            <style jsx>{`

                ul::-webkit-scrollbar {
                    width: 6px;
                    background-color: #F5F5F5;
                } 

                .container {
                    margin: 5px 0;
                    border: 1px solid #b7b7b7;
                    width: 100%;
                    box-shadow: 0 0 0 1px rgba(0,0,0,.1), 0 2px 4px 1px rgba(0,0,0,.18);
                    background-color: white;
                }
    
                input {
                    width: 100%;
                    height: 50px;
                    border: none;
                    padding: 0 10px;
                    box-sizing: border-box;
                }

                input:focus {
                    outline: none;
                }
            `}</style>
            </div>
        );
    }
}

export default Search;