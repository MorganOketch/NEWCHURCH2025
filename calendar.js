class EventManager {
    constructor() {
        this.events = [];
        this.filteredEvents = [];
        this.currentView = 'calendar';
        this.isAdmin = false;
        this.init();
    }

    init() {
        this.loadEvents();
        this.setupEventListeners();
        this.checkAdminStatus();
        this.renderCurrentView();
    }

    async loadEvents() {
        // In a real application, this would fetch from a database
        this.events = [
            {
                id: 1,
                title: 'Sunday Service',
                type: 'worship',
                date: '2024-01-14',
                time: '10:00 AM',
                description: 'Weekly Sunday Service',
                recurring: true,
                recurrencePattern: 'weekly'
            },
            // Add more sample events
        ];
        this.filteredEvents = [...this.events];
        this.renderEvents();
    }

    setupEventListeners() {
        // View Toggle
        document.querySelectorAll('.view-toggle button').forEach(button => {
            button.addEventListener('click', () => {
                this.switchView(button.dataset.view);
            });
        });

        // Search and Filters
        document.getElementById('eventSearch').addEventListener('input', (e) => {
            this.filterEvents({ search: e.target.value });
        });

        document.getElementById('dateFilter').addEventListener('change', (e) => {
            this.filterEvents({ date: e.target.value });
        });

        document.getElementById('typeFilter').addEventListener('change', (e) => {
            this.filterEvents({ type: e.target.value });
        });

        // Admin Controls
        if (this.isAdmin) {
            document.getElementById('addEventBtn').addEventListener('click', () => {
                this.showEventModal();
            });
        }
    }

    checkAdminStatus() {
        // In a real application, this would check user session/authentication
        this.isAdmin = localStorage.getItem('isAdmin') === 'true';
        if (this.isAdmin) {
            document.getElementById('adminControls').classList.add('visible');
        }
    }

    switchView(view) {
        this.currentView = view;
        document.querySelectorAll('.view-toggle button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
        this.renderCurrentView();
    }

    filterEvents(filters = {}) {
        this.filteredEvents = this.events.filter(event => {
            let matches = true;

            if (filters.search) {
                matches = matches && event.title.toLowerCase().includes(filters.search.toLowerCase());
            }

            if (filters.date) {
                matches = matches && event.date === filters.date;
            }

            if (filters.type) {
                matches = matches && event.type === filters.type;
            }

            if (filters.upcoming) {
                const eventDate = new Date(event.date);
                matches = matches && eventDate >= new Date();
            }

            return matches;
        });

        this.renderCurrentView();
    }

    renderCurrentView() {
        if (this.currentView === 'calendar') {
            this.renderCalendarView();
        } else {
            this.renderListView();
        }
    }

    renderCalendarView() {
        // Existing calendar rendering logic
        // Enhanced to show filtered events
    }

    renderListView() {
        const listView = document.querySelector('.list-view');
        listView.innerHTML = this.filteredEvents
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map(event => this.createEventListItem(event))
            .join('');
    }

    createEventListItem(event) {
        return `
            <div class="event-list-item" data-event-id="${event.id}">
                <h3>${event.title}</h3>
                <p><i class="fas fa-calendar"></i> ${event.date}</p>
                <p><i class="fas fa-clock"></i> ${event.time}</p>
                <p><i class="fas fa-tag"></i> ${event.type}</p>
                <p>${event.description}</p>
                ${this.isAdmin ? this.createAdminControls(event) : ''}
            </div>
        `;
    }

    createAdminControls(event) {
        return `
            <div class="admin-event-controls">
                <button onclick="eventManager.editEvent(${event.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button onclick="eventManager.deleteEvent(${event.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
    }

    showEventModal(eventId = null) {
        const event = eventId ? this.events.find(e => e.id === eventId) : null;
        const modal = document.getElementById('eventModal');
        modal.innerHTML = this.createEventForm(event);
        modal.style.display = 'block';
    }

    createEventForm(event = null) {
        return `
            <div class="event-form">
                <h2>${event ? 'Edit Event' : 'Add New Event'}</h2>
                <input type="text" name="title" placeholder="Event Title" 
                       value="${event?.title || ''}">
                <input type="date" name="date" value="${event?.date || ''}">
                <input type="time" name="time" value="${event?.time || ''}">
                <select name="type">
                    <option value="worship" ${event?.type === 'worship' ? 'selected' : ''}>
                        Worship Service
                    </option>
                    <option value="youth" ${event?.type === 'youth' ? 'selected' : ''}>
                        Youth Ministry
                    </option>
                    <!-- Add more options -->
                </select>
                <textarea name="description" placeholder="Event Description">
                    ${event?.description || ''}
                </textarea>
                <div class="recurring-options">
                    <label>
                        <input type="checkbox" name="recurring" 
                               ${event?.recurring ? 'checked' : ''}>
                        Recurring Event
                    </label>
                    <select name="recurrencePattern">
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>
                <button onclick="eventManager.saveEvent(${event?.id || 'null'})">
                    Save Event
                </button>
            </div>
        `;
    }

    saveEvent(eventId) {
        // Get form data and save event
        // In a real application, this would send to a server
        this.loadEvents(); // Reload events after saving
    }

    deleteEvent(eventId) {
        if (confirm('Are you sure you want to delete this event?')) {
            // Delete event logic
            // In a real application, this would send to a server
            this.loadEvents(); // Reload events after deleting
        }
    }
}

// Printing Functions
function printCalendar() {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Church Calendar</title>
                <link rel="stylesheet" href="styles.css">
                <style>
                    /* Add print-specific styles */
                </style>
            </head>
            <body>
                <div class="calendar-container">
                    ${document.querySelector('.calendar-view').innerHTML}
                </div>
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

function printCurrentView() {
    window.print();
}

// Initialize
const eventManager = new EventManager();