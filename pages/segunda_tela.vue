

<script setup lang="ts">
import { FloatLabel, InputText } from 'primevue';
import Password from 'primevue/password';
import Panel from 'primevue/panel';
import Image from 'primevue/image';
import { NuxtImg } from '#components';
// IMPORTS DAS IMAGENS
import agilidade from '../assets/images/agilidade.png'
import transparencia from '../assets/images/transparencia.png'
//import organizacao from '../assets/images/opotunidade.png'
//import eficiencia from '../assets/images/eficiencia.png'
//import confiabilidade from '../assets/images/confiabilidade.png'
//import conexao from '../assets/images/conexao.png'
//import controle from '../assets/images/controle.png'
import oportunidade from '../assets/images/oportunidade.png'


const value = ref("")

interface Card {
  title: string
  icon: string
}

const cards: Card[] = [
  { title: "Agilidade", icon: agilidade },
  { title: "Transparência", icon: transparencia },
  //{ title: "Organização", icon: organizacao },
  //{ title: "Eficiência", icon: eficiencia },
  //{ title: "Confiabilidade", icon: confiabilidade },
  //{ title: "Conexão", icon: conexao },
  //{ title: "Controle", icon: controle },
  { title: "Oportunidade", icon: oportunidade }
]
</script>



<template>
  <main>
    <!-- Seção Sobre Nós -->
    <section class="about">
      <div class="about-text">
        <h2>Sobre Nós</h2>
        <p>
          O LicitMatch nasceu para modernizar a gestão de licitações, unindo empresas
          privadas e órgãos públicos em uma plataforma única e intuitiva. Facilitamos desde
          a abertura de editais até a gestão de contratos, trazendo mais organização,
          transparência e eficiência para todo o processo. Nosso propósito é reduzir
          burocracias e oferecer soluções que fortaleçam a parceria entre governo e
          empresas, sempre com foco em gerar valor para a sociedade.
        </p>
      </div>
      <div class="about-logo">
        <img src="../assets/images/licitmatch.png" alt="LicitMatch Logo" />
      </div>
    </section>

    <!-- Seção de Valores -->
    <section class="values">
      <div v-for="card in cards" :key="card.title" class="card">
        <img :src="card.icon"/>
        <h3>{{ card.title }}</h3>
        <NuxtLink to="/" class="back-link">Voltar para a Home</NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px;
}

/* SOBRE NÓS */
.about {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #00408a;
  color: white;
  padding: 40px;
  border-radius: 15px;
}

.about-text {
  max-width: 60%;
}

.about-text h2 {
  margin-bottom: 15px;
}

.about-logo img {
  width: 120px;
}

/* CARDS DE VALORES */
.values {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 20px;
  color: #003366;
  font-weight: 600;
}

.card img {
  width: 60px;
  margin-bottom: 10px;
}
</style>