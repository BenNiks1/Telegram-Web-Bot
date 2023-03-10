<template>
	<div class="input">
		<label v-if="label" :for="id" class="input__label">
			{{ label }}
			<span v-if="required" class="input__required">*</span>
		</label>
		<div class="input__control">
			<div class="input__slot" :class="{ error: isError }">
				<div class="input__wrap">
					<input
						:id="id"
						ref="input"
						class="input__field"
						:type="type"
						:name="name"
						:value="modelValue"
						:placeholder="placeholder"
						@change="$emit('update:modelValue', $event.target.value)"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		id: { type: String, default: null },
		label: { type: String, default: null },
		modelValue: { type: String, default: null },
		type: { type: String, default: null },
		placeholder: { type: String, default: null },
		name: { type: String, default: null },
		required: { type: Boolean, default: false },
		isError: { type: Boolean, default: false },
	},
};
</script>

<style lang="scss" scoped>
.input {
	width: 100%;
	position: relative;
	z-index: 1;
	min-height: 28px;
	cursor: text;
	transition: $transition-duration ease-in-out;
	transition-property: border-color;

	&__label {
		font-size: 12px;
		line-height: 14px;
		color: rgba($base-color, 0.5);
		display: block;
		margin-bottom: 8px;
		transition: all $transition-duration;
	}

	&__required {
		color: $red;
	}

	&__control {
		width: 100%;
	}

	&__slot {
		border-radius: 16px;
		border: 1px solid $color-border;
		transition: border $transition-duration;

		&.error {
			border-color: $red;
		}

		&:hover {
			border-color: rgba($green, 0.5);
		}
	}

	&__wrap {
		display: flex;
		align-items: center;
		flex: 1 1 auto;
		position: relative;
	}

	&__field {
		font-family: $font;
		font-size: $font-size-base;
		line-height: $font-lh-base;
		font-weight: 500;
		flex: 1 1 auto;
		padding: 14px 20px;
		border-radius: 16px;
		max-width: 100%;
		width: 100%;
		background-color: $white;
		position: relative;
		z-index: 3;
		color: $base-color;
		display: block;
		min-width: 50px;
		border: none;
		transition: 0.4s ease-in-out;
		transition-property: padding-top, color;

		@include placeholder($color-text-secondary);

		&:focus {
			outline: none;
		}

		&:disabled {
			color: $color-text-secondary-contrast;
		}
	}
}
</style>
