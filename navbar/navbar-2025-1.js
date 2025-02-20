window.onload = function() {
    // Check if body has the correct class
    if (document.body.classList.contains('semestre-2025-1')) {
        // Create the link element
        var navBar = document.createElement('div');
        var link = document.createElement('a');
        
        // Set the link attributes
        link.href = '/2025-1/';
        link.textContent = 'Projetos 2025-1';
        
        // Apply the CSS class
        navBar.classList.add('nav-bar');
        
        // Append the link to the nav bar
        navBar.appendChild(link);
        
        // Add the nav bar to the body of every page
        document.body.insertBefore(navBar, document.body.firstChild);
    }
};
