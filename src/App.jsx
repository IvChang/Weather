import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Aujourdhui from "./Containers/Aujourdhui";
import Heure from "./Containers/Heure";
import Quotidien from "./Containers/Quotidien";
import RootLayout from "./Containers/Roots";

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
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
