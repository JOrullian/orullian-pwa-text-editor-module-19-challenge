const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;

    // Remove hidden class from the install button
    butInstall?.classList.toggle('hidden', false);
});

// Click event handler on the `butInstall` element
butInstall?.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return;
    }

    try {
    // Show prompt
    promptEvent.prompt();

    // Reset the deferred prompt variable (can only be used once)
    window.deferredPrompt = null;

    // Re-engage hidden class on install button
    butInstall?.classList.toggle('hidden', true);
    } catch (error) {
        console.error('Failed to prompt install', error)
    }
});

// Handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('PWA installed successfully!');
    // Clear prompt
    window.deferredPrompt = null;
});
