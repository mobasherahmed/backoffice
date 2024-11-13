import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusBadageComponent } from './status-badage.component';

describe('StatusBadageComponent', () => {
  let component: StatusBadageComponent;
  let fixture: ComponentFixture<StatusBadageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusBadageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusBadageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
