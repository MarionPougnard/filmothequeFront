<script setup>
import {RouterLink, useRoute} from 'vue-router'
const id = useRoute().params.id
import { ref, onMounted} from "vue"
import axios from 'axios'
import TableElement from "@/views/fragments/TableElement.vue";

const film = ref( {
  titre : '',
  annee : '',
  duree: '',
  synopsis: '',
  realisateur: '',
  acteurs: '',
  genre: '',
  avis: ''
})

const listeFilm = ref([])

async function ajouterFilm(){
  await axios.post('http://localhost:8080/api/films', film.value)
  recupererFilm()
  // on reinitialise le formulaire
  film.value.titre = ''
  film.value.annee = ''
  film.value.duree = ''
  film.value.synopsis = ''
  film.value.realisateur = ''
  film.value.acteurs = ''
  film.value.genre = ''
  film.value.avis = ''
}

async function recupererFilm(){
  const reponseHTTP = await axios.get('http://localhost:8080/api/films')
  listeFilm.value = reponseHTTP.data
}

async function edit(film){
  await axios.put(`http://localhost:8080/api/films/${film.id}`, film)
  recupererFilm()
}

async function remove(film){
  await axios.delete(`http://localhost:8080/api/films/${film.id}`, film)
  recupererFilm()
}


onMounted(() => recupererFilm())

console.log(listeFilm)
</script>

<template>
  <main>
    <RouterLink to="/films/ajouterFilm" class="btn btn-info">Ajouter un film</RouterLink>
    <TableElement
        @edit="(film) => edit(film)"
        @delete="(film) => remove(film)"
        @get="(film) => recupererFilm(film)"
        :listeModel="listeFilm"
        object="film"
        :labels="['Titre', 'Année', 'Durée', 'Réalisateur']"
        :fields="['titre', 'annee', 'duree', 'realisateur']"
    />

  </main>
</template>


