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
    const loginBtn = document.querySelector('header .user-actions .btn-outline'); // Assumendo sia Accedi
    const signupBtn = document.querySelector('header .user-actions .btn-primary'); // Assumendo sia Registrati
    const walletBtn = document.querySelector('header .user-actions .wallet-btn');

    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Previeni eventuale navigazione
            openModal('loginModal');
        });
        console.log('Login button listener added.');
    } else { console.warn('Login button not found in header.'); }

    if (signupBtn) {
        signupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('signupModal');
        });
         console.log('Signup button listener added.');
    } else { console.warn('Signup button not found in header.'); }

    if (walletBtn) {
        walletBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('walletModal');
        });
        console.log('Wallet button listener added.');
    } else { console.warn('Wallet button not found in header.'); }

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