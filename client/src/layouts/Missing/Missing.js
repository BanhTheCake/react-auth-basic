import { Link } from "react-router-dom"
import './Missing.scss'

const Missing = () => {
    return (
        <article className="container missing">
            <h1>Oops!</h1>
            <p>Page Not Found</p>
            <div className="flexGrow">
                <Link to="/">Visit Our Homepage</Link>
            </div>
        </article>
    )
}

export default Missing