import { ComponentFixture, TestBed } from "@angular/core/testing";
import { _NamePage } from "./_namespace.page";

describe("_NamePage", () => {
	let component: _NamePage;
	let fixture: ComponentFixture<_NamePage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ _NamePage ]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(_NamePage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
