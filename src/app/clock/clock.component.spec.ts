import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ClockComponent } from './clock.component';

describe('ClockComponent', () => {
    let component: ClockComponent;
    let fixture: ComponentFixture<ClockComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ClockComponent],
            imports: [FormsModule],
        })
            .compileComponents();

        fixture = TestBed.createComponent(ClockComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should display the correct hours', () => {
        const result = component.getFibonacciArray(10);
        expect(result).toEqual([5, 3, 2]);
    });
    it('should display the correct mintus', () => {
        const result = component.getFibonacciArray(30 / 5);
        expect(result).toEqual([3, 2, 1]);
    });
    it('should increment minutes and hours', () => {

        component.hourInput = 9;
        component.minuteInput = 55;
        spyOn(component, 'generateTime');
        component.next();
        expect(component.minuteInput).toEqual(0);
        expect(component.hourInput).toEqual(10);
        expect(component.generateTime).toHaveBeenCalled();
    });

    it('should decrement minutes and hours', () => {
      
        component.hourInput = 9;
        component.minuteInput = 5;
        spyOn(component, 'generateTime');
        component.back();
        expect(component.minuteInput).toEqual(0);
        expect(component.hourInput).toEqual(9);
        expect(component.generateTime).toHaveBeenCalled();
      });

      it('should decrement hours when minutes are 0', () => {
        component.hourInput = 9;
        component.minuteInput = 0;
        spyOn(component, 'generateTime');
        component.back();
        expect(component.minuteInput).toEqual(55);
        expect(component.hourInput).toEqual(8);
        expect(component.generateTime).toHaveBeenCalled();
      });
      
      

});
