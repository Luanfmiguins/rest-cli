import { TestBed } from "@angular/core/testing";
import { _NameService } from "./_namespace.service";

describe("_NameService", () => {
	let service: _NameService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(_NameService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
