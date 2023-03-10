import { it, expect, describe, beforeEach, afterEach } from 'vitest';
import { shallowMount } from "@vue/test-utils";
import { UiInput } from "@/components";

describe('Test input content', () => {
  let input;
  beforeEach(() => {
    input = shallowMount(UiInput, {
      propsData: {
        id: 'test-input',
        label: 'My test input',
        modelValue: 'Hello, it\'s me',
        type: 'text',
        placeholder: 'Start typing',
        name: 'testInput',
        required: true,
        isError: false,
      },
    });
  });

  it('Input is exists', () => {
    expect(input.exists()).toBe(true);
  });

  it('Is not disabled', () => {
    expect(input.get('#test-input').isDisabled()).toBe(false);
  });

  it('Has label', () => {
    expect(input.text()).toBe('My test input *')
  });

  it('Has input name', () => {
    const elInput = input.get('input[type="text"]');
    expect(elInput.html()).contain('name="testInput"')
  });

  it('Has input with id', () => {
    const elInput = input.get('input[type="text"]');
    expect(elInput.html()).contain('id="test-input"')
  });

  it('Recieves the modelValue', () => {
    const elInput = input.get('input[type="text"]');
    expect(elInput.wrapperElement['_value']).toBe('Hello, it\'s me');
  })

  it('Input is emitting the value', async () => {
    const elInput = input.get('input[type="text"]');
    const valueToSet = 'test';
    await elInput.setValue(valueToSet);
    expect(input.emitted()['update:modelValue'][0][0]).toBe(valueToSet)
  });

  afterEach(() => {
    input.unmount();
  });
});
