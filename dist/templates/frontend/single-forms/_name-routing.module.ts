import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { _NameComponent } from "./_namespace.component";

const routes: Routes = [
  {path: "", component: _NameComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class _NameRoutingModule { }
