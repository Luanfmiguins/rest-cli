import { Component, OnInit } from "@angular/core";
import { _NameService } from "./_namespace.service";
import { SearchFilterInterface } from "src/app/base/components/filter/filter.interface";
import { _NamePageInterface } from "./_name.interface";
import Calendar from "src/utils/Calendar";
import DownloadFile from "src/utils/DownloadFile";
import { ResizeTable } from "src/utils/resize-table";

@Component({
	selector: "app-_name",
	templateUrl: "./_namespace.page.html",
	styleUrls: ["./_namespace.page.scss"]
})
export class _NamePage implements OnInit {

	constructor(
    private _nameService: _NameService
  ) { }

  loadingTable: boolean = false;
  loadingExportExcel: boolean = false;

  filters: SearchFilterInterface = {
    director: true,
    manager: true,
    supervisor: true,
    seller: true,
    network: true,
    channel: true,
    client: true,
    date: true
  };

  reportList: _NamePageInterface[] = [];
  pageCurrent: number = 1;
  perPage: number = 10;

  query: Record<string, string> = {
    startDate: Calendar.getFormattedDate(new Date()),
    endDate: Calendar.getFormattedDate(new Date()),
    userId: ""
  };

  tabs = ["Relatório"];
  tabSelected: string = 'Relatório';

  headerPrimary = [
    { value: "Data" },
    { value: "Técnico" },
    { value: "Gestor" },
  ]

  headerSecondary = [
    { value: "Nome Fantasia" },
    { value: "Razão Social" },
    { value: "CNPJ" },
    { value: "Canal" },
    { value: "Sub-Canal" },
    { value: "Canal Geral" },
    { value: "Rede" },
  ]

  ngOnInit(): void {
    this.getItems();
  }

  getItems(){
    this.loadingTable = true;
    
    this._nameService.getReport(this.query).subscribe(tabloidReports => {
      this.reportList = tabloidReports;
      this.loadingTable = false;
    })
  }
  
  exportTable(){
    this.loadingExportExcel = true;

    this._nameService.exportExcel(this.query).subscribe(response => {
      this.loadingExportExcel = false;
      DownloadFile(response, "_NamePage.xlsx");
    })
  }

  changePage(nextPage: number){
    this.pageCurrent = nextPage;
  }

  searchTable(params: any) { 
    this.query.startDate = params.startDate;
    this.query.endDate = params.endDate;
    this.query.clientId = params.clients;

    this.getItems();
  }

  selectedTabList(tab: string) {
    this.tabSelected = tab;
  }

  resizeTr(index: number) {
    ResizeTable(index);
  }
}
