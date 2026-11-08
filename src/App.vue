<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Inicio</RouterLink> | 
      <RouterLink to="/task/1">Detalle (Prueba)</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
}
nav {
  background-color: #42b883;
  padding: 15px;
  text-align: center;
}
nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  margin: 0 10px;
}
nav a.router-link-exact-active {
  text-decoration: underline;
}
main {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}
</style>