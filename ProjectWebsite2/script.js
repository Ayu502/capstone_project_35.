window.addEventListener('load', () => {
    const splash = document.getElementById('splash');
    const content = document.getElementById('content');
    
    setTimeout(() => {
        splash.style.display = 'none';
        content.style.display = 'block';
    }, 5000); // 5 seconds duration for splash screen
});
