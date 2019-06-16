import Link from 'next/link';

const navMenu = [
    ["/", "Home"],
    ["/about", "About"],
    ["/login", "Login"],
    ["/register", "Register"],
];

const Header = () => (
    <div>
        <ul>
            {
                navMenu.map(item =>
                    <li>
                        <Link href={item[0]}>
                            <a>{item[1]}</a>
                        </Link>
                    </li>
                )
            }
        </ul>

        <style jsx>{`
            div {
                background: #333;
                width: 100;
                height: 200px;
            }

            ul {
                display: flex;
                list-style: none;
            }

            li {
                margin-right: 20px;
            }
        `}</style>
    </div>
);

export default Header;