import { ComponentFixture, TestBed } from "@angular/core/testing";
import { _NameComponent } from "./_namespace.component";

describe("_NameComponent", () => {
	let component: _NameComponent;
	let fixture: ComponentFixture<_NameComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ _NameComponent ]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(_NameComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
