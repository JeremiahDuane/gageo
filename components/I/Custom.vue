<script setup lang="ts">
import { Icon } from '~/schemas/Icon';

const props = defineProps<{
  icon?: Icon;
  color?: string;
  size?: string;
}>();
const isIcon = (i: Icon) => i === props.icon;
const styles = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-4 h-4';
    case 'md':
      return 'w-8 h-8';
    default:
      return 'w-12 h-12';
  }
});
</script>

<template>
  <IBeeBox v-if="isIcon(Icon.BEE_BOX)" :fill="color" :class="styles" />
  <IBeeHive v-else-if="isIcon(Icon.BEE_HIVE)" :fill="color" :class="styles" />
  <ICampGround v-else-if="isIcon(Icon.CAMP_GROUND)" :fill="color" :class="styles" />
  <IHouse v-else-if="isIcon(Icon.HOMESTEAD)" :fill="color" :class="styles" />
  <IOffice v-else-if="isIcon(Icon.OFFICE)" :fill="color" :class="styles" />
  <IUser v-else-if="isIcon(Icon.USER)" :fill="color" :class="styles" />
  <IWallTent v-else-if="isIcon(Icon.WALL_TENT)" :fill="color" :class="styles" />
  <IWater v-else-if="isIcon(Icon.WATER)" :fill="color" :class="styles" />
  <IWell v-else-if="isIcon(Icon.WELL)" :fill="color" :class="styles" />
  <IDog v-else-if="isIcon(Icon.DOG)" :fill="color" :class="styles" />
  <ILocation v-else-if="isIcon(Icon.LOCATION)" :fill="color" :class="styles" />
  <ICompass v-else-if="isIcon(Icon.COMPASS)" :fill="color" :class="styles" />
  <IRemove v-else-if="isIcon(Icon.REMOVE)" :fill="color" :class="styles" />
  <IPerson v-else-if="isIcon(Icon.PERSON)" :fill="color" :class="styles" />
  <IPin v-else :fill="color" :class="styles" />
</template>
