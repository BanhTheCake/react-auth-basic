import { useNavigate } from "react-router-dom"
import './Unauthorized.scss'


const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section className="container unauthorized">
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <div className="flexGrow">
                <button className="unauthorized-btn" onClick={goBack}>Go Back</button>
            </div>
        </section>
    )
}

export default Unauthorized