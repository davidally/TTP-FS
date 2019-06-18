import Link from 'next/link';

const navMenu = [
    ["/", "Home"],
    ["/about", "About"],
    ["/login", "Login"],
    ["/register", "Register"],
    ["/dashboard", "Dashboard"]
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

        <style jsx global>{`
                    p {
                        color: green;
                    }

                    h1 {
                        font-size: 50px;
                        color: rgb(22, 50, 92);
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
                        cursor: pointer;
                    }

                    .login-btn {
                        border: 2px solid #9e85fc;
                        border-radius: 4px;
                        padding: 10px 20px;
                        margin: 20px 0;
                        background-color: #f93e60;
                    }
                `}</style>
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