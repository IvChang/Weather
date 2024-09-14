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


export default function Quotidien(props) {
    const journees = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const jourDeSemaine = new Date().getDay();
    //Trouver les prochaines journées, incluant celles de la prochaine semaine
    const prochainsJours = journees.slice(jourDeSemaine, journees.length).concat(journees.slice(0, jourDeSemaine));
    
    let jourCourant = new Date(props.aujourdhui.dt * 1000).getDay();
    let listeQuotidien = [];
    let index = 0;
    let interval = 0;
    let descriptionCtr = {};

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
            case "light rain":
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
    console.log(jourCourant);

    //OpenWeather Api offre des données à chaque 3 heures pour les 5 prochaines journées. On vérifie donc qu'on n'affiche pas la même journée plusieurs fois.
    //On compare aussi plusieurs données pour trouver celles représentant la journée.
    props.data.list.slice(0, 40).map((jour, idx) => {
        if (parseInt(jour.dt_txt.substring(8, 10)) > jourCourant || parseInt(jour.dt_txt.substring(8, 10)) == 1 && parseInt(jour.dt_txt.substring(8, 10)) < jourCourant) {
            jourCourant = parseInt(jour.dt_txt.substring(8, 10));
            listeQuotidien[index] = {
                date: jourCourant,
                tempMax: props.data.list[idx].main.temp,
                tempMin: props.data.list[idx].main.temp,
                pop: props.data.list[idx].pop,
                humidite: 0,
                vent: 0,
                description: "",
                image: null
            }
            descriptionCtr = {};
            index++;
            interval = 0;
        }
        if (listeQuotidien[index - 1] != null) {
            if (props.data.list[idx].main.temp > listeQuotidien[index - 1].tempMax) {
                listeQuotidien[index - 1].tempMax = props.data.list[idx].main.temp;
            }
            if (props.data.list[idx].main.temp < listeQuotidien[index - 1].tempMin) {
                listeQuotidien[index - 1].tempMin = props.data.list[idx].main.temp;
            }
            if (props.data.list[idx].pop > listeQuotidien[index - 1].pop) {   //Le Probability of Precipitation de la journée est le maximum de tous les moments donnés
                listeQuotidien[index - 1].pop = props.data.list[idx].pop;
            }
            
            listeQuotidien[index - 1].humidite = listeQuotidien[index - 1].humidite + props.data.list[idx].main.humidity;  //L'humidité de la journée est la moyenne de tous les moments donnés
            listeQuotidien[index - 1].vent = listeQuotidien[index - 1].vent + props.data.list[idx].wind.speed * 3.6;  //La vitesse du vent est la moyenne de tous les moments
            interval++;
            if (props.data.list[idx + 1] == null || props.data.list[idx + 1].dt_txt.substring(8, 10) > jourCourant) {
                listeQuotidien[index - 1].humidite = listeQuotidien[index - 1].humidite / interval;
                listeQuotidien[index - 1].vent = listeQuotidien[index - 1].vent / interval;
            }
            
            //La description de la météo est celle qui revient le plus souvent pour la journée
            if (!descriptionCtr[props.data.list[idx].weather[0].description]) {
                descriptionCtr[props.data.list[idx].weather[0].description] = 1;
            } else {
                descriptionCtr[props.data.list[idx].weather[0].description]++;
            }

            listeQuotidien[index - 1].description = traduire(Object.keys(descriptionCtr).reduce((a, b) => descriptionCtr[a] > descriptionCtr[b] ? a : b)).description;
            listeQuotidien[index - 1].image = traduire(Object.keys(descriptionCtr).reduce((a, b) => descriptionCtr[a] > descriptionCtr[b] ? a : b)).image;
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