<script setup>
import { RouterLink, RouterView } from 'vue-router'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from "axios";
import {ref} from "vue";

const param = ref()
const listeFilm = ref([])
async function rechercherFilms(){
  const reponseHTTP = await axios.get('http://localhost:8080/api/films')
  listeFilm.value = reponseHTTP.data
  param.value = ""
}


</script>

<template>
  <header>
    <div>
      <img src="./assets/images/logoFilmotheque.png" >
      <a href="/">Filmothèque</a>
    </div>
<!--    <div>-->
<!--      <form  action="@{/films}" class="d-flex" role="search">-->
<!--        <input class="form-control me-2" type="search" name="search"  v-model="param.search" placeholder="Rechercher par titre, acteurs, réalisateurs" aria-label="Search">-->
<!--        <button class="btn btn-success" type="button" @Click="rechercherFilms">🔍</button>-->
<!--      </form>-->
<!--    </div>-->
    <div>
      <RouterLink to="/films">Films</RouterLink>
      <RouterLink to="/login" class="btn btn-info">Connection</RouterLink>
      <RouterLink to="/login" class="btn btn-info">S'inscrire</RouterLink>
      <form >
        <button type="button" class="btn btn-info" @click="logout">Déconnection</button>
      </form>

    </div>
  </header>
  <main class="m-5">
    <RouterView  />
  </main>
  <footer>
    <div>
      @ ENI - Tous droits réservés
    </div>
  </footer>
</template>



