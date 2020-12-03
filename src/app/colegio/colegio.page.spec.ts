import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ColegioPage } from './colegio.page';

describe('ColegioPage', () => {
  let component: ColegioPage;
  let fixture: ComponentFixture<ColegioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColegioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ColegioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
