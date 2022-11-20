import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BaseModule } from "src/app/base/base.module";
import { _NameRoutingModule } from "./_namespace-routing.module";
import { _NamePage } from "./_namespace.page";
import { _NameService } from "./_namespace.service";
import { Read_NameGuard } from "./guards/read._name.guard";
import { Create_NameGuard } from "./guards/create._name.guard";
import { Update_NameGuard } from "./guards/update._name.guard";
import { Delete_NameGuard } from "./guards/delete._name.guard";
import { CreateUpdate_NameComponent } from './components/modal-to-create-update/create-update-_name.component';
import { ModalToRemove_NameComponent } from './components/modal-to-remove/modal-to-remove-_name.component';

@NgModule({
  declarations: [_NamePage, CreateUpdate_NameComponent, ModalToRemove_NameComponent],
  imports: [
    _NameRoutingModule,
    BaseModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [_NamePage],
  providers: [
    _NameService,
    Read_NameGuard,
    Create_NameGuard,
    Update_NameGuard,
    Delete_NameGuard
  ]
})
export class _NameModule { }
