import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Aujourdhui from "./Containers/Aujourdhui";
import Heure from "./Containers/Heure";
import Quotidien from "./Containers/Quotidien";
import RootLayout from "./Containers/Roots";
import Recherche from "./Components/recherche/Recherche";
import { WEATHER_API_URL } from "./Api";
import { WEATHER_API_KEY } from "./Api";
import { useState } from "react";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/aujourdhui", element: <Aujourdhui /> },
      { path: "/heure", element: <Heure /> },
      { path: "/quotidien", element: <Quotidien /> }
    ],
  },
])

function App() {

  const [meteoCourant, setMeteoCourant] = useState(null);
  const [meteoQuotidien, setMeteoQuotidien] = useState(null);

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

  console.log(meteoCourant);
  console.log(meteoQuotidien);

  return (
    <div>
      <Recherche onRechercheChange={handleOnRechercheChange} />
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
