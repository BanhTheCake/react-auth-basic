import { Link } from "react-router-dom"
import './Lounge.scss'

const Lounge = () => {
    return (
        <section className="container lounge">
            <h1>The Lounge</h1>
            <br />
            <p>Admins and Editors can hang out here.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Lounge