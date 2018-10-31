export const insertContentIntoBlock = (content: string = '', buttonId: string) => {
  const blockId = 'entryIdsBlock';
  const blockElement = document.getElementById(blockId);
  const buttonElement = document.getElementById(buttonId);

  if (!content || !buttonElement) {
    return;
  }

  if (blockElement) {
    blockElement.innerText = content;
  } else {
    const textElement = document.createElement('div');
    textElement.id = blockId;
    textElement.innerText = content;
    buttonElement.parentNode.insertBefore(textElement, buttonElement.nextSibling);
  }

};

export const appendContentIntoBlock = (content: string = '', blockId: string) => {
  const blockElement = document.getElementById(blockId);

  if (blockElement) {
    blockElement.innerText += content;
  }
};

export const appendBlock = (block: string) => {
  const tbody = document.querySelector('#tbody');
  if (tbody) {
    const blockObject = JSON.parse(block).block;
    const row = document.createElement('tr');
    const tableHTML = `
        <td>${blockObject.blockID}</td>
        <td>${blockObject.transactionsCount}</td>
        <td>${blockObject.witnessName}</td>
        <td>${new Date(blockObject.timestamp).toLocaleString('en-US', {})}</td>
    `;
    row.innerHTML = tableHTML;
    tbody.appendChild(row);
  }
};
