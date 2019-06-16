import Head from 'next/head';
import Header from '../comps/stateless/Header';
import Footer from '../comps/stateless/Footer';

const Layout = (props) => (
    <div>
        <Head>
            <title>Stockfolio</title>
            <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.18.1/build/cssreset/cssreset-min.css"/>
            <link href="https://fonts.googleapis.com/css?family=Muli|Open+Sans&display=swap" rel="stylesheet" /> 
        </Head>
        <Header />
            <div className="main-content">
                {props.children}
            </div>
        <Footer />

        <style jsx>{`
            * {
                font-family: "Open Sans", sans-serif;
            }

            .main-content {
                margin: 20px;
            }
        `}</style>
    </div>
);

export default Layout;