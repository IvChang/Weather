import "./Liens.css";
import { NavLink } from "react-router-dom";

export default function Liens() {
    return (
        <ul className="liens">
            <li>
                <NavLink to="/Aujourdhui">Aujourd'hui</NavLink>
            </li>
            <li>
                <NavLink to="/Quotidien">Quotidien</NavLink>
            </li>
            
        </ul>
    )
}