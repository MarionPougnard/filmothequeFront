<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main>
    <h2 class="text-center mt-5" >Voici la bibliothèque des Films de ENI Ecole</h2>
    <div class="centre">
      <div  class="btn-group centre" role="group" aria-label="Basic example">
        <RouterLink  to="/membres" class="btn btn-outline-info">Ajouter un membre</RouterLink>
        <RouterLink  to="/films/ajouterFilm" class="btn btn-outline-info">Ajouter un film</RouterLink>
        <RouterLink  to="/genres" class="btn btn-outline-info">Ajouter un genre</RouterLink>
        <RouterLink  to="/participants" class="btn btn-outline-info">Ajouter un participant</RouterLink>
      </div>
    </div>

  </main>
</template>

