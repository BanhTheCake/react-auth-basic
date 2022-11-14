import { useNavigate, Link } from 'react-router-dom';
import useLogout from '../../api/useLogout';
import './Home.scss';

const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const handleLogout = async () => {
        await logout();
        navigate('/linkpage');
    };

    return (
        <section className="container home">
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to="/editor">Go to the Editor page</Link>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />
            <Link to="/lounge">Go to the Lounge</Link>
            <br />
            <Link to="/linkpage">Go to the link page</Link>
            <div className="flexGrow">
                <button onClick={handleLogout}>Sign Out</button>
            </div>
        </section>
    );
};

export default Home;
