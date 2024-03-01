<script setup>
import {useRoute} from 'vue-router'
const id = useRoute().params.id
import { ref, onMounted} from "vue"
import axios from 'axios'
import ErrorsDisplay from "@/views/fragments/ErrorsDisplay.vue";

const avis = ref( {
  note : '',
  commentaire: '',
})


const listeErreurs = ref([])
async function ajouterAvis(){
  await axios.post(`http://localhost:8080/api/films/${id}/avis`, avis.value)

   // on reinitialise le formulaire
  avis.value.note = ''
  avis.value.commentaire = ''

  const router = useRoute()
  router.push(`http://localhost:8080/api/films/${id}`)
}


const film = ref( {
  titre : '',
  annee : '',
  duree: '',
  synopsis: '',
  realisateur: '',
  acteurs: '',
  genre: '',
  avis:''
})

const filmLoad = async () => {
  if (id) {
    const reponseHTTP = await axios.get(`http://localhost:8080/api/films/${id}`)
    film.value = reponseHTTP.data
  }
}
onMounted(() => {
  filmLoad()
})

</script>

<template>
  <ErrorsDisplay :errors="listeErreurs"/>
  <form class="detailFilm"   >
    <fieldset >
      <h1>Ajouter un avis au film : {{ film.titre }}</h1>
      <div class="mb-3 row ps-2 pe-2">
        <label class="col-sm-2 col-form-label">Note :</label>
        <div class="col-sm-10">
          <input v-model="avis.note" class="form-control" min="0" max="5" type="text"/>
<!--          <div th:replace="~{fragments/etoileFragment}"></div>-->
        </div>
      </div>

      <div class="mb-3 row  ps-2 pe-2">
        <label class="col-sm-2 col-form-label align-middle">Commentaire :</label>
        <div class="col-sm-10">
          <textarea v-model="avis.commentaire" class="form-control" maxlength="250"></textarea>
        </div>
      </div>
      <button type="button" @change='ajouterAvis' class="btn btn-info">Enregistrer</button>
    </fieldset>
  </form>
</template>
