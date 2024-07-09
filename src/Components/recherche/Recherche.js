import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { GEO_API_URL, geoApiOptions } from "../../Api";

const Recherche = (onRechercheChange) => {

    const [recherche, setRecherche] = useState(null);

    // Retourne des villes comme options avec GeoDB Cities
    // Ignore les petites villes moins de 20000 habitants
    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}/cities?minPopulation=20000&namePrefix=${inputValue}`, geoApiOptions)
            .then(response => response.json())
            .then(response => { return {
                options: response.data.map((city) => {
                    // Retourne la latitude et la longitude nécessaires pour appeller le data du météo courant
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`,
                    }
                })
            }
        })
            .catch(err => console.error(err));
    }

    const handleOnChange = (data) => {
        setRecherche(data);
        onRechercheChange(data);
    }

    return (
        <AsyncPaginate
            placeholder="Rechercher une ville"
            debounceTimeout={700}
            value={recherche}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}

export default Recherche;