import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddColegioPage } from './add-colegio.page';

describe('AddColegioPage', () => {
  let component: AddColegioPage;
  let fixture: ComponentFixture<AddColegioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddColegioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddColegioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
