const apiUrl = 'https://jouw-backend.onrender.com/tenders'; // Vervang met jouw Render-backend-URL
const tenderForm = document.getElementById('tenderForm');
const tenderTableBody = document.getElementById('tenderTableBody');

// Ophalen van tenders
async function fetchTenders() {
    try {
        const response = await fetch(apiUrl);
        const tenders = await response.json();
        renderTable(tenders);
    } catch (error) {
        console.error('Fout bij ophalen van tenders:', error);
    }
}

// Tenders weergeven in de tabel
function renderTable(tenders) {
    tenderTableBody.innerHTML = '';
    tenders.forEach(tender => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${tender.name}</td>
            <td>${tender.client}</td>
            <td>${tender.deadline}</td>
            <td>${tender.status}</td>
            <td>${tender.responsible}</td>
            <td>${tender.notes}</td>
            <td><button class="delete-btn" onclick="deleteTender('${tender._id}')">Verwijderen</button></td>
        `;
        tenderTableBody.appendChild(row);
    });
}

// Tender toevoegen
tenderForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newTender = {
        name: document.getElementById('name').value,
        client: document.getElementById('client').value,
        deadline: document.getElementById('deadline').value,
        status: document.getElementById('status').value,
        responsible: document.getElementById('responsible').value,
        notes: document.getElementById('notes').value
    };

    try {
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTender),
        });
        tenderForm.reset();
        fetchTenders();
    } catch (error) {
        console.error('Fout bij toevoegen van tender:', error);
    }
});

// Tender verwijderen
async function deleteTender(id) {
    try {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        fetchTenders();
    } catch (error) {
        console.error('Fout bij verwijderen van tender:', error);
    }
}

// Initialiseer de applicatie
fetchTenders();
