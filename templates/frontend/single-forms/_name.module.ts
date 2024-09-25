import { NgModule } from "@angular/core";
import { _NameRoutingModule } from "./_namespace-routing.module";
import { _NameComponent } from "./_namespace.page";
import { _NameService } from "./_namespace.service";
import { BaseModule } from "../../base/base.module";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    _NameComponent
  ],
  imports: [
    _NameRoutingModule,
    BaseModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    _NameComponent
  ],
  providers: [
    _NameService
  ]
})
export class _NameModule { }