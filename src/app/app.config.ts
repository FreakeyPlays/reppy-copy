import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideSvgIconsConfig } from '@ngneat/svg-icon';
import { routes } from './app.routes';

import { addIcon } from './svg/add';
import { deleteIcon } from './svg/delete';
import { editIcon } from './svg/edit';
import { exerciseIcon } from './svg/exercise';
import { keyboardArrowUpIcon } from './svg/keyboard_arrow_up';
import { skipNextIcon } from './svg/skip_next';
import { visibilityIcon } from './svg/visibility';
import { visibilityOffIcon } from './svg/visibility_off';
import { weightIcon } from './svg/weight';

export const appConfig: ApplicationConfig = {
  providers: [
    provideSvgIconsConfig({
      sizes: {
        sm: '16px',
        md: '32px',
        lg: '48px',
      },
      defaultSize: 'md',
      icons: [
        exerciseIcon,
        addIcon,
        deleteIcon,
        editIcon,
        skipNextIcon,
        weightIcon,
        keyboardArrowUpIcon,
        visibilityIcon,
        visibilityOffIcon,
      ],
    }),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
  ],
};
