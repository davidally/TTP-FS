import Layout from '../containers/Layout';
import Content from '../comps/stateful/Content';
import { withRouter } from 'next/router';

const Page = withRouter(props => (
    <Layout>
        <Content name={props.router.query.id} inputData={props.router.query.data}/>
    </Layout>
));

export default Page;