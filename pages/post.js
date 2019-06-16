import Layout from '../containers/Layout';
import Content from '../comps/stateful/Content';
import { withRouter } from 'next/router';

const Page = withRouter(props => (
    <Layout>
        <Content itemdata={props.router.query.id}/>
    </Layout>
));

export default Page;