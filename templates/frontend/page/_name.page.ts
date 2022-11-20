import { Component, OnInit } from "@angular/core";
import { _NameService } from "./_namespace.service";

@Component({
	selector: "app-_name",
	templateUrl: "./_namespace.page.html",
	styleUrls: ["./_namespace.page.scss"]
})
export class _NamePage implements OnInit {

	constructor(
    private _nameService: _NameService
  ) { }

  ngOnInit(): void {
    this._nameService.get().subscribe(_names => {
      console.log(_names);
    })
  }
}
