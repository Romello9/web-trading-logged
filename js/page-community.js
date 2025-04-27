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

    // --- 1. Gestione Tabs Mercati ---
    const tabsContainer = document.querySelector('.market-dashboard .tabs');
    if (tabsContainer) {
        const tabs = tabsContainer.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Rimuovi 'active' da tutti i tab
                tabs.forEach(t => t.classList.remove('active'));
                // Aggiungi 'active' al tab cliccato
                tab.classList.add('active');
                console.log(`Tab activated: ${tab.textContent}`);
                // Qui potresti aggiungere logica per mostrare/nascondere contenuti diversi
                // basato su un data-attribute del tab, ma per ora cambiamo solo lo stile.
            });
        });
        console.log('Market tabs listeners added.');
    } else {
        console.warn('Market tabs container not found.');
    }

     // --- 2. Gestione Bottoni Header (Apertura Modali) ---
    const loginBtn = document.getElementById('community-login-btn'); // Usa ID
    const signupBtn = document.getElementById('community-signup-btn'); // Usa ID
    const walletBtn = document.getElementById('community-wallet-btn'); // Usa ID
    const logoutBtn = document.getElementById('community-logout-btn'); // Aggiungi bottone logout
    const userInfoDisplay = document.getElementById('community-user-info'); // Div info utente
    const usernameSpan = document.getElementById('community-username-display'); // Span username

    // Stato Login Simulato (semplice, solo per UI header)
    let isCommunityUserLoggedIn = false; // Inizia come non loggato
    let communityUsername = '';

    function updateCommunityHeaderUI() {
        if (isCommunityUserLoggedIn) {
            if (loginBtn) loginBtn.style.display = 'none';
            if (signupBtn) signupBtn.style.display = 'none';
            if (userInfoDisplay) userInfoDisplay.style.display = 'flex'; // Mostra info utente
            if (usernameSpan) usernameSpan.textContent = `Ciao, ${communityUsername}`;
        } else {
            if (loginBtn) loginBtn.style.display = 'inline-flex'; // Usa inline-flex se i bottoni sono flex
            if (signupBtn) signupBtn.style.display = 'inline-flex';
            if (userInfoDisplay) userInfoDisplay.style.display = 'none'; // Nascondi info utente
        }
    }

    // Azione Login (Simulata) - chiamata dal form submit
    function handleCommunityLogin(username) {
        isCommunityUserLoggedIn = true;
        communityUsername = username || 'Utente';
        updateCommunityHeaderUI();
        closeModal('loginModal');
        // Potresti aggiungere una notifica qui se importi notificationHandler
        alert(`Benvenuto ${communityUsername}! (Simulato)`);
    }

    // Azione Logout (Simulata)
    function handleCommunityLogout() {
        isCommunityUserLoggedIn = false;
        communityUsername = '';
        updateCommunityHeaderUI();
        alert('Logout effettuato (Simulato)');
    }

    // Aggiungi listener ai bottoni usando gli ID
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('loginModal');
        });
        console.log('Login button listener added.');
    } else { console.warn('Login button #community-login-btn not found.'); }

    if (signupBtn) {
        signupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('signupModal');
        });
         console.log('Signup button listener added.');
    } else { console.warn('Signup button #community-signup-btn not found.'); }

    if (walletBtn) {
        walletBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('walletModal');
        });
        console.log('Wallet button listener added.');
    } else { console.warn('Wallet button #community-wallet-btn not found.'); }

     if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleCommunityLogout();
        });
        console.log('Logout button listener added.');
    } else { console.warn('Logout button #community-logout-btn not found.'); }

    // Aggiorna UI header iniziale
    updateCommunityHeaderUI();

    // Modifica gestione submit form per chiamare handleCommunityLogin
     const loginForm = document.getElementById('login-form');
     if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Login form submitted (simulated)');
            const emailInput = document.getElementById('login-email-community');
            handleCommunityLogin(emailInput?.value.split('@')[0]); // Passa username simulato
            loginForm.reset(); // Pulisci form
        });
    }
     // Gestione signup rimane semplice per ora
     const signupForm = document.getElementById('signup-form');
      if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
             const nameInput = document.getElementById('signup-name-community');
            console.log('Signup form submitted (simulated)');
             alert(`Registrazione per ${nameInput?.value || 'utente'} simulata!`); // Placeholder
            closeModal('signupModal');
            signupForm.reset();
             // Potresti voler fare il login automatico dopo la registrazione
             handleCommunityLogin(nameInput?.value);
        });
    }

    // --- Gestione Chiusura/Switch Modali ---
    // Aggiungi listener ai pulsanti 'X'
    document.querySelectorAll('.modal .close-modal').forEach(btn => {
        const modalId = btn.dataset.modalId;
        if(modalId) {
            btn.addEventListener('click', () => closeModal(modalId));
        }
    });
    // Aggiungi listener ai link per cambiare modale (es. da login a signup)
    document.querySelectorAll('.modal .switch-modal').forEach(link => {
        const fromId = link.dataset.from;
        const toId = link.dataset.to;
        if(fromId && toId) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                switchModal(fromId, toId);
            });
        }
    });
     // Aggiungi listener per chiudere cliccando sul backdrop
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) { // Cliccato direttamente sullo sfondo
                closeModal(modal.id);
            }
        });
    });
    console.log('Modal close/switch listeners added.');

    // --- 3. Gestione Sidebar Nav Menu ---
    const sidebarMenu = document.querySelector('.sidebar .nav-menu');
    if (sidebarMenu) {
        const sidebarLinks = sidebarMenu.querySelectorAll('a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Impedisce il salto all'href="#"
                // Rimuovi 'active' da tutti i link nella sidebar
                sidebarLinks.forEach(l => l.classList.remove('active'));
                // Aggiungi 'active' al link cliccato
                link.classList.add('active');
                console.log(`Sidebar link activated: ${link.textContent.trim()}`);
                // Qui potresti aggiungere logica per caricare/mostrare contenuto diverso
                // nella .main-content area, ma per ora cambiamo solo lo stile.
            });
        });
        console.log('Sidebar menu listeners added.');
    } else {
        console.warn('Sidebar navigation menu not found.');
    }

    // --- Gestione Login/Signup Form (Simulazione Semplice) ---
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Login form submitted (simulated)');
            // Qui aggiungeresti la logica di auth.js se volessi integrare
            alert('Accesso simulato! (Funzionalità completa da implementare)'); // Placeholder
            closeModal('loginModal');
        });
    }
     if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Signup form submitted (simulated)');
             alert('Registrazione simulata! (Funzionalità completa da implementare)'); // Placeholder
            closeModal('signupModal');
        });
    }

     // --- Gestione Wallet Connect/Disconnect (Simulazione Semplice) ---
     const connectBtn = document.getElementById('connect-wallet-btn');
     const disconnectBtn = document.getElementById('disconnect-wallet-btn');
     const walletConnectedDiv = document.getElementById('wallet-connected-content');
     const walletConnectDiv = document.getElementById('wallet-connect-content');

     if (connectBtn && disconnectBtn && walletConnectedDiv && walletConnectDiv) {
         // Stato iniziale (ipotizziamo disconnesso)
         walletConnectDiv.style.display = 'block';
         walletConnectedDiv.style.display = 'none';

         connectBtn.addEventListener('click', () => {
             console.log('Connecting wallet (simulated)');
             walletConnectDiv.style.display = 'none';
             walletConnectedDiv.style.display = 'block';
             // Qui potresti chiamare funzioni da wallet.js se integrato
             alert('Wallet collegato (simulato)!');
         });

         disconnectBtn.addEventListener('click', () => {
             console.log('Disconnecting wallet (simulated)');
             walletConnectDiv.style.display = 'block';
             walletConnectedDiv.style.display = 'none';
             alert('Wallet disconnesso (simulato)!');
         });
         console.log('Wallet connect/disconnect listeners added.');
     } else {
         console.warn('Wallet modal buttons or content divs not found.');
     }


    console.log('Community page interactions ready.');
});
// --- END OF FILE js/page-community.js ---
