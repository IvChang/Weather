import "./Quotidien.css";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

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
        let meteo;
        switch(description) {
            case "clear sky":
                meteo = "Ciel clair";
                break;
            case "few clouds":
                meteo = "Peu nuageux"
                break;
            case "broken clouds":
                meteo = "Partiellement nuageux"
                break;
            case "overcast clouds":
                meteo = "Nuageux";
                break;
            case "light intensity shower rain":
                meteo = "Pluie légère";
                break;
            default:
                meteo = "Pluie";
        }
        return meteo;
    }
    

    //OpenWeather Api offre des données à chaque 3 heures pour les 5 prochaines journées. On vérifie donc qu'on n'affiche pas la même journée plusieurs fois.
    //On compare aussi plusieurs données pour trouver celles représentant la journée.
    data.data.list.slice(0, 40).map((jour, idx) => {
        
        if (parseInt(jour.dt_txt.substring(8, 10)) > jourCourant) {
            jourCourant = parseInt(jour.dt_txt.substring(8, 10));
            listeQuotidien[index] = {
                date: jourCourant,
                tempMax: data.data.list[idx].main.temp,
                tempMin: data.data.list[idx].main.temp,
                pop: data.data.list[idx].pop,
                humidite: 0,
                vent: 0,
                meteo: ""
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
                listeQuotidien[index - 1].meteo = traduire(data.data.list[idx].weather[0].description);
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
                            <label className="jour">{prochainsJours[idx]} {jour.date}</label>
                            <label className="temp">{Math.round(jour.tempMax)}°/{Math.round(jour.tempMin)}</label>
                            <label className="paysage">{jour.meteo}</label>
                            <label className="precipitation">{jour.pop * 100}%</label>
                        </div>
                        
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <div className="info">
                        <hr></hr>
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