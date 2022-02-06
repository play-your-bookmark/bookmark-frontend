export const dragOver = (e) => {
  e.preventDefault();
};

export const dragStart = (e) => {
  const targetFolder = e.target;

  targetFolder.classList.add("drag-target");
  e.dataTransfer.effectAllowed = "move";

  e.dataTransfer.setData("targetFolder_id", e.target.dataset.id);
};

export const dragEnd = (e) => {
  e.target.classList.remove("drag-target");

  e.dataTransfer.dropEffect = "move";
};

export const drop = (targetFolder, folderList, grabFolder) => {
  const grabFolderId = grabFolder.dataset.id;
  const grabFolderIndex = folderList.findIndex(folder => folder.id === grabFolderId);

  //css조작
  //targetFolder.appendChild(grabFolder);
  grabFolder.style.display = "block";

  return grabFolderIndex;
}
