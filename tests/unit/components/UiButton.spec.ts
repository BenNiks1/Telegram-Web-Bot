import { mount } from '@vue/test-utils';
import UiButton from '@/components/ui/UiButton.vue';

const wrapper = mount(UiButton, {
  props: {
    size: 'sm',
    type: 'button',
  },
  slots: {
    default: 'Hello Button',
  },
});

describe('Test button content', () => {
  it('Has text', () => {
    expect(wrapper.text()).toBe('Hello Button');
  });
});
