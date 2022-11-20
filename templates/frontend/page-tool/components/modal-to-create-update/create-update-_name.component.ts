import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { _NameService } from '../../_name.service';
import { _NameInterface } from '../../_name.interface';

@Component({
  selector: 'app-create-update-_name',
  templateUrl: './create-update-_name.component.html',
  styleUrls: ['./create-update-_name.component.scss']
})
export class CreateUpdate_NameComponent implements OnInit {

  constructor(
    private _nameService: _NameService,
    private toastrService: ToastrService,
    public activeModal: NgbActiveModal
  ) { }

  @Input() itemUpdate: _NameInterface = {
    name:  ""
  };

  loading = false;
  listErrors: any[] = [];
  operation: string = "create";
  titleModal: string = "Criar";
  titleButton: string = "Criar";

  _NameForm = new FormGroup({
    name: new FormControl(""),
  });

  ngOnInit(): void {
    if(this.itemUpdate){
      this.setUpdateValues();
    }
  }

  setUpdateValues(){
    this.operation = "Update";
    this.titleModal = "Atualizar";
    this.titleButton = "Atualizar";
  }

  validateForms(){
    const { name } = this._NameForm.value;

    if(this._NameForm.valid){
      this.listErrors = [];

      if(this.operation === "create"){
        this.saveItem();
        return;
      }

      this.updateItem();
      return;
    }
  }

  saveItem(){    
    if(this._NameForm.valid){
      this.loading = true;
      const data: _NameInterface = this._NameForm.value;
      delete data.id;

      this._nameService.createItem(data).subscribe(response => {
        if(response){
          this.loading = false;
          this.toastrService.success("Cadastrado com sucesso", "Sucesso");
          this.setCloseModal(true);
        }
      }, (error) => {
        this.loading = false;
        const listErrorsResponse = error.error.errors;
        this.getListErrors(listErrorsResponse);
      })
    }
  }

  updateItem(){
    if(this._NameForm.valid){
      this.loading = true;
      const data: _NameInterface = this._NameForm.value;
            
      this._nameService.updateItem(data.id!, data).subscribe(response => {
        if(response){
          this.loading = false;
          this.toastrService.success("Atualizado com sucesso", "Sucesso");
          this.setCloseModal(true);
        }

      }, (error) => {
        this.loading = false;
        const listErrorsResponse = error.error.errors;
        this.toastrService.error("Ocorreu um erro", "Erro");
        this.getListErrors(listErrorsResponse);
      }) 
    }
  }

  getListErrors(listErrorsResponse: any[]){
    this.listErrors = [];

    for(let indexError in listErrorsResponse){
      const listErrorData = listErrorsResponse[indexError];

      if(listErrorData.length){
        for(let indexErrorData in listErrorData){
          const errorData = listErrorData[indexErrorData];

          this.listErrors.push(errorData);
        }
      }
    }
  }

  setCloseModal(result: boolean){
    this.listErrors = [];
    this._NameForm.reset();
    this.activeModal.close({
      success: result
    });
  }

}
