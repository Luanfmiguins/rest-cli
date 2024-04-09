import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseService } from 'src/app/base/base.service';
import { _NameService } from '../../_name.service';


@Component({
  selector: 'app-modal-to-remove-_name',
  templateUrl: './modal-to-remove-_name.component.html',
  styleUrls: ['./modal-to-remove-_name.component.scss']
})
export class ModalToRemove_NameComponent implements OnInit {

  constructor(
    private _nameService: _NameService,
    private toastService: BaseService,
    private activeModal: NgbActiveModal
  ) { }

  @Input() openModal = false;
  @Input() itemId: string = "";

  loadingDelete = false;

  ngOnInit(): void {
  }

  removeItems(){
    this.loadingDelete = true;

    this._nameService.deleteItem(this.itemId).subscribe(() => {
      this.loadingDelete = true;
      this.toastService.success("Removido com sucesso");
      this.setCloseModal(true);
    }, (error) => {
      this.loadingDelete = false;
    })
  }

  setCloseModal(result: boolean){
    this.openModal = false;
    this.loadingDelete = false;
    this.activeModal.close({
      success: result
    })
  }

}
