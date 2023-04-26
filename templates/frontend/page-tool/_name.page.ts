import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PaginateInterface } from "src/app/base/paginate.interface";
import DownloadFile from "src/utils/DownloadFile";
import { _namespaceForms } from "./_namespace.forms";
import { _NameService } from "./_namespace.service";
import { _NameInterface } from "./_name.interface";
import { Create_NameGuard } from "./guards/create._name.guard";
import { Delete_NameGuard } from "./guards/delete._name.guard";
import { Update_NameGuard } from "./guards/update._name.guard";
import { CreateUpdate_NameComponent } from "./components/modal-to-create-update/create-update-_name.component";
import { ModalToRemove_NameComponent } from "./components/modal-to-remove/modal-to-remove-_name.component";
@Component({
	selector: "app-_name",
	templateUrl: "./_namespace.page.html",
	styleUrls: ["./_namespace.page.scss"]
})
export class _NamePage implements OnInit {

	constructor(
    private _nameService: _NameService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private create_NameGuard: Create_NameGuard,
    private update_NameGuard: Update_NameGuard,
    private delete_NameGuard: Delete_NameGuard,
  ) { }

  search: string = "";
  screenTitle = "_Name";
  query: Record<string, string> = {};
  showCreateItemButton: boolean = false;
  showUpdateItemButton: boolean = false;
  showDeleteItemButton: boolean = false;
  ShowDeleteItemButton: boolean = false;
  loadingTable: boolean = false;
  headers: { key: string, value: string }[] = []

  paginateItems: PaginateInterface<_NameInterface> = {
    page: 1,
    perPage: 10,
    countPage: 1,
    sortBy: "createdAt",
    sort: "desc",
    total: 10,
    items: []
  };

  fastNavigationData = [
    {
      path: '/home',
      name: 'Home',
    },
    {
      path: '/_name',
      name: '_Name',
    },
  ]


  ngOnInit(): void {
    this.setPermissionsScreen();
    this.setActivityRoute();
    this.createHeaders();
  }

  createHeaders() {
    for (let form of _namespaceForms) {
      if (form.required) {
        this.headers.push({ key: form.value, value: form.label })
      }
    }
  }

  setPermissionsScreen(){
    this.create_NameGuard.canActivate().subscribe(isAllowed => {
      this.showCreateItemButton = isAllowed;
    })

    this.update_NameGuard.canActivate().subscribe(isAllowed => {
      this.showUpdateItemButton = isAllowed;
    })

    this.delete_NameGuard.canActivate().subscribe(isAllowed => {
      this.ShowDeleteItemButton = isAllowed;
    })
  }

  setActivityRoute(){
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.paginateItems.page = +queryParams["page"] ?? this.paginateItems.page;
      this.paginateItems.perPage = +queryParams["perPage"] ?? this.paginateItems.perPage;
      this.paginateItems.sortBy = queryParams["sortBy"] ?? this.paginateItems.sortBy;
      this.paginateItems.sort = queryParams["sort"] ?? this.paginateItems.sort;
      this.search = queryParams["search"] ?? this.search;

      this.getItems();
    });
  }

  getItems(){
    this.loadingTable = true;
    const { page, perPage, sortBy, sort } = this.paginateItems;

    this._nameService.getItems(
      page,
      perPage,
      sortBy, 
      sort,
      this.search,
      this.query
    ).subscribe(response => {
      Object.assign(this.paginateItems, response);
      this.loadingTable = false;
    });
  }

  openModalCreateUpdateItem(id: string, type: string){
    const item = type === "create" ? true : this.paginateItems.items.find((element => element.id === id));

    if(item){
      const modalRef = this.modalService.open(CreateUpdate_NameComponent,{
        size: "lg",
      });

      modalRef.componentInstance.fields = _namespaceForms;
      
      modalRef.result.then((result) => {
        if(result.success){
          this.getItems();
        }
      });  
    } 
  }

  openModalDeleteItem(itemId: string){
    if(itemId){
      const modalRef = this.modalService.open(ModalToRemove_NameComponent, {
        size: "x1"
      });

      modalRef.componentInstance.itemId = itemId;

      modalRef.result.then((result) => {
          if(result.success){
            this.getItems();
          }
      })
    } 
  }

  sortItemsField(field: string){
    this.setNavigateQuery({
      sortBy: field,
      sort: this.paginateItems.sortBy == field ? (this.paginateItems.sort == "asc" ? "desc" : "asc") : this.paginateItems.sort
    })
  }

  changeAmount(number: any){
    const value = parseInt(number);
    this.setNavigateQuery({
      perPage: value
    })
  }

  setNavigateQuery(query: any){
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: query,
      queryParamsHandling: "merge"
    })
  }

  searchItem(item: string){
    this.setNavigateQuery({
      search: item
    });
  }

  changePage(page: number){
    this.setNavigateQuery({
      page: page
    })
  }

  exportExcel(event: boolean){
    this._nameService.exportExcel().subscribe(response => {
      return DownloadFile(response, "_Name.xlsx");
    })
  }
}
