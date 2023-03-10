<template>
	<div class="ui-delimiter">
		<div v-if="type === 'solid'" class="ui-delimiter--solid" />
		<div v-if="type === 'dotted'" class="ui-delimiter--dotted" />
	</div>
</template>

<script setup>
defineProps({
	/**
	 * Тип разделителя solid / dotted
	 * @type{string}
	 */
	type: {
		type: String,
		default: '',
		required: false,
	},
});
</script>

<style lang="scss" scoped>
.ui-delimiter {
	width: 100%;
	height: 25px;
	padding: 10px 0;

	&--dotted {
		border: 1px dashed $color-border;
	}

	&--solid {
		border: 1px solid $color-border;
	}
}
</style>
