<script setup>
import { useRoute } from 'vue-router'
const id = useRoute().params.id
import { ref, onMounted} from "vue"
import axios from 'axios'
import TableElement from "@/views/fragments/TableElement.vue";
import FormTextElement from "@/views/fragments/FormTextElement.vue";
import FormCheckBoxElement from "@/views/fragments/FormCheckBoxElement.vue";

const membre = ref( {
  prenom : '',
  nom : '',
  pseudo: '',
  motDePasse: '',
  admin: false
})

const listeMembre = ref([])
const listeErreurs = ref([])
async function ajouterMembre(){
  await axios.post('http://localhost:8080/api/membre', membre.value)
  recupererMembre()
  // on reinitialise le formulaire
  membre.value.prenom = ''
  membre.value.nom = ''
  membre.value.pseudo = ''
  membre.value.motDePasse = ''
  membre.value.admin = false
}

async function recupererMembre(){
  const reponseHTTP = await axios.get('http://localhost:8080/api/membre')
  listeMembre.value = reponseHTTP.data
}

async function edit(membre){
  await axios.put(`http://localhost:8080/api/membre/${membre.id}`, membre)
  recupererMembre()
}

async function remove(membre){
  await axios.delete(`http://localhost:8080/api/membre/${membre.id}`, membre)
  recupererMembre()
}

onMounted(() => recupererMembre())

console.log(listeMembre)
</script>

<template>
  <main>
    <TableElement
        @edit="(membre) => edit(membre)"
        @delete="(membre) => remove(membre)"
        @get="(membre) => recupererMembre(membre)"
        :listeModel="listeMembre"
        :labels="['Prénom', 'Nom', 'Pseudo', 'Mot de passe','Administrateur']"
        :fields="['prenom', 'nom', 'pseudo', 'motDePasse', 'admin']"/>

    <ErrorsDisplay :errors="listeErreurs"/>
    <form class="detailFilm" >
      <fieldset >
        <h1>Ajouter un membre</h1>
        <FormTextElement label="Prénom" :object="membre" field="prenom"/>
        <FormTextElement label="Nom" :object="membre" field="nom"/>
        <FormTextElement label="Pseudo" :object="membre" field="pseudo"/>
        <FormTextElement label="Mot de passe" :object="membre" field="motDePasse"/>
        <FormCheckBoxElement label="Admin" :object="membre" field="admin"/>
        <button type="button" @click="ajouterMembre" class="btn btn-info">💾</button>
      </fieldset>
    </form>

  </main>
</template>

