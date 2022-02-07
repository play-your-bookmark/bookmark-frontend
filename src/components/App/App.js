import { useRoutes } from "react-router-dom";
import routes from "./routes";

function App({ auth }) {
  const routing = useRoutes(routes(auth));

  return routing;
}

export default App;
