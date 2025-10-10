<template>
  <div class="hero">
    <nav class="menu">
      <ul>
          <li><NuxtLink class="login-button" to="/public/segunda_tela">
              Sobre nós
            </NuxtLink></li>
        <li><a href="#">Contato</a></li>
        <li><NuxtLink class="login-button" to="/public/auth/login">Área Logada</NuxtLink></li>
        
      </ul>
    </nav>
    <div class="overlay">
      <div class="content">
        <img src="/assets/images/licitmatch1.png" alt="LicitMatch Logo" class="logo" />
        <h1>CONTE COM A LICITMATCH!</h1>
        <p>
          Temos o compromisso de proporcionar a melhor experiência de contratação entre
          <strong>Órgãos Públicos</strong> e <strong>Empresas Privadas</strong>.
        </p>
        <small>Uma gestão ágil e eficaz do início ao fim.</small>
        
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  background-image: url("/assets/images/ConnectGov_1.png"); /* imagem de fundo */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
}
.overlay {
  flex: 0;
  margin-top: 90px;
  display: flex;
  align-items: center;
  padding-left: 80px; /* Aumenta o espaçamento da esquerda */
  max-width: 700px;
  color: #003366;
}


.content {
  max-width: 600px;
  color: #003366;
  gap:0px;
}

.logo {
  width: 250px;
  margin-bottom: 90px;
}

.menu {
  position: absolute;
  top: 50px;
  right: 30px;
  gap:30px;
  margin-top: 50px;
}

.menu ul {
  list-style: none;
  display: flex;
  gap: 20px;
  align-items: center;
  margin: 0;
  padding: 0;
}

.menu a {
  text-decoration: none;
  color: #003366;
  font-weight: bold;
  font-weight: 600;
}

.login-button {
  background-color: white;
  color: #003366;
  padding: 6px 14px;
  border-radius: 15px;
  border: 1px solid #003366;
  margin-top: 50px;


  
}
</style>
