// Modulo JavaScript per page-community.js

// Gestione DOM al caricamento della pagina
document.addEventListener('DOMContentLoaded', function() {
    // Inizializzazione della UI
    initUI();
    
    // Gestione delle sezioni della pagina
    setupSectionNavigation();
    
    // Gestione dei tab per i mercati
    setupMarketTabs();
    
    // Gestione delle modal
    setupModals();
    
    // Inizializzazione dello stato dell'utente
    checkUserStatus();
});

// Funzione di inizializzazione UI
function initUI() {
    console.log('TraderGrowth Dashboard initialized');
}

// Gestione della navigazione tra le sezioni
function setupSectionNavigation() {
    const sidebarLinks = document.querySelectorAll('.nav-menu a');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Rimuovi la classe active da tutti i link
            sidebarLinks.forEach(item => item.classList.remove('active'));
            
            // Aggiungi la classe active al link cliccato
            this.classList.add('active');
            
            // Ottieni la sezione target dal data-attribute
            const targetSection = this.getAttribute('data-section');
            
            // Nascondi tutte le sezioni
            document.querySelectorAll('.page-section').forEach(section => {
                section.style.display = 'none';
            });
            
            // Mostra la sezione target
            document.getElementById(`${targetSection}-content`).style.display = 'block';
        });
    });
}

// Gestione dei tab per i mercati
function setupMarketTabs() {
    const marketTabs = document.querySelectorAll('.tabs .tab');
    
    marketTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Rimuovi la classe active da tutti i tab
            marketTabs.forEach(item => item.classList.remove('active'));
            
            // Aggiungi la classe active al tab cliccato
            this.classList.add('active');
            
            // Qui potresti filtrare i mercati in base al tab selezionato
            const filter = this.getAttribute('data-market-filter');
            console.log(`Filtro mercati: ${filter}`);
            
            // Implementazione del filtro mercati (simulata)
            filterMarkets(filter);
        });
    });
}

// Funzione per filtrare i mercati (simulata)
function filterMarkets(filter) {
    // Qui potresti implementare la logica di filtro reale
    console.log(`Filtro mercati applicato: ${filter}`);
}

// ----- GESTIONE MODALI -----
function setupModals() {
    // Gestione pulsanti per aprire le modali
    setupModalTriggers();
    
    // Gestione della chiusura delle modali
    setupModalClosers();
    
    // Gestione dello switch tra modali
    setupModalSwitchers();
    
    // Setup dei form di login e registrazione
    setupAuthForms();
    
    // Setup della funzionalità del wallet
    setupWalletFunctionality();
}

function setupModalTriggers() {
    // Login button
    const loginBtn = document.getElementById('community-login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showModal('loginModal');
        });
    }
    
    // Signup button
    const signupBtn = document.getElementById('community-signup-btn');
    if (signupBtn) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showModal('signupModal');
        });
    }
    
    // Wallet button
    const walletBtn = document.getElementById('community-wallet-btn');
    if (walletBtn) {
        walletBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showModal('walletModal');
        });
    }
}

function setupModalClosers() {
    // Gestione pulsanti di chiusura modali
    const closeBtns = document.querySelectorAll('.close-modal');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal-id');
            hideModal(modalId);
        });
    });
    
    // Chiusura modale cliccando fuori dal contenuto
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                hideModal(this.id);
            }
        });
    });
    
    // Chiusura modale con tasto ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const visibleModal = document.querySelector('.modal.show');
            if (visibleModal) {
                hideModal(visibleModal.id);
            }
        }
    });
}

function setupModalSwitchers() {
    // Gestione dei link per passare da una modale all'altra
    const modalSwitchers = document.querySelectorAll('.switch-modal');
    modalSwitchers.forEach(switcher => {
        switcher.addEventListener('click', function(e) {
            e.preventDefault();
            const fromModal = this.getAttribute('data-from');
            const toModal = this.getAttribute('data-to');
            
            hideModal(fromModal);
            setTimeout(() => {
                showModal(toModal);
            }, 300); // Piccolo ritardo per una migliore UX
        });
    });
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.classList.add('modal-open');
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
    }
}

// ----- GESTIONE AUTENTICAZIONE -----
function setupAuthForms() {
    // Form di login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email-community').value;
            const password = document.getElementById('login-password-community').value;
            
            // Simulazione login
            simulateLogin(email, password);
        });
    }
    
    // Form di registrazione
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signup-name-community').value;
            const email = document.getElementById('signup-email-community').value;
            const password = document.getElementById('signup-password-community').value;
            const confirmPassword = document.getElementById('signup-confirm-community').value;
            
            // Validazione base
            if (password !== confirmPassword) {
                showNotification('Le password non corrispondono', 'error');
                return;
            }
            
            // Simulazione registrazione
            simulateSignup(name, email, password);
        });
    }
    
    // Pulsante logout
    const logoutBtn = document.getElementById('community-logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logoutUser();
        });
    }
}

