import { it, expect, describe, beforeEach, afterEach } from 'vitest';
import { shallowMount } from "@vue/test-utils";
import { UiRadioButton } from "@/components";

describe('Test UiRadioButton', () => {
  let input;
  beforeEach(() => {
    input = shallowMount(UiRadioButton, {
      propsData: {
        modelValue: 'apple',
        value: 'orange',
        label: 'Radiobutton label'
      },
    });
  });

  it('Input is exists', () => {
    expect(input.exists()).toBe(true);
  });

  it('Radiobutton has label', () => {
    const label = input.get('label');
    expect(label.text()).toBe('Radiobutton label')
  });

  it('Radiobutton emit the value', async () => {
    const checkbox = input.get('input[type="radio"]');
    await checkbox.trigger('change');
    expect(input.emitted().change[0][0]).toBe('orange');
  });

  it('Radiobutton checked after change', async () => {
    const checkbox = input.get('input[type="radio"]');
    expect(checkbox.element.checked).toBe(false);
    checkbox.setValue('apple')
    expect(checkbox.element.checked).toBe(true);
  });

  afterEach(() => {
    input.unmount();
  });
});
