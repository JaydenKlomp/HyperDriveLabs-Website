document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const email = urlParams.get('email');

    try {
        const response = await fetch(`https://carapi.mercantec.tech/api/Users/confirm-email?token=${token}&email=${email}`);

        if (response.ok) {
            document.getElementById('message').textContent = 'Email confirmed successfully! You can now log in.';
        } else {
            const error = await response.json();
            document.getElementById('message').textContent = `Error: ${error.message || 'Failed to confirm email.'}`;
        }
    } catch (err) {
        document.getElementById('message').textContent = `Error: ${err.message}`;
    }
});
