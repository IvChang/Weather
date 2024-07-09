import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Aujourdhui from "./Containers/Aujourdhui";
import Heure from "./Containers/Heure";
import Quotidien from "./Containers/Quotidien";
import RootLayout from "./Containers/Roots";
import Recherche from "./Components/recherche/Recherche";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/aujourdhui", element: <Aujourdhui />},
      { path: "/heure", element: <Heure />},
      { path: "/quotidien", element: <Quotidien />}
    ],
  },
])

function App() {

  const handleOnRechercheChange = (data) => {
    console.log(data)
  }

  return (
    <div>
      <Recherche onRechercheChange={handleOnRechercheChange} />
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
