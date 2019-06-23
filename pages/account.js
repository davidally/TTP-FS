import Layout from '../client/comps/Layout/Layout';


class Dashboard extends React.Component {
    // static async getInitialProps({req}){
    //     const baseURL = req ? `${req.protocol}://${req.get("Host")}` : "";
    //     const res = await fetch(`${baseURL}/api/access`);
    //     const data = await res.json();
    //     return {data}
    // }

    render() {
        return (
            <Layout>
                
            </Layout>
        )
    }
}

export default Dashboard;