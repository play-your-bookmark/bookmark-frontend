import React from "react";
import Tree from "../Tree/Tree";
import LinkList from '../Link/LinkList';
import Dnd from "../Dnd/Dnd";

function App() {
  return (
    <div className="App">
      <Tree />
      <LinkList />
      <Dnd />
    </div>
  );
}

export default App;
