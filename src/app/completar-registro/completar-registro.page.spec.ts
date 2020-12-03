import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompletarRegistroPage } from './completar-registro.page';

describe('CompletarRegistroPage', () => {
  let component: CompletarRegistroPage;
  let fixture: ComponentFixture<CompletarRegistroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletarRegistroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompletarRegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
