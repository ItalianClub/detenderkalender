const apiUrl = 'https://jouw-backend.onrender.com/tenders';
const tenderForm = document.getElementById('tenderForm');
const tenderTableBody = document.getElementById('tenderTableBody');

async function fetchTenders() {
    try {
        const response = await fetch(apiUrl);
        const tenders = await response.json();
        renderTable(tenders);
    } catch (error) {
        console.error('Fout bij ophalen van tenders:', error);
    }
}

function renderTable(tenders) {
    tenderTableBody.innerHTML = '';
    const now = new Date();
    tenders.forEach(tender => {
        const deadline = new Date(tender.deadline);
        const statusText = deadline < now ? `Verlopen op ${deadline.toLocaleDateString()}` : 'Actief';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${tender.name}</td>
            <td>${tender.client}</td>
            <td>${tender.businessUnit}</td>
            <td>€ ${tender.orderValue.toLocaleString()}</td>
            <td>${tender.deadline}</td>
            <td>${tender.status}</td>
            <td>${tender.responsible}</td>
            <td>${tender.notes}</td>
            <td>${statusText}</td>
            <td><button class="delete-btn" onclick="deleteTender('${tender._id}')">Verwijderen</button></td>
        `;
        tenderTableBody.appendChild(row);
    });
}

tenderForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newTender = {
        name: document.getElementById('name').value,
        client: document.getElementById('client').value,
        businessUnit: document.getElementById('businessUnit').value,
        orderValue: parseFloat(document.getElementById('orderValue').value),
        deadline: document.getElementById('deadline').value,
        status: document.getElementById('status').value,
        responsible: document.getElementById('responsible').value,
        notes: document.getElementById('notes').value,
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTender),
        });
        if (!response.ok) {
            throw new Error(`Serverfout: ${response.status}`);
        }
        tenderForm.reset();
        fetchTenders();
    } catch (error) {
        console.error('Fout bij toevoegen van tender:', error);
    }
});

async function deleteTender(id) {
    try {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        fetchTenders();
    } catch (error) {
        console.error('Fout bij verwijderen van tender:', error);
    }
}

fetchTenders();
