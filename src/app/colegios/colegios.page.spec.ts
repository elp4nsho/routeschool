import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ColegiosPage } from './colegios.page';

describe('ColegiosPage', () => {
  let component: ColegiosPage;
  let fixture: ComponentFixture<ColegiosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColegiosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ColegiosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
