import Link from 'next/link';
import { navMenu } from './Header';

const Footer = () => (
    <div>
        <ul>
            {
                navMenu.map((item, index) =>
                    <li key={`${item}-${index}`}>
                        <Link href={item[0]}>
                            <a>{item[1]}</a>
                        </Link>
                    </li>
                )
            }
        </ul>
    </div>
);

export default Footer;