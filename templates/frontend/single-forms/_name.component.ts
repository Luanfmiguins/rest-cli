import { Component, OnInit } from "@angular/core";
import { _NameService } from "./_namespace.service";
import { BaseService } from "src/app/base/base.service";
import { _NameForms } from "./_namespace.forms";

@Component({
	selector: "core-_name",
	templateUrl: "./_namespace.page.html",
	styleUrls: ["./_namespace.page.scss"]
})
export class _NameComponent implements OnInit {

  formsField = _NameForms;

  constructor(
    private _nameService: _NameService,
    private toastService: BaseService,
  ) { }

  ngOnInit(): void {}

  onFormSubmit({ item, onSuccess, onError }): void {
    if (item.data) {
      this._nameService.createItem(item.data).subscribe(
        response => this.handleSuccess(response, onSuccess),
        error => this.handleError(error, onError)
      )
    }
  }

  handleSuccess(response: any, onSuccess: () => void): void {
    if (response) {
      onSuccess();
      this.toastService.success("Cadastrado com sucesso");
    }
  }

  handleError(error: any, onError: () => void): void {
    onError();
    this.displayErrors(error);
  }

  displayErrors(reason: any): void {
    const errors = reason.error?.errors || reason.errors;
    if (errors && typeof errors === 'object') {
      Object.values(errors).forEach((errorList: unknown) => {
        if (Array.isArray(errorList)) {
          errorList.forEach((errorMessage: unknown) => {
            if (typeof errorMessage === 'string') {
              this.toastService.error(errorMessage);
            }
          });
        }
      });
    } else {
      this.toastService.error(reason.error?.message || "Ocorreu um erro desconhecido.");
    }
  }
}
