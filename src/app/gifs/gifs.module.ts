import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageComponent } from './main-page/main-page.component';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [MainPageComponent, SearchComponent, ResultsComponent],
  exports: [MainPageComponent],
  imports: [CommonModule],
})
export class GifsModule {}
