import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

const Layout = (props) => (
    <div className="app">
        <Head>
            <title>Stockfolio - Buy Stocks</title>
            <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.18.1/build/cssreset/cssreset-min.css"/>
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,700|Nunito+Sans:200,900|Open+Sans&display=swap" rel="stylesheet" /> 
        </Head>
        <Header />
            <div className="main-content">
                {props.children}
            </div>
        <Footer />
        <style jsx global>{`

             * {
                font-family: "Open Sans", sans-serif;
            }

            .main-content {
                margin: 20px;
            }
            
            p {
                color: black;
            }

            h1 {
                font-family: 'Roboto', sans-serif;
                font-weight: 300;
                font-size: 88px;
                color: rgb(22, 50, 92);
            }

            button,
            a {
                cursor: pointer;
            }

            a:hover {
                text-decoration: underline;
            }

            .form-caption {
                color: rgb(191, 67, 27);
            }

            .error-alert {
                margin-left: 10px;
                color: red;
            }

            .btn {
                font-family: 'Roboto', sans-serif;
                font-weight: 700;
                text-transform: uppercase;
                color: white;
                border-radius: 30px;
                border: none;
                padding: 15px 25px;
                background-color: #0b61ea;
                letter-spacing: 1px;
                margin-top: 20px;
            }

            
            .btn:hover {
                background-color: rgba(0,0,0,0);
                color: black;
                border: 2px solid #0b61ea;
            }
            
            .alt {
                background-color: #fc2a51;
            }
            
            .alt:hover {
                border: 2px solid #fc2a51;
            }
            
        `}</style>
    </div>
);

export default Layout;