<template>
	<div class="checkbox">
		<input
			:id="fieldId"
			type="checkbox"
			:checked="value.includes(fieldId)"
			class="checkbox__input"
			@input="() => $emit('update:checked', check(fieldId))"
		/>
		<label :for="fieldId" class="checkbox__label">
			<slot></slot>
		</label>
	</div>
</template>

<script setup>
const props = defineProps({
	fieldId: {
		type: Number,
		required: true,
	},
	value: {
		type: Array,
		required: true,
	},
});

const check = (optionId) => {
	const updatedValue = [...props.value];
	if (!props.value.includes(optionId)) {
		updatedValue.push(optionId);
	} else {
		updatedValue.splice(updatedValue.indexOf(optionId), 1);
	}
	return updatedValue;
};
</script>

<style lang="scss" scoped>
.checkbox {
	position: relative;

	input[type='checkbox'] {
		position: absolute;
		left: -30px;
		top: 50%;
		transform: translateY(-50%);
		width: 20px;
		height: 20px;
		color: $base-color;
		border: 1px solid $color-border;
		border-radius: 4px;
		appearance: none;
		cursor: pointer;
		transition: background 175ms cubic-bezier(0.1, 0.1, 0.25, 1);
		&::before {
			position: absolute;
			content: '';
			display: block;
			top: 50%;
			left: 50%;
			width: 6px;
			height: 10px;
			border-style: solid;
			border-color: $white;
			border-width: 0 2px 2px 0;
			transform: translate(-50%, -50%) rotate(45deg);
			opacity: 0;
		}
		&:checked {
			color: $white;
			border-color: $primary;
			background: $primary;
			&::before {
				opacity: 1;
			}
		}
	}

	label {
		cursor: pointer;
		user-select: none;
	}
}
</style>
