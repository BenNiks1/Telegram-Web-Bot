<template>
	<div class="profile">
		<div v-if="!isSkipMaster" class="profile__header">
			<InlineSvg class="header__image" src="/static/svg/profile.svg" />
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
					@click="emit('set-slot', { time: slot, master_id: master.id, name })"
				>
					{{ slot }}
				</UiButton>
			</div>
		</div>
	</div>
</template>

<script setup>
import InlineSvg from 'vue-inline-svg';
import StarRating from 'vue-star-rating';
import { UiButton } from '@/components';
import { computed } from 'vue';

const props = defineProps({
	// img: { type: String, default: '' },
	master: { type: Object, required: true },
	isSkipMaster: { type: Boolean, default: false },
	firstName: { type: String, default: 'name' },
	lasttName: { type: String, default: 'surname' },
	grade: { type: Number, default: 0 },
	gradeCount: { type: Number, default: 0 },
	slots: { type: Array, default: () => [] },
});

const emit = defineEmits(['set-slot']);

const name = computed(() => `${props.firstName} ${props.lasttName}`);
</script>

<style lang="scss" scoped>
.profile {
	font-weight: 700;

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
		gap: 15px;
	}

	&__slots {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;

		&-button {
			max-width: 57px;
			max-height: 35px;
			font-size: 15px;
			border-radius: 10px;
		}
	}
}
</style>
