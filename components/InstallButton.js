import { useEffect, useState } from 'react';

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installPromptVisible, setInstallPromptVisible] = useState(false);

  // Listen for the beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setInstallPromptVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, []);

  // Handle the install prompt when the user clicks the install button
  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User choice: ${outcome}`);
      setInstallPromptVisible(false); // Hide the install button after prompt
      setDeferredPrompt(null); // Reset deferred prompt
    }
  };

  // Render the install button if the prompt is available
  return (
    installPromptVisible && (
      <button
        id="installButton"
        onClick={handleInstallClick}
        style={{
          display: 'block',
          padding: '10px',
          background: '#007bff',
          color: '#fff',
        }}
      >
        Install App
      </button>
    )
  );
};

export default InstallButton;
