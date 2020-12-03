import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LaModalComponent } from './la-modal.component';

describe('LaModalComponent', () => {
  let component: LaModalComponent;
  let fixture: ComponentFixture<LaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
