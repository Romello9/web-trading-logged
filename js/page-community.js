// --- START OF FILE js/page-community.js ---

// Funzione Helper per aprire modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        console.log(`Opening modal: ${modalId}`);
        modal.style.display = 'block';
    } else {
        console.warn(`Modal with ID "${modalId}" not found.`);
    }
}

// Funzione Helper per chiudere modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        console.log(`Closing modal: ${modalId}`);
        modal.style.display = 'none';
    } else {
        console.warn(`Modal with ID "${modalId}" not found.`);
    }
}

// Funzione Helper per cambiare modal
function switchModal(fromId, toId) {
    closeModal(fromId);
    openModal(toId);
}


// Attendi che il DOM sia caricato
document.addEventListener('DOMContentLoaded', () => {
    console.log('Community page DOM loaded. Setting up interactions...');

    // --- Gestione Stato Login Simulato ---
    const loginBtnHeader = document.getElementById('community-login-btn');
    const signupBtnHeader = document.getElementById('community-signup-btn');
    const walletBtnHeader = document.getElementById('community-wallet-btn'); // Seleziona bottone wallet per coerenza
    const userInfoDisplayHeader = document.getElementById('community-user-info');
    const usernameSpanHeader = document.getElementById('community-username-display');
    const logoutBtnHeader = document.getElementById('community-logout-btn');

    let isCommunityUserLoggedIn = false; // Stato iniziale: non loggato
    let communityUsername = '';

    function updateCommunityHeaderUI() {
        if (isCommunityUserLoggedIn) {
            if (loginBtnHeader) loginBtnHeader.style.display = 'none';
            if (signupBtnHeader) signupBtnHeader.style.display = 'none';
            if (userInfoDisplayHeader) userInfoDisplayHeader.style.display = 'flex';
            if (usernameSpanHeader) usernameSpanHeader.textContent = `Ciao, ${communityUsername}`;
            // Potremmo mostrare/nascondere walletBtn in base al login se ha senso
            // if (walletBtnHeader) walletBtnHeader.style.display = 'inline-flex';
        } else {
            if (loginBtnHeader) loginBtnHeader.style.display = 'inline-flex';
            if (signupBtnHeader) signupBtnHeader.style.display = 'inline-flex';
            if (userInfoDisplayHeader) userInfoDisplayHeader.style.display = 'none';
             // if (walletBtnHeader) walletBtnHeader.style.display = 'inline-flex'; // O nasconderlo?
        }
    }

    function handleCommunityLogin(username) {
        isCommunityUserLoggedIn = true;
        communityUsername = username || 'Utente';
        updateCommunityHeaderUI();
        closeModal('loginModal');
        // Aggiungeremo notifiche se necessario
        alert(`Benvenuto ${communityUsername}! (Simulato)`);
        // TODO: Salvare stato login in localStorage se si vuole persistenza
    }

    function handleCommunityLogout() {
        isCommunityUserLoggedIn = false;
        communityUsername = '';
        updateCommunityHeaderUI();
        alert('Logout effettuato (Simulato)');
        // TODO: Rimuovere stato login da localStorage
    }

    // --- 1. Gestione Tabs Mercati ---
    const tabsContainer = document.querySelector('.market-dashboard .tabs');
    if (tabsContainer) {
        const tabs = tabsContainer.querySelectorAll('.tab');
        const marketGrid = document.querySelector('.market-dashboard .market-grid'); // Per futura logica di filtro

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const filter = tab.dataset.marketFilter;
                console.log(`Market tab activated: ${filter}`);
                // TODO: Aggiungere logica per filtrare/ricaricare market-grid
                if(marketGrid) {
                    // Esempio semplice: cambia lo sfondo per feedback visivo
                    marketGrid.style.backgroundColor = filter === 'crypto' ? 'lightblue' : (filter === 'forex' ? 'lightgreen' : 'transparent');
                }
            });
        });
        console.log('Market tabs listeners added.');
    } else {
        console.warn('Market tabs container not found.');
    }

    // --- 2. Gestione Bottoni Header (Apertura Modali) ---
    if (loginBtnHeader) {
        loginBtnHeader.addEventListener('click', (e) => { e.preventDefault(); openModal('loginModal'); });
    } else { console.warn('Login button #community-login-btn not found.'); }
    if (signupBtnHeader) {
        signupBtnHeader.addEventListener('click', (e) => { e.preventDefault(); openModal('signupModal'); });
    } else { console.warn('Signup button #community-signup-btn not found.'); }
    if (walletBtnHeader) {
        walletBtnHeader.addEventListener('click', (e) => { e.preventDefault(); openModal('walletModal'); });
    } else { console.warn('Wallet button #community-wallet-btn not found.'); }
    if (logoutBtnHeader) {
        logoutBtnHeader.addEventListener('click', (e) => { e.preventDefault(); handleCommunityLogout(); });
    } else { console.warn('Logout button #community-logout-btn not found.'); }

    // Aggiorna UI header iniziale
    updateCommunityHeaderUI();
    console.log('Header button listeners added.');

    // --- Gestione Chiusura/Switch Modali ---
    document.querySelectorAll('.modal .close-modal').forEach(btn => {
        const modalId = btn.dataset.modalId;
        if(modalId) btn.addEventListener('click', () => closeModal(modalId));
    });
    document.querySelectorAll('.modal .switch-modal').forEach(link => {
        const fromId = link.dataset.from;
        const toId = link.dataset.to;
        if(fromId && toId) link.addEventListener('click', (e) => { e.preventDefault(); switchModal(fromId, toId); });
    });
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(modal.id); });
    });
    console.log('Modal close/switch listeners added.');

    // --- 3. Gestione Sidebar Nav Menu ---
    const sidebarMenu = document.querySelector('.sidebar .nav-menu');
    const mainContentArea = document.getElementById('main-content-area'); // ID aggiunto all'HTML

    if (sidebarMenu && mainContentArea) {
        const sidebarLinks = sidebarMenu.querySelectorAll('a[data-section]');
        const allSections = mainContentArea.querySelectorAll('.page-section'); // Seleziona tutte le sezioni

        sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSectionIdSuffix = link.dataset.section; // es: "dashboard", "growth-path"
                const targetSectionId = `${targetSectionIdSuffix}-content`; // es: "dashboard-content"
                console.log(`Sidebar link clicked. Target section: ${targetSectionId}`);

                // Aggiorna stile link attivo
                sidebarLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Mostra/Nascondi sezioni contenuto
                let sectionFound = false;
                allSections.forEach(section => {
                    if (section.id === targetSectionId) {
                        section.style.display = 'block';
                        sectionFound = true;
                        console.log(`Showing section: #${section.id}`);
                    } else {
                        section.style.display = 'none';
                    }
                });

                if (!sectionFound) {
                    console.warn(`Content section #${targetSectionId} not found.`);
                    // Fallback: mostra un messaggio o la dashboard
                    const dashboardSection = document.getElementById('dashboard-content');
                     if(dashboardSection) dashboardSection.style.display = 'block';
                     // E/o mostra un messaggio di errore temporaneo
                     // mainContentArea.innerHTML = `<p>Contenuto non trovato</p>`;
                }
            });
        });
        console.log('Sidebar menu navigation listeners added.');
    } else {
        console.warn('Sidebar navigation menu or main content area not found.');
    }

    // --- Gestione Login/Signup Form (Submit) ---
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Login form submitted (simulated)');
            const emailInput = document.getElementById('login-email-community');
            const username = emailInput?.value.split('@')[0] || 'Utente'; // Simula username dall'email
            handleCommunityLogin(username); // Chiama la funzione di login simulato
            loginForm.reset();
        });
    }
     if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('signup-name-community');
            const username = nameInput?.value || 'NuovoUtente';
            console.log('Signup form submitted (simulated)');
            alert(`Registrazione per ${username} simulata!`); // Placeholder
            closeModal('signupModal');
            signupForm.reset();
            // Login automatico dopo signup simulato
            handleCommunityLogin(username);
        });
    }

     // --- Gestione Wallet Connect/Disconnect (Simulazione Semplice) ---
     const connectBtn = document.getElementById('connect-wallet-btn');
     const disconnectBtn = document.getElementById('disconnect-wallet-btn');
     const walletConnectedDiv = document.getElementById('wallet-connected-content');
     const walletConnectDiv = document.getElementById('wallet-connect-content');

     if (connectBtn && disconnectBtn && walletConnectedDiv && walletConnectDiv) {
         let isWalletConnected = false; // Stato wallet simulato

         function updateWalletModalView() {
              walletConnectDiv.style.display = isWalletConnected ? 'none' : 'block';
              walletConnectedDiv.style.display = isWalletConnected ? 'block' : 'none';
         }

         connectBtn.addEventListener('click', () => {
             console.log('Connecting wallet (simulated)');
             isWalletConnected = true;
             updateWalletModalView();
             alert('Wallet collegato (simulato)!');
             // TODO: Integrare con wallet.js se necessario
         });

         disconnectBtn.addEventListener('click', () => {
             console.log('Disconnecting wallet (simulated)');
             isWalletConnected = false;
             updateWalletModalView();
             alert('Wallet disconnesso (simulato)!');
              // TODO: Integrare con wallet.js se necessario
         });

         updateWalletModalView(); // Imposta vista iniziale
         console.log('Wallet connect/disconnect listeners added.');
     } else {
         console.warn('Wallet modal buttons or content divs not found.');
     }

    console.log('Community page interactions ready.');
});
// --- END OF FILE js/page-community.js ---