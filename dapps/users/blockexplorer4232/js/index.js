document.addEventListener("DOMContentLoaded", function () {
    let blocks = [];

    function render(blocks) {
        tbody = document.querySelector('#tbody');
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
        blocks.forEach((block) => {
            const row = document.createElement('tr');
            const tableHTML = `
                <td>${block.blockID}</td>
                <td>${block.transactionsCount}</td>
                <td>${block.witnessName}</td>
                <td>${new Date(block.timestamp).toLocaleString("en-US", {})}</td>
            `;
            row.innerHTML = tableHTML;
            tbody.appendChild(row);
        })
    }

    API.Socket.subscribe('network:getBlock', (data) => {
        blocks.unshift(data.block);
        if (blocks.length > 20) {
            blocks.pop();
        }
        render(blocks);
    });

})