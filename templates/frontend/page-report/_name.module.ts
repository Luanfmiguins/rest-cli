import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxPaginationModule } from "ngx-pagination";
import { BaseModule } from "src/app/base/base.module";
import { _NameRoutingModule } from "./_namespace-routing.module";
import { _NamePage } from "./_namespace.page";
import { _NameService } from "./_namespace.service";

@NgModule({
  declarations: [_NamePage],
  imports: [
    _NameRoutingModule,
    NgxPaginationModule,
    BaseModule,
    CommonModule
  ],
  exports: [_NamePage],
  providers: [_NameService]
})
export class _NameModule { }
