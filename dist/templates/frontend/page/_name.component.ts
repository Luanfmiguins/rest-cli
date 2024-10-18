import { Component, OnInit } from "@angular/core";
import { _NameService } from "./_namespace.service";

@Component({
	selector: "app-_name",
	templateUrl: "./_namespace.component.html",
	styleUrls: ["./_namespace.component.scss"]
})
export class _NameComponent implements OnInit {

	constructor(
    private _nameService: _NameService
  ) { }

  ngOnInit(): void {
    this._nameService.get().subscribe(_names => {
      console.log(_names);
    })
  }
}