function simulateLogin(email, password) {
    // Simulazione di una richiesta login
    console.log(`Tentativo di login con email: ${email}`);
    
    // Per simulazione, controlliamo solo che i campi non siano vuoti
    if (!email || !password) {
        showNotification('Inserisci email e password', 'error');
        return;
    }
    
    // Simuliamo un breve ritardo come in una vera chiamata API
    showNotification('Login in corso...', 'info');
    
    setTimeout(() => {
        // Simuliamo un login riuscito
        const userData = {
            name: email.split('@')[0], // Usiamo parte dell'email come nome utente
            email: email,
            isLoggedIn: true
        };
        
        // Salva i dati utente
        localStorage.setItem('tradergrowth_user', JSON.stringify(userData));
        
        // Aggiorna UI
        updateUIForLoggedInUser(userData);
        
        // Chiudi modale e mostra notifica
        hideModal('loginModal');
        showNotification('Login effettuato con successo!', 'success');
    }, 1000);
}

function simulateSignup(name, email, password) {
    // Simulazione di una richiesta di registrazione
    console.log(`Tentativo di registrazione per: ${name} (${email})`);
    
    // Per simulazione, controlliamo solo che i campi non siano vuoti
    if (!name || !email || !password) {
        showNotification('Compila tutti i campi', 'error');
        return;
    }
    
    // Simuliamo un breve ritardo come in una vera chiamata API
    showNotification('Registrazione in corso...', 'info');
    
    setTimeout(() => {
        // Simuliamo una registrazione riuscita
        const userData = {
            name: name,
            email: email,
            isLoggedIn: true
        };
        
        // Salva i dati utente
        localStorage.setItem('tradergrowth_user', JSON.stringify(userData));
        
        // Aggiorna UI
        updateUIForLoggedInUser(userData);
        
        // Chiudi modale e mostra notifica
        hideModal('signupModal');
        showNotification('Registrazione completata con successo!', 'success');
    }, 1000);
}

function logoutUser() {
    // Rimuovi i dati utente
    localStorage.removeItem('tradergrowth_user');
    
    // Aggiorna UI
    updateUIForLoggedOutUser();
    
    // Mostra notifica
    showNotification('Logout effettuato con successo', 'success');
}

function updateUIForLoggedInUser(userData) {
    // Mostra nome utente
    const usernameDisplay = document.getElementById('community-username-display');
    if (usernameDisplay) {
        usernameDisplay.textContent = userData.name;
    }
    
    // Mostra div info utente
    const userInfoDiv = document.getElementById('community-user-info');
    if (userInfoDiv) {
        userInfoDiv.style.display = 'flex';
    }
    
    // Nascondi pulsanti login/signup
    const loginBtn = document.getElementById('community-login-btn');
    const signupBtn = document.getElementById('community-signup-btn');
    if (loginBtn) loginBtn.style.display = 'none';
    if (signupBtn) signupBtn.style.display = 'none';
    
    // Aggiorna avatar nella sidebar con iniziale del nome
    const avatar = document.querySelector('.avatar');
    if (avatar && userData.name) {
        avatar.textContent = userData.name.charAt(0).toUpperCase();
    }
    
    // Aggiorna nome utente nella sidebar
    const sidebarName = document.querySelector('.user-profile h3');
    if (sidebarName) {
        sidebarName.textContent = userData.name;
    }
}

function updateUIForLoggedOutUser() {
    // Nascondi info utente
    const userInfoDiv = document.getElementById('community-user-info');
    if (userInfoDiv) {
        userInfoDiv.style.display = 'none';
    }
    
    // Mostra pulsanti login/signup
    const loginBtn = document.getElementById('community-login-btn');
    const signupBtn = document.getElementById('community-signup-btn');
    if (loginBtn) loginBtn.style.display = 'inline-block';
    if (signupBtn) signupBtn.style.display = 'inline-block';
    
    // Ripristina avatar e nome nella sidebar
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.textContent = 'M';
    }
    
    const sidebarName = document.querySelector('.user-profile h3');
    if (sidebarName) {
        sidebarName.textContent = 'Marco Rossi';
    }
    
    // Disconnetti anche il wallet se collegato
    disconnectWallet();
}

// ----- GESTIONE WALLET -----
function setupWalletFunctionality() {
    // Pulsante per connettere il wallet
    const connectWalletBtn = document.getElementById('connect-wallet-btn');
    if (connectWalletBtn) {
        connectWalletBtn.addEventListener('click', function() {
            connectWallet();
        });
    }
    
    // Pulsante per disconnettere il wallet
    const disconnectWalletBtn = document.getElementById('disconnect-wallet-btn');
    if (disconnectWalletBtn) {
        disconnectWalletBtn.addEventListener('click', function() {
            disconnectWallet();
        });
    }
    
    // Controlla se il wallet è già collegato
    checkWalletStatus();
}

