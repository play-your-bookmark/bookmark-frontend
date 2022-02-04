import FOLDERS from "./folders.json";
import CATEGORY from "./category.json";

const USE_MOCK_DATA = true;

export const buildTree = (level, folderTree) => {
  if (USE_MOCK_DATA) {
    level === 0 && folderTree.push(FOLDERS[0].id)

    const parentId = folderTree[0];
    const temp = folderTree;
    for (let i = 1; i < FOLDERS.length; i++) {
      if (FOLDERS[i]['parent_folder'] === parentId) {
        temp.push([FOLDERS[i].id]);
      }
    }
  
    for (let i = 1; i < temp.length; i++) {
      const subTree = temp[i];
      buildTree(level + 1, subTree);
    }  

    return folderTree;
  }
}

export const addFolder = (folderTree, parentId) => {
  
}

const setCategory = () => {

}

const createFolder = () => {

}

export const removeFolder = () => {

}

export const relocateFolder = (folderTree, targetId, currentParentId, newParentId) => {
  let currentSubtree = folderTree[0] === currentParentId ? folderTree : null;
  let targetSubtree = folderTree[0] === newParentId ? folderTree : null;

  const findFolder = (tree) => {
    if (USE_MOCK_DATA){
      if (tree.length === 0) {
        return;
      }

      for (let i = 1; i < tree.length; i++) {
        const subtree = tree[i];
        if (subtree[0] === currentParentId) {
          currentSubtree = tree[i];
        }

        if (subtree[0] === newParentId) {
          targetSubtree = tree[i];
        }

        if (targetSubtree && currentSubtree) {
          break;
        }

        findFolder (subtree);
      }
    }  
  }

  findFolder(folderTree);

  for (let i = 0; i < currentSubtree.length; i++) {
    if (currentSubtree[i][0] === targetId) {
      const targetArray = currentSubtree.splice(i, 1);
      targetSubtree.push(targetArray);
      break;
    }
  }
}
