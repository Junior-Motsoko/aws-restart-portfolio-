// AWS re/Start Portfolio JavaScript

document.addEventListener('DOMContentLoaded', () => {
    console.log('AWS re/Start Portfolio loaded successfully');

    // Load navigation from nav.json
    loadNavigation();
});

async function loadNavigation() {
    try {
        const response = await fetch('nav.json');
        const data = await response.json();
        console.log('Navigation data loaded:', data);
    } catch (error) {
        console.error('Error loading navigation:', error);
    }
}
