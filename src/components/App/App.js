import { useRoutes } from "react-router-dom";
import model from "../../model/model";
import routes from "./routes";

function App({ auth }) {
  const routing = useRoutes(routes(auth));
  model.get();
  return routing;
}

export default App;
