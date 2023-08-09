import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: '/auth',
        element: <Authentication />
      }
    ]
    , errorElement: <h1>Error</h1>

  },

])

const App = () => {
  return <RouterProvider router={router} />
}

export default App;
