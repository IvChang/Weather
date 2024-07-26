import "./Aujourdhui.css";
//les images viennent de unsplash.com
import CielClair from "../Assets/CielClair.jpg";
import PeuNuageux from "../Assets/PeuNuageux.jpg";
import PartielNuageux from "../Assets/PartielNuageux.jpg";
import Nuageux from "../Assets/Nuageux.jpg";
import Pluie from "../Assets/Pluie.jpg";

export default function Aujourdhui({ data }) {
    console.log(data);

    let lever = new Date(data.sys.sunrise * 1000);
    let coucher = new Date(data.sys.sunset * 1000);
    let meteo;
    let imgMeteo;
    switch (data.weather[0].description) {
        case "clear sky":
            meteo = "Ciel clair";
            imgMeteo = CielClair;
            break;
        case "few clouds":
            meteo = "Peu nuageux"
            imgMeteo = PeuNuageux;
            break;
        case "scattered clouds":
            meteo = "Nuages dispersés"
            imgMeteo = PeuNuageux;
            break;
        case "broken clouds":
            meteo = "Partiellement nuageux"
            imgMeteo = PartielNuageux;
            break;
        case "overcast clouds":
            meteo = "Nuageux";
            imgMeteo = Nuageux;
            break;
        case "light intensity shower rain":
            meteo = "Pluie légère";
            imgMeteo = Pluie;
            break;
        default:
            meteo = "Pluie";
            imgMeteo = Pluie;
    }

    let direction;
    let degree = data.wind.deg;
    switch (true) {
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
                <img src={imgMeteo} />
                <div className="ruban">
                    <label>{data.ville}</label>
                </div>

                <h2> {meteo} </h2>
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
                <p>Pression</p>
                <h2>{data.main.pressure}</h2>
            </div>
        </>
    )
};