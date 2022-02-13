import { useRoutes } from "react-router-dom";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

function App({ auth }) {
  const routing = useRoutes(routes(auth));
  return routing;
}

export default App;
