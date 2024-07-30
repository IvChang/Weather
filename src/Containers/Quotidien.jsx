import "./Quotidien.css";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import CielClair from "../Assets/CielClair.jpg";
import PeuNuageux from "../Assets/PeuNuageux.jpg";
import PartielNuageux from "../Assets/PartielNuageux.jpg";
import Nuageux from "../Assets/Nuageux.jpg";
import Pluie from "../Assets/Pluie.jpg";


export default function Quotidien(data) {
    const journees = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    console.log(data);
    const jourDeSemaine = new Date().getDay();
    //Trouver les prochaines journées, incluant celles de la prochaine semaine
    const prochainsJours = journees.slice(jourDeSemaine, journees.length).concat(journees.slice(0, jourDeSemaine));

    let jourCourant = parseInt(data.data.list[0].dt_txt.substring(8,10));
    let listeQuotidien = [];
    let index = 0;
    let interval = 0;

    const traduire = (description) => {
        let meteo = {
            description: "",
            image: null
        }
        switch(description) {
            case "clear sky":
                meteo.description = "Ciel clair";
                meteo.image = CielClair;
                break;
            case "few clouds":
                meteo.description = "Peu nuageux";
                meteo.image = PeuNuageux;
                break;
            case "scattered clouds":
                meteo.description = "Nuages dispersés";
                meteo.image = PeuNuageux;
                break;
            case "broken clouds":
                meteo.description = "Partiellement nuageux"
                meteo.image = PartielNuageux;
                break;
            case "overcast clouds":
                meteo.description = "Nuageux";
                meteo.image = Nuageux;
                break;
            case "light intensity shower rain":
                meteo.description = "Pluie légère";
                meteo.image = Pluie;
                break;
            default:
                meteo.description = "Pluie";
                meteo.image = Pluie;
        }
        return meteo;
    }
    

    //OpenWeather Api offre des données à chaque 3 heures pour les 5 prochaines journées. On vérifie donc qu'on n'affiche pas la même journée plusieurs fois.
    //On compare aussi plusieurs données pour trouver celles représentant la journée.
    data.data.list.slice(0, 40).map((jour, idx) => {
        if (parseInt(jour.dt_txt.substring(8, 10)) > jourCourant || parseInt(jour.dt_txt.substring(8, 10)) == 1 && parseInt(jour.dt_txt.substring(8, 10)) < jourCourant) {
            jourCourant = parseInt(jour.dt_txt.substring(8, 10));
            listeQuotidien[index] = {
                date: jourCourant,
                tempMax: data.data.list[idx].main.temp,
                tempMin: data.data.list[idx].main.temp,
                pop: data.data.list[idx].pop,
                humidite: 0,
                vent: 0,
                description: "",
                image: null
            }
            index++;
            interval = 0;
        }
        if (listeQuotidien[index - 1] != null) {
            if (data.data.list[idx].main.temp > listeQuotidien[index - 1].tempMax) {
                listeQuotidien[index - 1].tempMax = data.data.list[idx].main.temp;
            }
            if (data.data.list[idx].main.temp < listeQuotidien[index - 1].tempMin) {
                listeQuotidien[index - 1].tempMin = data.data.list[idx].main.temp;
            }
            if (data.data.list[idx].pop > listeQuotidien[index - 1].pop) {   //Le Probability of Precipitation de la journée est le maximum de tous les moments donnés
                listeQuotidien[index - 1].pop = data.data.list[idx].pop;
            }
            
            listeQuotidien[index - 1].humidite = listeQuotidien[index - 1].humidite + data.data.list[idx].main.humidity;  //L'humidité de la journée est la moyenne de tous les moments donnés
            listeQuotidien[index - 1].vent = listeQuotidien[index - 1].vent + data.data.list[idx].wind.speed * 3.6;  //La vitesse du vent est la moyenne de tous les moments
            interval++;
            if (data.data.list[idx + 1] == null || data.data.list[idx + 1].dt_txt.substring(8, 10) > jourCourant) {
                listeQuotidien[index - 1].humidite = listeQuotidien[index - 1].humidite / interval;
                listeQuotidien[index - 1].vent = listeQuotidien[index - 1].vent / interval;
            }
            
            if (data.data.list[idx].dt_txt.substring(11,13) == "12") {
                listeQuotidien[index - 1].description = traduire(data.data.list[idx].weather[0].description).description;
                listeQuotidien[index - 1].image = traduire(data.data.list[idx].weather[0].description).image;
            }
        }
    });
    console.log(listeQuotidien);

    return (
        
        <Accordion allowZeroExpanded>
            {listeQuotidien.map((jour, idx) => (
                <AccordionItem key={idx}>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        <div className="item">
                            <img src={jour.image} />
                            <label className="jour">{prochainsJours[idx]} {jour.date}</label>
                            <label className="temp">{Math.round(jour.tempMax)}°/{Math.round(jour.tempMin)}</label>
                            <label className="paysage">{jour.description}</label>
                            <label className="precipitation">{jour.pop * 100}%</label>
                        </div>
                        
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <div className="info">
                        <img src={jour.image} />
                        <div className="extra">
                            <div>
                                <label>Humidité </label>
                                <p>{Math.round(jour.humidite)} %</p>
                            </div>
                            
                            <div>
                                <label>Vent </label>
                                <p>{Math.round(jour.vent)} km/h</p>
                            </div>

                        </div>

                    </div>
                    
                </AccordionItemPanel>
            </AccordionItem>
))}
            
            
        </Accordion>
    )
};