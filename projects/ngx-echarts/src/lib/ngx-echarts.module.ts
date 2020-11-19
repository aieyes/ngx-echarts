import {NgModule, ModuleWithProviders, APP_INITIALIZER} from '@angular/core';
import { NgxEchartsDirective, NgxEchartsConfig, NGX_ECHARTS_CONFIG } from './ngx-echarts.directive';
import {loadRes, RESOURCE} from './ngx-echarts.common';

export function initialize(options: NgxEchartsConfig) {
  if (typeof options.echarts === 'string') {
    RESOURCE.echarts.src = options.echarts;
    return () => loadRes('echarts');
  }
  return () => Promise.resolve();
}

@NgModule({
  imports: [],
  declarations: [NgxEchartsDirective],
  exports: [NgxEchartsDirective],
})
export class NgxEchartsModule {
  static forRoot(config: NgxEchartsConfig): ModuleWithProviders<NgxEchartsModule> {
    return {
      ngModule: NgxEchartsModule,
      providers: [
        { provide: NGX_ECHARTS_CONFIG, useValue: config },
        {
          provide: APP_INITIALIZER,
          useFactory: initialize,
          deps: [NGX_ECHARTS_CONFIG],
          multi: true
        }
        ],
    };
  }
  static forChild() {
    return {
      ngModule: NgxEchartsModule,
    };
  }
}

export { NgxEchartsDirective, NGX_ECHARTS_CONFIG };
