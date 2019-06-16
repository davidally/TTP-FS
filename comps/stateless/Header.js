import Link from 'next/link';

const navMenu = [
    ["/", "Home"],
    ["/about", "About"],
    ["/login", "Login"],
    ["/register", "Register"],
];

const Header = () => (
    <div className="navigation">
        <div className="nav-menu">
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
        </div>

        <style jsx>{`
            .navigation {
                background: #333;
                width: 100%;
                padding: 20px 0;
            }

            .nav-menu {
                display: flex;
                justify-content: center;
                list-style: none;
            }

            .nav-menu li {
                margin-right: 20px;
                display: inline;
            }
        `}</style>
    </div>
);

export default Header;