import React, { useState } from "react";
import { addFolder, buildTree, relocateFolder, removeFolder } from "../../utils/tree"
import CATEGORY from "../../utils/category.json"

export default function Tree () {
  const [ newFolderCount, setNewFolderCount ] = useState(0);

  /* 
  1. build tree 
  -> const folderTree = buildTree(0, []);
  */
 
  /* 
  2. relocate folder
  -> relocateFolder(folderTree, "g", "f", "root");
  */

  /*
  3. add folder
  -> addFolder(CATEGORY["mainCategory"][0]["subCategory"][5]["name"], newFolderCount, "파이썬 배우기", folderTree, "g");
  */ 
  
  /*
  4. remove folder
  -> removeFolder("Python 0 g", "g", folderTree);
  */
 
  return (
    <div>
      
    </div>
  )
}
