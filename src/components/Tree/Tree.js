import React from "react";
import { addFolder, buildTree, relocateFolder, removeFolder } from "../utils/tree";

export default function Tree () {
  // build tree 
  const folderTree = buildTree(0, []);
  
  // relocate branch
  relocateFolder(folderTree, "g", "f", "root");
  console.log(folderTree);
  return (
    <div>

    </div>
  )
}

