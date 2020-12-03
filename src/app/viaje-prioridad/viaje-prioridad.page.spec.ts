import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViajePrioridadPage } from './viaje-prioridad.page';

describe('ViajePrioridadPage', () => {
  let component: ViajePrioridadPage;
  let fixture: ComponentFixture<ViajePrioridadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViajePrioridadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViajePrioridadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
