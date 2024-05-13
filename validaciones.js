function validarFormulario(event) {
  event.preventDefault(); // Evitar el envío del formulario
  
  // Obtener los valores del formulario
  const nombre = document.getElementById('nombre').value.trim();
  const apellidoPaterno = document.getElementById('apellidoPaterno').value.trim();
  const apellidoMaterno = document.getElementById('apellidoMaterno').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  
  // Validar que las contraseñas coincidan
  const confirmPasswordError = document.getElementById('confirmPasswordError');
  if (password !== confirmPassword) {
      confirmPasswordError.textContent = 'Las contraseñas no coinciden';
      confirmPasswordError.classList.add('invalid-feedback', 'visible');
      return; // Salir de la función si las contraseñas no coinciden
  } else {
      confirmPasswordError.textContent = '';
      confirmPasswordError.classList.remove('invalid-feedback', 'visible');
  }
  
  // Verificar si la cuenta ya existe en el Local Storage
  const existingAccounts = JSON.parse(localStorage.getItem('userAccounts')) || [];
  const existingAccount = existingAccounts.find(account => account.email === email);
  if (existingAccount) {
      alert('Ya existe una cuenta registrada con este correo electrónico.');
      return; // Salir de la función si la cuenta ya existe
  }
  
  // Guardar la cuenta en el Local Storage
  const newAccount = {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      email,
      password,
      telefono
  };
  existingAccounts.push(newAccount);
  localStorage.setItem('userAccounts', JSON.stringify(existingAccounts));
  
  // Mostrar mensaje de éxito y redirigir después de 3 segundos
  document.getElementById('signupSuccessMessage').style.display = 'block';
  document.getElementById('signupErrorMessage').style.display = 'none';
  setTimeout(function() {
      window.location.href = 'iniciarsesion.html';
  }, 3000);
}

// Agregar evento de envío al formulario
document.getElementById('signupForm').addEventListener('submit', validarFormulario);
