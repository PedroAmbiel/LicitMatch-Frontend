<template>
  <div class="hero">
    <nav class="menu">
      <ul>
        <li>
          <NuxtLink class="menu-link" to="/public/segunda_tela">
            Sobre Nós
          </NuxtLink>
        </li>
        <!-- <li>
          <a class="menu-link" href="#">Contato</a>
        </li> -->
        <li>
          <NuxtLink class="login-button" to="/public/auth/login">
            Área Logada
          </NuxtLink>
        </li>
      </ul>
    </nav>
    
    <div class="overlay">
      <div class="content">
        <div class="logo-wrapper">
          <img src="/assets/images/licitmatch1.png" alt="LicitMatch Logo" class="logo scale-150" />
        </div>
        
        <div class="text-content">
          <p class="description">
            Temos o compromisso de proporcionar a melhor experiência de contratação entre
            <span class="highlight">Órgãos Públicos</span> e <span class="highlight">Empresas Privadas</span>.
          </p>
          
          <p class="subtitle">Uma gestão ágil e eficaz do início ao fim.</p>
        </div>
      </div>
    </div>
    
    <div class="background-elements">
      <div class="blur-circle circle-1"></div>
      <div class="blur-circle circle-2"></div>
      <div class="blur-circle circle-3"></div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  background: linear-gradient(to bottom right, #e8ecf1 0%, #f5f7fa 50%, #dde4ed 100%);
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.background-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.blur-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
}

.circle-1 {
  width: 500px;
  height: 500px;
  background: #0055aa;
  top: -150px;
  right: -100px;
}

.circle-2 {
  width: 400px;
  height: 400px;
  background: #003366;
  bottom: -100px;
  left: -150px;
}

.circle-3 {
  width: 350px;
  height: 350px;
  background: #0066cc;
  top: 40%;
  right: 15%;
}

.menu {
  position: relative;
  z-index: 10;
  padding: 2rem 5rem;
  display: flex;
  justify-content: flex-end;
}

.menu ul {
  list-style: none;
  display: flex;
  gap: 3rem;
  align-items: center;
  margin: 0;
  padding: 0;
}

.menu-link {
  text-decoration: none;
  color: #003366;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  position: relative;
}

.menu-link:hover {
  color: #0055aa;
}

.login-button {
  background: #0055aa;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.1rem;
}

.login-button:hover {
  background: #003366;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 51, 102, 0.3);
}

.overlay {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 5rem;
  position: relative;
  z-index: 1;
}

.content {
  max-width: 700px;
}

.logo-wrapper {
  margin-bottom: 9rem;
}

.logo {
  width: 280px;
  filter: drop-shadow(0 4px 8px rgba(0, 51, 102, 0.1));
}

.text-content {
  max-width: 650px;
}

.description {
  color: #003366;
  font-size: 1.5rem;
  line-height: 1.6;
  margin: 0 0 2rem 30px;
  font-weight: 400;
}

.highlight {
  font-weight: 700;
  color: #0055aa;
}

.subtitle {
  color: #6b7a8f;
  font-size: 1.15rem;
  font-weight: 400;
  margin: 0 0 0 30px;
  font-style: italic;
}

@media (max-width: 1200px) {
  .menu {
    padding: 2rem 3rem;
  }
  
  .overlay {
    padding: 0 3rem;
  }
}

@media (max-width: 768px) {
  .menu {
    padding: 1.5rem 2rem;
  }
  
  .menu ul {
    gap: 1.5rem;
    font-size: 0.95rem;
  }
  
  .overlay {
    padding: 0 2rem;
  }
  
  .logo {
    width: 220px;
  }
  
  .description {
    font-size: 1.25rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .menu ul {
    gap: 1rem;
  }
  
  .menu-link {
    font-size: 0.9rem;
  }
  
  .login-button {
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
  }
  
  .logo {
    width: 180px;
  }
  
  .description {
    font-size: 1.1rem;
  }
}
</style>