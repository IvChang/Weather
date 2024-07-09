import { NavLink } from "react-router-dom";

export default function Liens() {
    return (
        <ul >
            <li>
                <NavLink to="/Aujourdhui">Aujourd'hui</NavLink>
            </li>
            <li>
                <NavLink to="/Heure">Par Heure</NavLink>
            </li>
            <li>
                <NavLink to="/Quotidien">Quotidien</NavLink>
            </li>
            
        </ul>
    )
}