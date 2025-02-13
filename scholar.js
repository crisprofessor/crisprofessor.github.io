async function fetchGoogleScholarPublications() {
    // Note: Actual implementation requires backend proxy due to CORS
    // This is a placeholder for future implementation
    const publications = [
        {
            title: "BIM in Transportation Infrastructure",
            year: 2024,
            link: "#"
        },
        {
            title: "New Technologies in Construction",
            year: 2023,
            link: "#"
        }
    ];

    const publicationsContainer = document.getElementById('scholar-publications');
    publications.forEach(pub => {
        const pubElement = document.createElement('div');
        pubElement.innerHTML = `
            <h3>${pub.title}</h3>
            <p>Ano: ${pub.year}</p>
            <a href="${pub.link}">Ver Publicação</a>
        `;
        publicationsContainer.appendChild(pubElement);
    });
}

document.addEventListener('DOMContentLoaded', fetchGoogleScholarPublications);