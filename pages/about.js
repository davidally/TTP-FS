import Layout from '../client/comps/Layout';

const About = () => {
    return (
        <Layout title={'About Stockfolio'} authorized={true}>
            <p>This is the about page.</p>
        </Layout>
    );
}

export default About;