export const insertContentIntoBlock = (content: string = '', buttonId: string) => {
  const blockId = 'entryIdsBlock'
  const blockElement = document.getElementById(blockId)
  const buttonElement = document.getElementById(buttonId)

  if (!content) {
    return
  }

  if (blockElement) {
    blockElement.innerText = content
  } else {
    const textElement = document.createElement('div');
    textElement.id = blockId
    textElement.innerText = content
    buttonElement.parentNode.insertBefore(textElement, buttonElement.nextSibling);
  }

}