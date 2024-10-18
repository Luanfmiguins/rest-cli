import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseService } from 'src/app/base/base.service';
import { _NameService } from '../../_name.service';
import { _NameInterface } from '../../_name.interface';

@Component({
  selector: 'app-create-update-_name',
  templateUrl: './create-update-_name.component.html',
  styleUrls: ['./create-update-_name.component.scss']
})
export class CreateUpdate_NameComponent implements OnInit {
  @Input() fields: any;
  @Input() itemUpdate: _NameInterface;
  _NameForm: FormGroup;

  loading = false;
  listErrors: any[] = [];
  operation: string = "create";
  titleModal: string = "Criar";
  titleButton: string = "Criar";

  constructor(
    private _nameService: _NameService,
    private toastService: BaseService,
    public activeModal: NgbActiveModal
  ) { }


  ngOnInit(): void {
    const validators = {
      required: Validators.required
    };

    const formControls = {};
    for (const field of this.fields) {
      const control = new FormControl("", field.required ? validators.required : null);

      formControls[field.value] = control;
    }

    this._NameForm = new FormGroup(formControls);

    if (this.itemUpdate) {
      this.setUpdateValues()
      this.setFill()
    }
  }

  setUpdateValues() {
    this.operation = "Update";
    this.titleModal = "Atualizar";
    this.titleButton = "Atualizar";
  }

  setFill() {
    for (let field of this.fields) {
      this._NameForm.get(field.value)?.setValue(this.itemUpdate[field.value]);
    }
  }

    onSubmit() {
    if (this.operation === "create") {
      this.saveItem()
    } else {
      this.updateItem()
    }
  }

  saveItem() {
    if (this._NameForm.valid) {
      this.loading = true;
      const data: _NameInterface = this._NameForm.value;
      delete data.id;

      this._nameService.createItem(data).subscribe(response => {
        if (response) {
          this.loading = false;
          this.toastService.success("Cadastrado com sucesso");
          this.setCloseModal(true);
        }
      }, (error) => {
        this.loading = false;
        this.toastService.error(error.message);
      })
    }
  }

  updateItem() {
    if (this._NameForm.valid) {
      this.loading = true;
      const data: _NameInterface = this._NameForm.value;

      this._nameService.updateItem(data.id!, data).subscribe(response => {
        if (response) {
          this.loading = false;
          this.toastService.success("Atualizado com sucesso");
          this.setCloseModal(true);
        }
      }, (error) => {
        this.loading = false;
        this.toastService.error(error.message);
      })
    }
  }


  setCloseModal(result: boolean){
    this._NameForm.reset();
    this.activeModal.close({
      success: result
    });
  }

}
