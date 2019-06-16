import Link from 'next/link';

const footerStyles = {
    marginTop: 20,
    paddingTop: 20,
    borderTop: "1px solid black"
}

const Footer = () => (
    <div style={footerStyles}>
        <Link href="/"><a>Home</a></Link>
    </div>
);

export default Footer;