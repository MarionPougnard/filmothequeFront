<script setup>
import { ref} from "vue"

defineProps(['listeModel', 'object', 'labels', 'fields', ])
const emit = defineEmits(['edit', 'delete', 'get'])
const editItemId = ref()
</script>


<template>
   <table class="table table-striped">
       <thead>
          <tr class="table-dark">
            <th v-for="label in labels">{{ label }}</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
       </thead>
      <tbody>
        <tr v-for="element in listeModel">
          <template v-if="editItemId !== element?.id">
            <td v-for="field in fields">
              <template v-if="field === 'realisateur'">
                {{ element.realisateur.prenom }} {{ element.realisateur.nom }}
              </template>
              <template v-else>
                {{ element[field] }}
              </template>
            </td>
            <td>
              <RouterLink v-if="object === 'film'" type="button" :to="'/films/' + element.id " class="btn btn-info" >...</RouterLink>
            </td>
            <td>
              <button type="button" @click="editItemId=element.id" class="btn btn-warning">✎</button>
            </td>
            <td>
              <button type="button" @click="emit('delete', element)" class="btn btn-danger">X</button>
            </td>
          </template>
          <template v-else>
            <td v-for="field in fields">
              <template v-if="field === 'realisateur'">
                <input :value="`${element.realisateur.prenom} ${element.realisateur.nom}`">
              </template>
              <template v-else>
                <input v-model="element[field]">
              </template>
            </td>
            <td >
            </td>
            <td>
              <button type="button" @click="emit('edit', element); editItemId=0" class="btn btn-success" >✔</button>
            </td>
            <td>
              <button type="button" @click="emit('get', element.id); editItemId=0" class="btn btn-danger">↲</button>
            </td>
          </template>
         </tr>
      </tbody>
  </table>
</template>