const form = document.getElementById('dataForm');
const progressBar = document.getElementById('progress-bar');
const statusUpdate = document.getElementById('status-update');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Step 1: Visual Feedback
    statusUpdate.innerText = "Encrypting data...";
    progressBar.style.width = "40%";
    
    const formData = {
        name: document.getElementById('name').value,
        message: document.getElementById('message').value
    };

    try {
        // Step 2: Backend Communication
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            progressBar.style.width = "100%";
            statusUpdate.innerText = "Data stored in MongoDB successfully.";
            loadEntries(); // Refresh the list
        }
    } catch (err) {
        statusUpdate.innerText = "Connection failed.";
        progressBar.style.background = "red";
    }
});

async function loadEntries() {
    const res = await fetch('/api/entries');
    const data = await res.json();
    const list = document.getElementById('entry-list');
    list.innerHTML = data.map(e => `
        <div class="entry-item">
            <strong>${e.name}</strong>: ${e.message}
        </div>
    `).join('');
}

loadEntries();