/* ==========================================================================
   ÉCLAT CAPTURE - GLOBAL INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. GESTION DU THÈME PERSISTANT (SOMBRE / CLAIR)
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Appliquer le thème sauvegardé dès le chargement de la page
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light') {
        document.body.classList.add('light-mode');
        if (themeToggleBtn) {
            const themeIcon = themeToggleBtn.querySelector('i');
            if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
        }
    } else {
        document.body.classList.remove('light-mode');
        if (themeToggleBtn) {
            const themeIcon = themeToggleBtn.querySelector('i');
            if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
        }
    }

    // Gestion du clic sur le bouton de changement de thème
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            const themeIcon = themeToggleBtn.querySelector('i');
            
            if (isLight) {
                localStorage.setItem('theme', 'light');
                if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
            } else {
                localStorage.setItem('theme', 'dark');
                if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
            }
        });
    }

    // 2. FILTRAGE INTERACTIF (DASHBOARD + GALERIE)
   const filterButtons = document.querySelectorAll('.filter-btn');

if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Mettre à jour l'état actif des boutons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Récupérer la catégorie depuis data-type (ex: "video")
            const selectedType = btn.getAttribute('data-type').toLowerCase();

            // 1. Filtrer les lignes du tableau (Dashboard)
            const rows = document.querySelectorAll('.premium-table tbody tr');
            rows.forEach(row => {
                if (selectedType === 'all') {
                    row.style.display = '';
                    return;
                }
                
                const sessionTypeCell = row.querySelector('.session-type');
                if (sessionTypeCell) {
                    // .normalize("NFD") supprime les accents (ex: vidéo devient video)
                    const sessionText = sessionTypeCell.textContent
                        .trim()
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "");

                    if (sessionText.includes(selectedType)) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                }
            });

            // 2. Filtrer les images/vidéos de la galerie
            const images = document.querySelectorAll('.Galerie-content2-image');
            images.forEach(img => {
                if (selectedType === 'all') {
                    img.style.display = '';
                } else {
                    const imgType = img.getAttribute('data-type');
                    // On force la comparaison en minuscules au cas où
                    if (imgType && imgType.toLowerCase() === selectedType) {
                        img.style.display = '';
                    } else {
                        img.style.display = 'none';
                    }
                }
            });
        });
    });
}
});
