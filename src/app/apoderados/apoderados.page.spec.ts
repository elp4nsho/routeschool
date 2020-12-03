import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApoderadosPage } from './apoderados.page';

describe('ApoderadosPage', () => {
  let component: ApoderadosPage;
  let fixture: ComponentFixture<ApoderadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApoderadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApoderadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
