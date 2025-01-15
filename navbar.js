document.addEventListener('DOMContentLoaded', function() {
    // Create the navbar component
    function createNavbar() {
        return `
            <nav>
                <ul class="nav-links">
                    <li><a href="index.html" class="active">Home</a></li>
                    <li><a href="about.html">About</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle">Ministries <i class="fas fa-chevron-down"></i></a>
                        <ul class="dropdown-menu">
                            <li><a href="youth-ministry.html">Youth Ministry</a></li>
                            <li><a href="womens-ministry.html">Women's Ministry</a></li>
                            <li><a href="mens-ministry.html">Men's Ministry</a></li>
                            <li><a href="children-ministry.html">Children's Ministry</a></li>
                            <li><a href="choir-ministry.html">Choir Ministry</a></li>
                            <li><a href="prayer-ministry.html">Prayer Ministry</a></li>
                            <li><a href="bible-study.html">Bible Study</a></li>
                            <li><a href="outreach-ministry.html">Community Outreach</a></li>
                        </ul>
                    </li>
                    <li><a href="sermons.html">Sermons</a></li>
                    <li><a href="events.html">Events</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </nav>
        `;
    }

    // Insert navbar into placeholder
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        navbarPlaceholder.innerHTML = createNavbar();
    }

    // Handle active link highlighting
    function setActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const links = document.querySelectorAll('.nav-links a');
        
        links.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Handle dropdown functionality
    function initializeDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            // Handle click events
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
        });
    }

    // Initialize all functionality
    setActiveLink();
    initializeDropdowns();
});