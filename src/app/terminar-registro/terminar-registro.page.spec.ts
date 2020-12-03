import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TerminarRegistroPage } from './terminar-registro.page';

describe('TerminarRegistroPage', () => {
  let component: TerminarRegistroPage;
  let fixture: ComponentFixture<TerminarRegistroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminarRegistroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TerminarRegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
