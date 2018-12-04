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
  if (tbody && block) {
    const blockObject = JSON.parse(block).block;
    const row = <HTMLTableRowElement>document.createElement('tr');
    const rowHTML = `
        <td>${blockObject.blockID}</td>
        <td>${blockObject.transactionsCount}</td>
        <td>${blockObject.witnessName}</td>
        <td>${new Date(blockObject.timestamp).toLocaleString('en-US', {})}</td>
    `;
    row.innerHTML = rowHTML;
    const blockId = `blockTd_${blockObject.blockID}`;
    row.onclick = () => {
      const element = document.getElementById(blockId);
      if (element.style.display === 'none') {
        element.style.display = 'table-row';
      } else {
        element.style.display = 'none';
      }
    }
    row.title = block;

    const row2 = <HTMLTableRowElement>document.createElement('tr');
    row2.style.display = 'none';
    row2.id = blockId
    row2.innerHTML = `<td colspan='4'>${block}</td>`;

    tbody.appendChild(row);
    tbody.appendChild(row2);
  }
};
