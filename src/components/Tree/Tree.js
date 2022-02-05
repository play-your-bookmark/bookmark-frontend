import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreatedFolder } from "../../redux/slices/folderSlices";
import { addFolder, addLink, buildTree, relocateFolder, removeFolder, removeLink } from "../../utils/tree"
import CATEGORY from "../../utils/category.json"

export default function Tree () {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCreatedFolder())
  }, []);
  /* 
  1. build tree 
  const folderTree = buildTree(0, []);
  */
 
  /* 
  2. relocate folder
  relocateFolder(folderTree, "g", "f", "root");
  */

  /*
  3. add folder
  addFolder(CATEGORY["mainCategory"][0]["subCategory"][5]["name"], newFolderCount, "파이썬 배우기", folderTree, "g");
  */ 
  
  /*
  4. remove folder
  removeFolder("Python 0 g", "g", folderTree);
  */

  /*
  5. add Link
  addLink(folderTree, "a", "root", "vanilla.com");
  */

  /*
  6. remove Link
  removeLink(folderTree, "a", "root", "vanilla.com");
  */

 
  return (
    <div>
      
    </div>
  )
}
