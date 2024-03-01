<script setup>
// pour pouvoir utiliser des propriétés sur nos composant, je suis obligé de les définir avec la méthode defineProps
// une fois que c'est défini, je peux les utiliser dans mon template comme des varaibles de mon modèle
defineProps(['object', 'label', 'field'])
</script>



<template>
     <div class="mb-3 row ps-2 pe-2">
          <label class="col-sm-2 col-form-label">{{label}} </label>
          <!-- v-model="object[field]" : ce champs de saisie modifie l'attribut correspondant à la prop "field", de la référence au modèle correspondant à la porporiété "object" -->
          <div class="col-sm-10">
            <select>
              <option v-for="element in object" :value="field">
                {{ element.field.prenom }} {{ element.field.nom }}
              </option>
            </select>
          </div>
          <br><br>
     </div>
</template>