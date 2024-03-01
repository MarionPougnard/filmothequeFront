<script setup>
import { useRoute } from 'vue-router'
const id = useRoute().params.id
import { ref, onMounted} from "vue"
import axios from 'axios'
import TableElement from "@/views/fragments/TableElement.vue";
import FormTextElement from "@/views/fragments/FormTextElement.vue";
import ErrorsDisplay from "@/views/fragments/ErrorsDisplay.vue";

const participant = ref( {
  prenom : '',
  nom : ''
})

const listeParticipant = ref([])
const listeErreurs = ref([])
async function ajouterParticipant(){
  await axios.post('http://localhost:8080/api/participant', participant.value)
  recupererParticipant()
  // on reinitialise le formulaire
  participant.value.prenom = ''
  participant.value.nom = ''
}

async function recupererParticipant(){
  const reponseHTTP = await axios.get('http://localhost:8080/api/participant')
  listeParticipant.value = reponseHTTP.data
}

async function edit(participant){
  await axios.put(`http://localhost:8080/api/participant/${participant.id}`, participant)
  recupererParticipant()
}

async function remove(participant){
  await axios.delete(`http://localhost:8080/api/participant/${participant.id}`, participant)
  recupererParticipant()
}

onMounted(() => recupererParticipant())

console.log(listeParticipant)
</script>

<template>
  <main>
    <TableElement
        @edit="(participant) => edit(participant)"
        @delete="(participant) => remove(participant)"
        @get="(participant) => recupererParticipant(participant)"
        :listeModel="listeParticipant"
        :labels="['Prénom', 'Nom']"
        :fields="['prenom', 'nom']"/>

    <ErrorsDisplay :errors="listeErreurs"/>
    <form class="detailFilm" >
      <fieldset >
        <h1>Ajouter un participant</h1>
        <FormTextElement label="Prénom" :object="participant" field="prenom"/>
        <FormTextElement label="Nom" :object="participant" field="nom"/>
        <button type="button" @click="ajouterParticipant" class="btn btn-info">💾</button>
      </fieldset>
    </form>

  </main>
</template>

