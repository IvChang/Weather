import "./Aujourdhui.css";
import Nuageux from "../Assets/Nuageux.jpg";

export default function Aujourdhui({data}) {
    console.log(data);
    let ciel;
    switch(data.weather[0].description) {
        case "clear sky":
            ciel = "Ciel clair";
            break;
        case "few clouds":
            ciel = "Peu nuageux"
            break;
        case "broken clouds":
            ciel = "Partiellement nuageux"
            break;
        case "overcast clouds":
            ciel = "Nuageux";
            break;
        case "light intensity shower rain":
            ciel = "Pluie légère";
            break;
        default:
            ciel = "Pluie";
    }

    return (
        <>
            <div className="blocPrincipal">
                <img src={Nuageux} />
                <div className="ruban">
                    <label>{data.ville}</label>
                </div>

                <h2>{ciel}</h2>
                <div className="tempCourant">
                    <h1>30°</h1>
                    <p>C</p>
                </div>

                <div className="sentComme">
                    <p>Sent comme</p>
                    <h3>33°</h3>
                    <p>C</p>
                </div>


            </div>

            <div className="blocSecondaire">
                <p>Haut / Bas</p>
                <h2>34°/23°</h2>
                <hr></hr>
                <p>Vent</p>
                <h2>NE 14 km/h</h2>
                <hr></hr>
                <p>Humidité</p>
                <h2>58%</h2>
                <hr></hr>
                <p>Lever / Coucher</p>
                <h2>5:19 AM/8:42 PM</h2>
                <hr></hr>
            </div>
        </>
    )
};