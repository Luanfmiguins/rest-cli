import { NgModule } from "@angular/core";
import { _NameRoutingModule } from "./_namespace-routing.module";
import { _NamePage } from "./_namespace.page";
import { _NameService } from "./_namespace.service";

@NgModule({
  declarations: [_NamePage],
  imports: [_NameRoutingModule],
  exports: [_NamePage],
  providers: [_NameService]
})
export class _NameModule { }
