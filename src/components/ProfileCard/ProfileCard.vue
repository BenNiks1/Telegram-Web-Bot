<template>
  <div class="profile">
    <div class="profile__header">
      <InlineSvg
        class="header__image"
        :src="require('@/assets/static/svg/profile.svg')"
      />
      <div class="header__content">
        <p class="header__content-name">{{ name }}</p>
        <div class="header__content-rating">
          <StarRating :rating="grade" read-only :show-rating="false" :star-size="20" />
          <span>({{ gradeCount }})</span>
        </div>
      </div>
    </div>
    <div class="profile__content">
      Ближайшее время для записи:
      <div class="profile__slots">
        <UiButton
          v-for="(slot, index) in slots"
          :key="index"
          class="profile__slots-button"
          style-type="secondary"
          @click="emit('set-slot', { time: slot, master_id: profileId, name })"
        >
          {{ slot }}
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import InlineSvg from 'vue-inline-svg';
import StarRating from 'vue-star-rating';
import { UiButton } from '@/components';

defineProps({
  img: { type: String, default: '' },
  profileId: { type: Number, default: null },
  name: { type: String, default: 'userName' },
  grade: { type: Number, default: 0 },
  gradeCount: { type: Number, default: 0 },
  slots: { type: Array, default: () => [] },
});

const emit = defineEmits(['set-slot']);
</script>
<style lang="scss" scoped>
.profile {
  position: relative;

  &__header {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 10px;

    .header {
      &__image {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: $white;
        z-index: 1;
      }

      &__content {
        display: flex;
        flex-direction: column;
        gap: 5px;

        &-rating {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 14px;
          color: $color-text-secondary-contrast;

          span {
            margin-bottom: 5px;
          }
        }
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__slots {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    &-button {
      max-width: 57px;
      max-height: 35px;
      font-size: 15px;
    }
  }
}
</style>
