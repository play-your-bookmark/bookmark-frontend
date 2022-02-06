import FOLDERS from "./folders.json";

const USE_MOCK_DATA = true;

export const buildTree = (level, folderTree) => {
  if (USE_MOCK_DATA) {
    level === 0 && folderTree.push(FOLDERS[0].id, FOLDERS[0].title, []);

    const parentId = folderTree[0];
    const temp = folderTree;
    for (let i = 1; i < FOLDERS.length; i++) {
      if (FOLDERS[i]["parent_folder"] === parentId) {
        temp.push([FOLDERS[i].id, FOLDERS[i].title, FOLDERS[i].bookmark]);
      }
    }

    for (let i = 3; i < temp.length; i++) {
      const subTree = temp[i];
      buildTree(level + 1, subTree);
    }

    return folderTree;
  }
}

export const addFolder = (category, newFolderCount, title, folderTree, parentId) => {
  if (!folderTree[3]) {
    return;
  }

  for (let i = 3; i < folderTree.length; i++) {
    if (folderTree[i][0] === parentId) {
      const newFolder = createFolder(category, parentId, newFolderCount, title);
      folderTree[i].push(newFolder);
      return;
    }

    addFolder(category, newFolderCount, title, folderTree[i], parentId);
  }
}

const createFolder = (category, parentId, newFolderCount, title) => {
  return [
    `${category} ${newFolderCount} ${parentId}`,
    title,
    [],
  ]
}

export const removeFolder = (targetId, parentId, folderTree) => {
  let targetArray = null;
  if (!folderTree[3]) {
    return;
  }

  for (let i = 3; i < folderTree.length; i++) {
    if (folderTree[i][0] === parentId) {
      targetArray = folderTree[i];
      break;
    }

    removeFolder(targetId, parentId, folderTree[i]);
  }

  if (!targetArray) {
    return;
  }

  for (let i = 3; i < targetArray.length; i++) {
    if (targetArray[i][0] === targetId) {
      targetArray.splice(i, 1);
      return;
    }
  }
}

export const relocateFolder = (folderTree, targetId, currentParentId, newParentId) => {
  let currentSubtree = folderTree[0] === currentParentId ? folderTree : null;
  let targetSubtree = folderTree[0] === newParentId ? folderTree : null;

  const findFolder = (tree) => {
    if (USE_MOCK_DATA){
      if (tree.length === 0) {
        return;
      }

      for (let i = 3; i < tree.length; i++) {
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

  for (let i = 3; i < currentSubtree.length; i++) {
    if (currentSubtree[i][0] === targetId) {
      const targetArray = currentSubtree.splice(i, 1);
      targetSubtree.push(targetArray[0]);
      break;
    }
  }
}

export const addLink = (folderTree, targetId, parentId, bookmark) => {
  if (!folderTree[3]) {
    return;
  }

  let targetArray = parentId === "root" ? folderTree : null;

  for (let i = 3; i < folderTree.length; i++) {
    if (targetArray) {
      break;
    }

    if (folderTree[i][0] === parentId) {
      targetArray = folderTree[i];
      break;
    }

    addLink(folderTree[i], targetId, parentId);
  }
  for (let i = 3; i < targetArray.length; i++) {
    if (targetArray[i][0] === targetId) {
      targetArray[i][2].push(bookmark);
      return;
    }
  }
}

export const removeLink = (folderTree, targetId, parentId, bookmark) => {
  if (!folderTree[3]) {
    return;
  }

  let targetArray = parentId === "root" ? folderTree : null;
  let bookmarkArray = null;

  for (let i = 3; i < folderTree.length; i++) {
    if (targetArray) {
      break;
    }

    if (folderTree[i][0] === parentId) {
      targetArray = folderTree[i];
      break;
    }

    removeLink(folderTree[i], targetId, parentId, bookmark);
  }

  for (let i = 3; i < targetArray.length; i++) {
    if (targetArray[i][0] === targetId) {
      bookmarkArray = targetArray[i];
      break;
    }
  }

  for (let i = 0; i < bookmarkArray.length; i++) {
    if (bookmarkArray[i] === bookmark) {
      bookmarkArray.splice(i, 1);
      return;
    }
  }
}
