window.onload = function() {
    // Create the top bar container
    var topBar = document.createElement('div');
    
    // Create the first link (PUC-Rio)
    var link1 = document.createElement('a');
    link1.href = 'https://www.puc-rio.br';
    link1.textContent = 'PUC-Rio';
    
    // Create the second link (Departamento de Artes & Design)
    var link2 = document.createElement('a');
    link2.href = 'https://dad.puc-rio.br';
    link2.textContent = 'Departamento de Artes & Design';
    
    // Apply the CSS class to the top bar
    topBar.classList.add('top-bar');
    
    // Append both links to the top bar
    topBar.appendChild(link1);
    topBar.appendChild(document.createTextNode(' | ')); // Add a separator between the links
    topBar.appendChild(link2);
    
    // Add the top bar to the body of every page (as the second child)
    document.body.insertBefore(topBar, document.body.children[1]);
};
