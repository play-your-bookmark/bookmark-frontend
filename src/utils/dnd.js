export function dragEnter(e) {
  e.preventDefault();
}

export function dragOver(e) {
  e.preventDefault();
}

export function dragLeave(e) {
  e.preventDefault();
}

export function dragStart(e) {
  let targetFolder;

  if (e.target.tagName === "a") {
    targetFolder = e.currentTarget;
  } else {
    targetFolder = e.target;
  }

  targetFolder.classList.add("drag-target");
  e.dataTransfer.effectAllowed = "move";
}

export function dragEnd(e) {
  e.target.classList.remove("drag-target");
  e.dataTransfer.dropEffect = "move";
}

export function drop(e, grabFolder) {
  e.preventDefault();
}
