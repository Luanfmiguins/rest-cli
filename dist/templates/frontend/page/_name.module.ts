import { NgModule } from "@angular/core";
import { _NameRoutingModule } from "./_namespace-routing.module";
import { _NameComponent } from "./_namespace.component";
import { _NameService } from "./_namespace.service";

@NgModule({
  declarations: [_NameComponent],
  imports: [_NameRoutingModule],
  exports: [_NameComponent],
  providers: [_NameService]
})
export class _NameModule { }
