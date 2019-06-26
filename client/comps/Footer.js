const Footer = () => (
    <div className="foot-container">
        <div className="foot-caption">
            <p>Stockfolio INC., David Ally 2019.</p>
        </div>

        <style jsx>{`

        .foot-container{
            background-color: #333;
            max-height: 100%;
            width: 100%;
            margin-top: 100px;
            text-align: center;
            position: fixed;
            bottom: 0;
        }

        .foot-caption {
            padding: 30px;
        }

        .foot-caption p {
            font-family: 'Roboto', 'sans-serif';
            font-size: 15px;
            color: white;
        }
        `}</style>
    </div>
);

export default Footer;