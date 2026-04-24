// Sample tender data
const tendersData = [
    {
        id: 1,
        title: "Construction of New School Building",
        category: "Construction",
        department: "Education Dept",
        location: "Mumbai, MH",
        price: "₹2.5 Cr",
        deadline: "2024-12-15",
        bids: 23,
        status: "Open",
        description: "Construction of 4-storey school building with 20 classrooms, library, and playground. E-tendering required."
    },
    {
        id: 2,
        title: "Annual IT Maintenance Contract",
        category: "IT Services",
        department: "Municipal Corporation",
        location: "Delhi, DL",
        price: "₹45 Lakh",
        deadline: "2024-12-10",
        bids: 15,
        status: "Open",
        description: "Comprehensive IT infrastructure maintenance for 2 years including servers, networking, and software support."
    },
    {
        id: 3,
        title: "Supply of Medical Equipment",
        category: "Supply",
        department: "Health Dept",
        location: "Bangalore, KA",
        price: "₹1.2 Cr",
        deadline: "2024-12-20",
        bids: 8,
        status: "Open",
        description: "Supply and installation of 50 ICU beds, ventilators, and monitoring equipment for government hospital."
    },
    {
        id: 4,
        title: "Financial Consulting Services",
        category: "Consulting",
        department: "Finance Dept",
        location: "Chennai, TN",
        price: "₹25 Lakh",
        deadline: "2024-12-12",
        bids: 12,
        status: "Open",
        description: "3-year financial advisory services for budget planning, audit compliance, and investment strategy."
    },
    {
        id: 5,
        title: "Road Construction - Phase II",
        category: "Construction",
        department: "PWD",
        location: "Pune, MH",
        price: "₹8.5 Cr",
        deadline: "2024-12-18",
        bids: 31,
        status: "Open",
        description: "12 km asphalt road construction with drainage system and street lighting."
    },
    {
        id: 6,
        title: "Software Development Contract",
        category: "IT Services",
        department: "Smart City Project",
        location: "Hyderabad, TS",
        price: "₹75 Lakh",
        deadline: "2024-12-08",
        bids: 19,
        status: "Closing Soon",
        description: "Custom citizen portal development with mobile app integration."
    }
];

// DOM Elements
const tendersGrid = document.getElementById('tendersGrid');
const tenderModal = document.getElementById('tenderModal');
const modalBody = document.getElementById('modalBody');
const categoryFilter = document.getElementById('categoryFilter');
const searchInput = document.getElementById('searchTender');
const mobileMenu = document.getElementById('mobile-menu');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderTenders(tendersData);
    setupEventListeners();
});

// Render tenders
function renderTenders(tenders) {
    tendersGrid.innerHTML = '';
    tenders.forEach(tender => {
        const tenderCard = createTenderCard(tender);
        tendersGrid.appendChild(tenderCard);
    });
}

// Create tender card
function createTenderCard(tender) {
    const card = document.createElement('div');
    card.className = 'tender-card';
    card.dataset.id = tender.id;
    card.innerHTML = `
        <div class="tender-header">
            <div>
                <h3 class="tender-title">${tender.title}</h3>
                <span class="tender-category">${tender.category}</span>
            </div>
            <div class="tender-price">${tender.price}</div>
        </div>
        <div class="tender-meta">
            <span><i class="fas fa-building"></i> ${tender.department}</span>
            <span><i class="fas fa-map-marker-alt"></i> ${tender.location}</span>
        </div>
        <div class="tender-meta">
            <span><i class="fas fa-users"></i> ${tender.bids} bids</span>
            <span class="tender-deadline">
                <i class="fas fa-clock"></i> ${tender.deadline}
            </span>
        </div>
        <div class="tender-actions">
            <button class="btn-bid" onclick="openTenderModal(${tender.id})">
                <i class="fas fa-eye"></i> View Details
            </button>
        </div>
    `;
    return card;
}

// Filter and search tenders
function filterTenders() {
    const category = categoryFilter.value;
    const searchTerm = searchInput.value.toLowerCase();
    
    const filtered = tendersData.filter(tender => {
        const matchesCategory = category === 'All Categories' || tender.category === category;
        const matchesSearch = tender.title.toLowerCase().includes(searchTerm) || 
                             tender.department.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });
    
    renderTenders(filtered);
}

// Open tender modal
function openTenderModal(id) {
    const tender = tendersData.find(t => t.id === id);
    if (!tender) return;
    
    modalBody.innerHTML = `
        <div class="modal-tender">
            <h2>${tender.title}</h2>
            <div class="modal-meta">
                <span class="badge category">${tender.category}</span>
                <span class="badge department">${tender.department}</span>
                <div class="price">${tender.price}</div>
            </div>
            <div class="modal-description">
                <h4>Project Details:</h4>
                <p>${tender.description}</p>
            </div>
            <div class="modal-info">
                <div class="info-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${tender.location}</span>
                </div>
                <div class="info-item">
                    <i class="fas fa-clock"></i>
                    <span>Closes on ${tender.deadline}</span>
                </div>
                <div class="info-item">
                    <i class="fas fa-users"></i>
                    <span>${tender.bids} bids received</span>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn-download">Download Tender Document</button>
                <button class="btn-place-bid">Place Bid Now</button>
            </div>
        </div>
    `;
    
    tenderModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    tenderModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event Listeners
function setupEventListeners() {
    // Filter events
    categoryFilter.addEventListener('change', filterTenders);
    searchInput.addEventListener('input', filterTenders);
    
    // Modal close
    document.querySelector('.close').addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === tenderModal) closeModal();
    });
    
    // Mobile menu
    mobileMenu.addEventListener('click', toggleMobileMenu);
    
    // Buttons
    document.querySelector('.btn-explore').addEventListener('click', () => {
        document.getElementById('tenders').scrollIntoView({ behavior: 'smooth' });
    });
    
    document.querySelector('.btn-login').addEventListener('click', () => {
        alert('Login functionality - Great for your portfolio demo!');
    });
    
    document.querySelector('.btn-signup').addEventListener('click', () => {
        alert('Sign Up functionality - Perfect internship project!');
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
    mobileMenu.classList.toggle('active');
}

// Smooth scrolling for nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu if open
        document.querySelector('.nav-menu').classList.remove('active');
    });
});

// Add some interactive animations
document.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.tender-card');
    cards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const cardVisible = 150;
        
        if (cardTop < window.innerHeight - cardVisible) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// Initialize cards animation
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.tender-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ${index * 0.1}s, transform 0.6s ${index * 0.1}s`;
    });
});