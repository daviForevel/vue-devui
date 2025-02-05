import { inject } from 'vue';
import type { Ref, SetupContext } from 'vue';
import { FORM_ITEM_TOKEN, FormItemContext } from '../../../form/src/components/form-item/form-item-types';
import { UseInputEvent } from '../input-types';

export function useInputEvent(isFocus: Ref<boolean>, ctx: SetupContext): UseInputEvent {
  const formItemContext = inject(FORM_ITEM_TOKEN, undefined) as FormItemContext;
  const onFocus = (e: FocusEvent) => {
    isFocus.value = true;
    ctx.emit('focus', e);
  };

  const onBlur = (e: FocusEvent) => {
    isFocus.value = false;
    ctx.emit('blur', e);
    formItemContext?.validate('blur').catch((err) => console.warn(err));
  };

  const onInput = (e: Event) => {
    ctx.emit('update:modelValue', (e.target as HTMLInputElement).value);
  };

  const onChange = (e: Event) => {
    ctx.emit('change', (e.target as HTMLInputElement).value);
  };

  const onKeydown = (e: KeyboardEvent) => {
    ctx.emit('keydown', e);
  };

  return { onFocus, onBlur, onInput, onChange, onKeydown };
}
