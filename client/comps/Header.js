import Link from 'next/link';

const Header = (props) => {
    const navMenu = [
        ["/", "home"],
    ];

    if (props.authorized) {
        navMenu.shift();
        navMenu.push(['/dashboard', 'dashboard'], ['/purchases', 'transactions'], ['/about', 'about'], ["/user/logout", "logout"]);
    }

    return (
    <div className="navigation">
        <div className="nav-menu">
            <ul>
                {
                    navMenu.map((item, index) =>
                        <li key={`${item}-${index}`}>
                            <Link href={item[0]} as={item[0]}>
                                <a>{item[1]}</a>
                            </Link>
                        </li>
                    )
                }
            </ul>
        </div>

        <style jsx>{`

            a {
                font-family: 'Roboto', sans-serif;
                font-size: 20px;
                text-decoration: none;
                color: white;
                text-transform: uppercase;
            }

            a:hover{
                text-decoration: none;
            }

            .navigation {
                background: #333;
                width: 100%;
                padding: 20px 0;
                box-shadow: 5px 5px 5px rgba(0,0,0,0.3);
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
    )
};

export default Header;