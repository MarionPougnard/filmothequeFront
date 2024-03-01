<script setup>
import { useRoute } from 'vue-router'
const id = useRoute().params.id
import { ref, onMounted} from "vue"
import axios from 'axios'
import FormTextElement from "@/views/fragments/FormTextElement.vue";
import ErrorsDisplay from "@/views/fragments/ErrorsDisplay.vue";


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

const listeFilm = ref([])
const listeGenre = ref([])
const listeParticipants = ref([])
const listeErreurs = ref([])
async function ajouterFilm(){
await axios.post('http://localhost:8080/api/films/ajouterFilm', film.value)
recupererFilm()
// on reinitialise le formulaire
film.value.titre = ''
film.value.annee = ''
film.value.duree = ''
film.value.synopsis = ''
film.value.realisateur = ''
film.value.acteurs = ''
film.value.genre = ''
}

async function recupererFilm(){
  const reponseHTTP = await axios.get('http://localhost:8080/api/films')
  listeFilm.value = reponseHTTP.data
}

async function recupererParticipant(){
  const reponseHTTP = await axios.get ('http://localhost:8080/api/participant')
  listeParticipants.value = reponseHTTP.data
}
async function recupererGenre(){
  const reponseHTTP = await axios.get ('http://localhost:8080/api/genre')
  listeGenre.value = reponseHTTP.data
}


onMounted(() => {
  recupererParticipant()
  recupererGenre()
  filmLoad()
})

console.log(listeFilm)
</script>

<template>
  <main>
    <ErrorsDisplay :errors="listeErreurs"/>
    <form class="detailFilm" >
      <fieldset >
        <h1>{{ id ? 'Détail du film :' + film.titre : 'Ajouter un film' }}</h1>
        <FormTextElement label="Titre" :object="film" field="titre"/>
        <div class="mb-3 row ps-2 pe-2">
          <label class="col-sm-2 col-form-label">Genre</label>
          <div class="col-sm-10">
            <select v-model="film.genre" class="form-select" field="genre">
              <option v-for="element in listeGenre" :value="element">
                {{ element.titre }}
              </option>
            </select>
          </div>
          <br><br>
        </div>
        <FormTextElement label="Année" :object="film" field="annee"/>
        <FormTextElement label="Durée" :object="film" field="duree"/>
        <FormTextElement label="Synopsis" :object="film" field="synopsis"/>
        <div class="mb-3 row ps-2 pe-2">
          <label class="col-sm-2 col-form-label">Réalisateur</label>
          <div class="col-sm-10">
            <select v-model="film.realisateur" class="form-select" field="realisateur">
              <option v-for="element in listeParticipants" :value="element">
                {{ element.prenom }} {{ element.nom }}
              </option>
            </select>
          </div>
          <br><br>
        </div>
        <div class="mb-3 row ps-2 pe-2">
          <label class="col-sm-2 col-form-label">Acteur(s)</label>
          <div class="col-sm-10">
            <select multiple v-model="film.acteurs" class="form-select" field="acteurs">
              <option v-for="element in listeParticipants" :value="element">
                {{ element.prenom }} {{ element.nom }}
              </option>
            </select>
          </div>
          <br><br>
        </div>
        <div v-if="id" class="mb-3 row  ps-2 pe-2">
          <label class="col-sm-2 col-form-label align-middle">Avis :</label>
          <div  class="col-sm-10">
                <span v-for="avis in film.avis" >
                    <div> {{ avis.note }} : {{ avis.commentaire }}</div>
                </span>
          </div>
        </div>
        <RouterLink v-if="id" :to="'/films/' + film.id + '/avis'" class="btn btn-info">+ Avis</RouterLink>
        <button type="button" @change="ajouterFilm" class="btn btn-info">💾</button>
      </fieldset>
    </form>
  </main>
</template>
<ErrorsDisplay :errors="listeErreurs"/>

