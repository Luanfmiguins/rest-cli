import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { _NamePage } from "./_namespace.page";

const routes: Routes = [
  {path: "", component: _NamePage},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class _NameRoutingModule { }
