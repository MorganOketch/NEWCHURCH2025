// Function to switch between panels
function switchPanel(panelId) {
    // Hide all panels
    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => {
        panel.classList.remove('active');
    });

    // Show the selected panel
    const activePanel = document.getElementById(panelId);
    if (activePanel) {
        activePanel.classList.add('active');
    }

    // Update active link in sidebar
    const navLinks = document.querySelectorAll('.nav-links li');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-panel') === panelId) {
            link.classList.add('active');
        }
    });
}

// Event listeners for sidebar navigation
document.querySelectorAll('.nav-links li').forEach(link => {
    link.addEventListener('click', function() {
        const panelId = this.getAttribute('data-panel');
        switchPanel(panelId);
    });
});

// Sample data for charts
const attendanceData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'Attendance',
        data: [50, 60, 70, 80, 90, 100, 110],
        backgroundColor: 'rgba(72, 187, 120, 0.5)',
        borderColor: 'rgba(72, 187, 120, 1)',
        borderWidth: 1
    }]
};

const tithesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'Tithes',
        data: [2000, 2500, 3000, 3500, 4000, 4500, 5000],
        backgroundColor: 'rgba(49, 130, 206, 0.5)',
        borderColor: 'rgba(49, 130, 206, 1)',
        borderWidth: 1
    }]
};

// Function to create charts
function createCharts() {
    const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
    const tithesCtx = document.getElementById('tithesChart').getContext('2d');

    new Chart(attendanceCtx, {
        type: 'line',
        data: attendanceData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    new Chart(tithesCtx, {
        type: 'bar',
        data: tithesData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Initialize charts on page load
document.addEventListener('DOMContentLoaded', function() {
    createCharts();
    switchPanel('dashboard'); // Set default panel to dashboard
});