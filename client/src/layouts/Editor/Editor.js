import { Link } from "react-router-dom"
import './Editor.scss'

const Editor = () => {
    return (
        <section className="container editor">
            <h1>Editors Page</h1>
            <br />
            <p>You must have been assigned an Editor role.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Editor