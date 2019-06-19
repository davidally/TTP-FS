import Layout from '../containers/Layout';
import Content from '../comps/stateful/Content';
import fetch from 'isomorphic-unfetch';


class Post extends React.Component {
    static async getInitialProps(ctx) {
        const res = await fetch(`https://sandbox.iexapis.com/v1/stock/${ctx.query.id}/financials/2?token=Tpk_4a728bea05b54378b80585aa076cb8e5&period=annual`);
        const data = await res.json();
        return data
    }

    render() {
        return (
            <Layout>
                <Content data={this.props}/>
            </Layout>
        )
    }
}

export default Post;