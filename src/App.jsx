import "./App.css";

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Aujourdhui from "./Containers/Aujourdhui";
import Quotidien from "./Containers/Quotidien";
import RootLayout from "./Containers/Roots";
import Recherche from "./Components/recherche/Recherche";
import { WEATHER_API_URL } from "./Api";
import { WEATHER_API_KEY } from "./Api";
import { useState } from "react";



function App() {
  const [meteoCourant, setMeteoCourant] = useState(null);
  const [meteoQuotidien, setMeteoQuotidien] = useState(null);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Navigate to="/aujourdhui" replace />},
        { path: "/aujourdhui", element: <Aujourdhui data={meteoCourant} /> },
        { path: "/quotidien", element: <Quotidien data={meteoQuotidien} aujourdhui={meteoCourant.dt} /> }
      ],
    },
  ])



  const handleOnRechercheChange = (data) => {

    const [lat, lon] = data.value.split(" ");


    // Fetch à partir du lien avec la latitude, la longitude et ma cle d'API
    // Retourne des objets Promise
    const meteoCourantFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const meteoQuotidienFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([meteoCourantFetch, meteoQuotidienFetch])
      .then(async (response) => {
        const courantReponse = await response[0].json();
        const quotidienReponse = await response[1].json();

        setMeteoCourant({ ville: data.label, ...courantReponse });
        setMeteoQuotidien({ ville: data.label, ...quotidienReponse });
      })
      .catch((err) => console.log(err));
  }

  return (
    //Si la ville est déjà trouvé, la barre de recherche serait affiché en haut de la page et les liens (Aujourd'hui, Quotidien) seraient présents
    //Sinon, la recherche serait au milieu et les liens ne seraient pas affichés
    <div>
      {meteoCourant != null ?
        (
          <div>
            <Recherche villeTrouve={true} onRechercheChange={handleOnRechercheChange} />
            <RouterProvider router={routes} />
          </div>
          
        ) : (
          <div>
            <h1 className="titre">Rechercher une ville</h1>
            <Recherche villeTrouve={false} onRechercheChange={handleOnRechercheChange} />
          </div>
        )}
    </div>
  );
}

export default App;
