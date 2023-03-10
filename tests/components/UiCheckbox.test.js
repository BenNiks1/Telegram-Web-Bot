import { it, expect, describe, beforeEach, afterEach } from 'vitest';
import { shallowMount } from "@vue/test-utils";
import { UiCheckbox } from "@/components";

describe('Test input content', () => {
  let input;
  beforeEach(() => {
    input = shallowMount(UiCheckbox, {
      propsData: {
        fieldId: 33,
        value: [],
      },
      slots: {
        default: 'Checkbox label'
      }
    });
  });

  it('Input is exists', () => {
    expect(input.exists()).toBe(true);
  });

  it('Checkbox has label', () => {
    const label = input.get('label');
    expect(label.html()).contain('for="33"')
    expect(label.text()).toBe('Checkbox label')
  });

  it('Checkbox changes value', async () => {
    const checkbox = input.get('input[type="checkbox"]');
    await checkbox.trigger('input');
    expect(input.emitted()['update:checked'][0][0][0]).toBe(33);
  });

  afterEach(() => {
    input.unmount();
  });
});