function connectWallet() {
    // Simula il collegamento del wallet
    showNotification('Connessione al wallet in corso...', 'info');
    
    setTimeout(() => {
        // Genera un indirizzo wallet fittizio
        const walletAddress = '0x' + Array(40).fill(0).map(() => 
            Math.floor(Math.random() * 16).toString(16)).join('');
        
        // Genera un numero casuale di token
        const tokenCount = Math.floor(Math.random() * 1000);
        
        // Salva i dati del wallet
        const walletData = {
            address: walletAddress,
            tokens: tokenCount,
            connected: true,
            achievements: generateRandomAchievements()
        };
        
        localStorage.setItem('tradergrowth_wallet', JSON.stringify(walletData));
        
        // Aggiorna UI
        updateWalletUI(walletData);
        
        // Mostra la notifica
        showNotification('Wallet collegato con successo!', 'success');
    }, 1500);
}

function disconnectWallet() {
    // Rimuovi i dati del wallet
    localStorage.removeItem('tradergrowth_wallet');
    
    // Aggiorna UI
    const connectContent = document.getElementById('wallet-connect-content');
    const connectedContent = document.getElementById('wallet-connected-content');
    
    if (connectContent) connectContent.style.display = 'block';
    if (connectedContent) connectedContent.style.display = 'none';
    
    // Mostra notifica
    showNotification('Wallet disconnesso', 'info');
}

function updateWalletUI(walletData) {
    // Aggiorna UI del wallet
    const connectContent = document.getElementById('wallet-connect-content');
    const connectedContent = document.getElementById('wallet-connected-content');
    
    if (connectContent) connectContent.style.display = 'none';
    if (connectedContent) connectedContent.style.display = 'block';
    
    // Aggiorna indirizzo wallet
    const addressElement = document.getElementById('wallet-address');
    if (addressElement) {
        addressElement.textContent = walletData.address;
    }
    
    // Aggiorna conteggio token
    const tokenElement = document.getElementById('wallet-token-count');
    if (tokenElement) {
        tokenElement.textContent = walletData.tokens;
    }
    
    // Aggiorna achievements
    updateAchievements(walletData.achievements);
}

function updateAchievements(achievements) {
    const achievementsList = document.getElementById('achievements-list');
    if (!achievementsList) return;
    
    // Svuota la lista
    achievementsList.innerHTML = '';
    
    if (achievements && achievements.length > 0) {
        achievements.forEach(achievement => {
            const achievementDiv = document.createElement('div');
            achievementDiv.className = 'achievement-item';
            achievementDiv.innerHTML = `
                <div class="achievement-icon">🏆</div>
                <div class="achievement-info">
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-desc">${achievement.description}</div>
                </div>
            `;
            achievementsList.appendChild(achievementDiv);
        });
    } else {
        achievementsList.innerHTML = '<div class="no-achievements">Nessun achievement sbloccato.</div>';
    }
}

function generateRandomAchievements() {
    const achievements = [
        {name: "Early Adopter", description: "Tra i primi 1000 membri della community"},
        {name: "Hodler", description: "Mantieni token TRAD per 30+ giorni"},
        {name: "Studente Stellare", description: "Completa 5 corsi con valutazione alta"},
        {name: "Trader Promettente", description: "Completa il percorso base"}
    ];
    
    // Seleziona casualmente 0-2 achievement
    const count = Math.floor(Math.random() * 3);
    const selectedAchievements = [];
    
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * achievements.length);
        selectedAchievements.push(achievements[randomIndex]);
        // Rimuovi l'achievement selezionato per evitare duplicati
        achievements.splice(randomIndex, 1);
    }
    
    return selectedAchievements;
}

// ----- UTILITY FUNCTIONS -----
function showNotification(message, type = 'info') {
    const notificationArea = document.getElementById('notification-area');
    if (!notificationArea) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notificationArea.appendChild(notification);
    
    // Animazione di entrata
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Rimuovi la notifica dopo 3 secondi
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function checkUserStatus() {
    // Controlla se l'utente è già loggato
    const userData = JSON.parse(localStorage.getItem('tradergrowth_user'));
    if (userData && userData.isLoggedIn) {
        updateUIForLoggedInUser(userData);
    }
}

function checkWalletStatus() {
    // Controlla se il wallet è già collegato
    const walletData = JSON.parse(localStorage.getItem('tradergrowth_wallet'));
    if (walletData && walletData.connected) {
        updateWalletUI(walletData);
    }
}
