import { Composite } from '@universityofmaryland/web-elements-library';
import { Slots, Register } from 'model';
import { Markup } from 'utilities';
import {
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
} from '../_types';
import { decl } from 'postcss';
import { ElementRef } from 'model/model';

// Tag name for the card fireworks component
const tagName = 'umd-layout-card-fireworks';

const slots: SlotConfiguration = {};

const createComponent: CreateComponentFunction = (element) => {
  const declaration = document.createElement('div') as HTMLElement;
  console.log('Test for card fireworks');
  return { element: declaration, styles: '' };
};

const registration: ComponentRegistration = Register.webComponent({
  tagName,
  slots,
  createComponent,
});

export default registration;
