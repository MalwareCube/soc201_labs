import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <header>
                <nav className="navbar">
                        <div className="navbar_content">
                        <Link to={`/`} className="navbar_logo">Security Operations (SOC) 201 | Labs</Link>
                    </div>
                </nav>
                <div className="navbar_spacer_1"></div>
                <div className="navbar_spacer_2"></div>
            </header>
        </>
    );
};

export default Header;