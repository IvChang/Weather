import "./Aujourdhui.css";
import Nuageux from "../Assets/Nuageux.jpg";

export default function Aujourdhui({data}) {
    console.log(data);

    let lever = new Date(data.sys.sunrise * 1000);
    let coucher = new Date(data.sys.sunset * 1000);

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

    let direction;
    let degree = data.wind.deg;
    switch(true) {
        case (degree >= 340 && degree <= 360 || degree >= 0 && degree <= 20):
            direction = "N";
            break;
        case (degree >= 21 && degree <= 69):
            direction = "NE";
            break;
        case (degree >= 70 && degree <= 110):
            direction = "E";
            break;
        case (degree >= 111 && degree <= 159):
            direction = "SE";
            break;
        case (degree >= 160 && degree <= 200):
            direction = "S";
            break;
        case (degree >= 201 && degree <= 249):
            direction = "SW";
            break;
        case (degree >= 250 && degree <= 290):
            direction = "W";
            break;
        case (degree >= 291 && degree <= 339):
            direction = "NW";
            break;
        default:
            direction = "-";
            break;
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
                    <h1>{Math.round(data.main.temp)}°</h1>
                    <p>C</p>
                </div>

                <div className="sentComme">
                    <p>Sent comme</p>
                    <h3>{Math.round(data.main.feels_like)}°</h3>
                    <p>C</p>
                </div>


            </div>

            <div className="blocSecondaire">
                <p>Haut / Bas</p>
                <h2>{Math.round(data.main.temp_max)}°/{Math.round(data.main.temp_min)}°</h2>
                <hr></hr>
                <p>Vent</p>
                <h2>{direction} {Math.round(data.wind.speed * 3.6)} km/h</h2>
                <hr></hr>
                <p>Humidité</p>
                <h2>{data.main.humidity}%</h2>
                <hr></hr>
                <p>Lever / Coucher</p>
                <h2>{lever.getHours()}:{lever.getMinutes()} / {coucher.getHours()}:{coucher.getMinutes()}</h2>
                <hr></hr>
            </div>
        </>
    )
};