<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types';
import type { NewMarker } from '~/types/Marker';
import { MarkerSchema, type MarkerSchemaType } from '~/schemas/Marker';
import { parseIcon } from '~/schemas/Icon';
import { Marker as MarkerClass } from '~/classes/Marker';
import { $placeMarker } from '~/composables/gateway/placeMarker';
import { IconOptions } from '~/schemas/Icon';

const { coords, locatedAt } = useGeolocation();
const markers = useState<MarkerClass[]>('markers');
const submitting = ref<boolean>();

const state = reactive<NewMarker>({
  id: undefined,
  username: undefined,
  title: undefined,
  position: undefined,
  description: undefined,
  icon: undefined,
  color: undefined,
});

watch(locatedAt, () => {
  state.position = { latitude: coords.value.latitude, longitude: coords.value.longitude };
});

async function onSubmit(event: FormSubmitEvent<MarkerSchemaType>) {
  submitting.value = true;
  const [data, error] = await $placeMarker(event.data);
  if (data && !error) {
    const createdMarker = new MarkerClass({ ...event.data, ...data });
    markers.value = [...markers.value, createdMarker];
    // reset form
    state.title = undefined;
    state.description = undefined;
    state.icon = undefined;
    state.color = undefined;
  }
  submitting.value = false;
}
</script>
<template>
  <Modal>
    <template #header> Create a Marker </template>
    <template #content>
      <UForm :schema="MarkerSchema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Title" name="title">
          <UInput v-model="state.title" />
        </UFormGroup>
        <UFormGroup label="Description" name="description">
          <UInput v-model="state.description" />
        </UFormGroup>
        <UFormGroup label="Icon" name="icon">
          <span class="flex gap-2 w-full h-8">
            <USelectMenu v-model="state.icon" :options="IconOptions" option-attribute="name" class="w-full">
              <template #label>
                <span v-if="state.icon" class="flex gap-2 justify-center items-center whitespace-nowrap">
                  <ICustom :icon="state.icon" :color="state.color" size="sm" />
                  {{ parseIcon(state.icon) }}
                </span>
                <span v-else :icon="state.icon">Select Icon...</span>
              </template>
              <template #option="{ option: icon }">
                <span class="flex gap-2 justify-center items-center whitespace-nowrap">
                  <ICustom :icon="icon" :color="state.color" />
                  {{ parseIcon(icon) }}
                </span>
              </template>
            </USelectMenu>
            <UInput v-model="state.color" type="color" class="w-full"> </UInput>
          </span>
        </UFormGroup>
        <UButton type="submit" :disabled="submitting"> Submit </UButton>
      </UForm>
    </template>
  </Modal>
</template>
