function validarFormulario(event) {
    event.preventDefault(); // Evitar el envío del formulario
    
    // Obtener los valores del formulario
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    
    // Validar que las contraseñas coincidan
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    if (password !== confirmPassword) {
        confirmPasswordError.textContent = 'Las contraseñas no coinciden';
        confirmPasswordError.classList.add('invalid-feedback', 'visible');
        return; // Salir de la función si las contraseñas no coinciden
    } else {
        confirmPasswordError.textContent = '';
        confirmPasswordError.classList.remove('invalid-feedback', 'visible');
        document.getElementById('signupForm').submit(); // Enviar el formulario
    }
}

document.addEventListener('DOMContentLoaded', function () {
    fetch('get_reviews.php')
        .then(response => response.json())
        .then(data => {
            const reviewsContainer = document.getElementById('reviewsContainer');
            data.forEach(review => {
                const reviewCard = document.createElement('div');
                reviewCard.className = 'card mb-3';
                reviewCard.innerHTML = `
                    <div class="card-body">
                        <p class="lead">"${review.review}" - ${review.username}</p>
                        <p class="text-warning">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
                    </div>
                `;
                reviewsContainer.appendChild(reviewCard);
            });
        });

    document.getElementById('reviewForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        fetch('add_review.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Reseña enviada correctamente');
                    location.reload();
                } else {
                    alert('Hubo un error al enviar la reseña');
                }
            });
    });
});
