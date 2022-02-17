import { useRoutes } from "react-router-dom";
import styled from "styled-components";
import routes from "./routes";
import basicCursor from "../../src_assets/basicCursor.png";

const AppContainer = styled.div`
  cursor: url(${basicCursor}), auto;
`;

function App({ auth }) {
  const routing = useRoutes(routes(auth));

  return <AppContainer>{routing}</AppContainer>;
}

export default App;
