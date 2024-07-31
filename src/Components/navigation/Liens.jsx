import "./Liens.css";
import { NavLink } from "react-router-dom";
import { useState } from 'react';

export default function Liens() {
    const [barreActive, setBarreActive] = useState("animation bar-aujourdhui");

    return (
        <ul className="liens">
            <li>
                <NavLink to="/Aujourdhui" onClick={() =>setBarreActive("animation bar-aujourdhui")}>Aujourd'hui</NavLink>
            </li>
            <li>
                <NavLink to="/Quotidien" onClick={() =>setBarreActive("animation bar-quotidien")}>Quotidien</NavLink>
            </li>
            <div className={barreActive}></div>
            
            
        </ul>
    )
}