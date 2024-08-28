document.addEventListener('DOMContentLoaded', function() {
  // Inicializar ícones Lucide
  lucide.createIcons();

  // Configuração do Particles.js
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#00ffff' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: '#00ffff', opacity: 0.4, width: 1 },
      move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
      modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
  });

  // Função para fazer requisições à API
  async function apiRequest(url, method, data) {
    try {
      const response = await fetch(`http://localhost:3000${url}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  }

  // Login
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      try {
        const data = await apiRequest('/login', 'POST', { email, password });
        alert(data.message);
        if (data.token) {
          localStorage.setItem('token', data.token);
          window.location.href = 'dashboard.html'; // Redireciona para o dashboard (você precisa criar esta página)
        }
      } catch (error) {
        alert('Erro no login. Verifique suas credenciais.');
      }
    });
  }

  // Registro
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;

      if (password !== confirmPassword) {
        alert('As senhas não coincidem. Por favor, tente novamente.');
        return;
      }

      try {
        const data = await apiRequest('/register', 'POST', { name, email, password });
        alert(data.message);
        if (data.userId) {
          window.location.href = 'index.html'; // Redireciona para a página de login após o registro bem-sucedido
        }
      } catch (error) {
        alert('Erro no registro. Por favor, tente novamente.');
      }
    });
  }

  // Recuperação de senha
  const forgotPasswordForm = document.getElementById('forgotPasswordForm');
  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      try {
        const data = await apiRequest('/forgot-password', 'POST', { email });
        alert(data.message);
      } catch (error) {
        alert('Erro ao solicitar recuperação de senha. Por favor, tente novamente.');
      }
    });
  }
});
