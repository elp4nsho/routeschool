import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApoderadoPage } from './apoderado.page';

describe('ApoderadoPage', () => {
  let component: ApoderadoPage;
  let fixture: ComponentFixture<ApoderadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApoderadoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApoderadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
