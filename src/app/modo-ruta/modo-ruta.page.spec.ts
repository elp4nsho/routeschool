import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModoRutaPage } from './modo-ruta.page';

describe('ModoRutaPage', () => {
  let component: ModoRutaPage;
  let fixture: ComponentFixture<ModoRutaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModoRutaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModoRutaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
