<script setup lang="ts">
import type { Marker } from '~/classes/Marker';
import { Icon } from '~/schemas/Icon';

const markers = useState<Marker[]>('markers');
const isButtonsExpanded = useState<boolean>('navExpanded', () => false);
const isDeleteView = useState<boolean>('deleteView', () => false);
const isUserView = useState<boolean>('userView', () => false);

const handleExpanded = () => {
  isButtonsExpanded.value = !isButtonsExpanded.value;
};
const handleDelete = () => {
  isDeleteView.value = !isDeleteView.value;
};
const handleFindUsers = () => {
  isUserView.value = !isUserView.value;
};
</script>

<template>
  <main class="max-w-full overflow-x-hidden relative w-full h-full">
    <Map />
    <nav class="absolute bottom-4 left-4 grid grid-cols-2 w-fit">
      <NavIconButton
        v-if="isButtonsExpanded"
        :expanded="isUserView"
        @click="handleFindUsers"
        size="sm"
        class="mb-4"
        :icon="Icon.PERSON"
      />
      <NavIconButton
        v-if="isButtonsExpanded"
        :expanded="isDeleteView"
        @click="handleDelete"
        size="sm"
        class="-mb-4 -ml-4"
        :icon="Icon.REMOVE"
        :disabled="!markers.length"
      />
      <NavIconButton
        :expanded="isButtonsExpanded"
        @click="handleExpanded"
        size="md"
        :class="'-mt-4 ml-4'"
        :icon="Icon.COMPASS"
      />
      <NavIconModalButton v-if="isButtonsExpanded" size="sm" class="ml-2 -mt-2" :icon="Icon.LOCATION">
        <ModalCreateMarker />
      </NavIconModalButton>
    </nav>
  </main>
</template>
