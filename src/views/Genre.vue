<script setup>
import { useRoute } from 'vue-router'
const id = useRoute().params.id
import { ref, onMounted} from "vue"
import axios from 'axios'
import TableElement from "@/views/fragments/TableElement.vue";
import FormTextElement from "@/views/fragments/FormTextElement.vue";
import ErrorsDisplay from "@/views/fragments/ErrorsDisplay.vue";

const genre = ref( {
  titre: ''
})

const listeGenre = ref([])
const listeErreurs = ref([])
async function ajouterGenre(){
  try {
    await axios.post('http://localhost:8080/api/genre', genre.value)
  } catch(error){
    listeErreurs.value = error.response.data.errors
  }
  recupererGenre()
  // on reinitialise le formulaire
  genre.value.titre = ''
}

async function recupererGenre(){
  const reponseHTTP = await axios.get('http://localhost:8080/api/genre')
  listeGenre.value = reponseHTTP.data
}

async function edit(genre){
  await axios.put(`http://localhost:8080/api/genre/${genre.id}`, genre)
  recupererGenre()
}

async function remove(genre){
  await axios.delete(`http://localhost:8080/api/genre/${genre.id}`, genre)
  recupererGenre()
}

onMounted(() => recupererGenre())

console.log(listeGenre)
</script>

<template>
  <main>
    <TableElement
        @edit="(genre) => edit(genre)"
        @delete="(genre) => remove(genre)"
        @get="(genre) => recupererGenre(genre)"
        :listeModel="listeGenre"
        :labels="['Genre']"
        :fields="['titre']"/>

    <ErrorsDisplay :errors="listeErreurs"/>
    <form class="detailFilm" >
      <fieldset >
        <h1>Ajouter un genre</h1>
        <FormTextElement :object="genre" label="Genre" field="titre" />
        <button type="button" @click="ajouterGenre" class="btn btn-info">💾</button>
      </fieldset>
    </form>

  </main>
</template>
