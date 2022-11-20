import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { _NameService } from '../../_name.service';


@Component({
  selector: 'app-modal-to-remove-_name',
  templateUrl: './modal-to-remove-_name.component.html',
  styleUrls: ['./modal-to-remove-_name.component.scss']
})
export class ModalToRemove_NameComponent implements OnInit {

  constructor(
    private _nameService: _NameService,
    private toastrService: ToastrService,
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
      this.toastrService.success("Removido com sucesso", "Sucesso");
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
