import Head from 'next/head';
import Header from './Sections/Header';
import Footer from './Sections/Footer';

const Layout = (props) => (
    <div>
        <Head>
            <title>Stockfolio - Buy Stocks</title>
            <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.18.1/build/cssreset/cssreset-min.css"/>
            <link href="https://fonts.googleapis.com/css?family=Muli|Open+Sans&display=swap" rel="stylesheet" /> 
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
                color: green;
            }

            h1 {
                font-size: 50px;
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
            
            .submit-btn {
                border: 2px solid #5194ff;
                border-radius: 4px;
                padding: 10px 20px;
                margin: 20px 0;
                background-color: #2a7afc;
            }
            
            .login-btn:hover,
            .submit-btn:hover {
                background-color: rgba(0,0,0,0);
            }
            
            .login-btn {
                border: 2px solid #9e85fc;
                border-radius: 4px;
                padding: 10px 20px;
                margin: 20px 0;
                background-color: #f93e60;
            }
        `}</style>
    </div>
);

export default Layout;