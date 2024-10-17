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

    if (!promptEvent) return;

    try {
        // Show the install prompt
        promptEvent.prompt();

        // Wait for user action on the prompt
        const result = await promptEvent.userChoice;
        console.log('User response to install prompt:', result);

        // Clear the deferred prompt as it can only be used once
        window.deferredPrompt = null;
    } catch (error) {
        console.error('Failed to prompt install', error);
    }
});

// Handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('PWA installed successfully!', event);
    // Clear prompt and hide the install button
    window.deferredPrompt = null;
    butInstall?.classList.toggle('hidden', true);
});

