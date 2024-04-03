<script setup lang="ts">
import { CustomMarker } from 'vue3-google-map';
import type { Marker } from '~/classes/Marker';
import { useFocus } from '@vueuse/core';
import { $removeMarker } from '@gateway/removeMarker';
import { Icon } from '~/schemas/Icon';
const props = defineProps<{
  marker: Marker;
}>();

const isDeleteView = useState('deleteView');
const isUserView = useState('userView');
const markers = useState<Marker[]>('markers');

const target = ref();
const { focused } = useFocus(target);
const handleClick = () => {
  if (isDeleteView.value) {
    markers.value = markers.value?.filter((m) => m.getId() !== props.marker.getId());
    $removeMarker(props.marker);

    if (!markers.value.length) isDeleteView.value = false;
  }
};
</script>

<template>
  <CustomMarker
    v-if="isUserView || marker.getIcon() !== Icon.PERSON"
    :options="{ position: marker.getMapPosition(), anchorPoint: 'CENTER' }"
    class="relative cursor-pointer"
    :ref="target"
  >
    <UPopover v-model:open="focused">
      <span @click="handleClick" :key="marker.getId()" class="relative flex flex-col text-xl text-black">
        <ICustom :icon="marker.getIcon()" :color="marker.getColor()" size="md" />
        <IRemove v-if="isDeleteView" class="absolute w-full h-full z-50" fill="red" />
      </span>
      <template #panel>
        <div class="p-2 flex flex-col items-center justify-center">
          <h5 class="text-sm px-4 whitespace-nowrap">{{ marker.getTitle() }}</h5>
          <p v-if="marker.hasDescription()">{{ marker.getDescription() }}</p>
        </div>
      </template>
    </UPopover>
  </CustomMarker>
</template>
