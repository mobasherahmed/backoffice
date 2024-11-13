import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Injector, Input, OnChanges, OnInit, Output, SimpleChanges, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { ControlValueAccessor, AbstractControl, ValidationErrors, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'backoffice-basic-input',
  standalone: true,
  imports: [CommonModule,ErrorMessageComponent,IconComponent,ReactiveFormsModule],
  providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => BasicInputComponent),
			multi: true,
		},
	],
  templateUrl: './basic-input.component.html',
  styleUrl: './basic-input.component.scss'
})
export class BasicInputComponent implements ControlValueAccessor, OnInit, OnChanges {
@Input() prefix = '';
@Input() prefixSize = 'xs'; 
@Input() suffixComponent!: Type<any>;
@Input() suffixComponentInputs: Record<string, any> = {};
@Input() suffixComponentOutputs: Record<string, (event: any) => void> = {};
@Input() type = 'text';
@Input() placeholder = '';
@Input() id = '';
@Input() name = '';
@Input() disabled = false;
@Input() control: AbstractControl | null = null;
@Input() label = '';
@Input() subLabel = '';
@Input() hideErrorMessage = false;
@Input() minLength!: number;
@Input() maxLength!: number;
@Input() customErrorMessage!: string;
@Input() customClasses = '';

@Output() blurEvent = new EventEmitter<void>();

@Input() value = '';

@ViewChild('suffixComponentContainer', {
  read: ViewContainerRef,
  static: true,
})
suffixComponentContainer!: ViewContainerRef;

variant: 'label-only' | 'label-and-subLabel' | 'no-label' = 'no-label';
isDisabled = true;
private controlValueChangeSubscription!: Subscription;

onChange = (_: any) => {};
onTouched = () => {};

constructor(private parentInjector: Injector) {}

ngOnInit() {
  this.variant = this.getVariant();
  this.handleSuffixDynamicComponent();
  if (this.control) {
    this.value = this.control.value;
    this.controlValueChangeSubscription = this.control.valueChanges.subscribe(
      value => {
        this.value = value;
      },
    );
    this.isDisabled = this.disabled;
  }
}

ngOnChanges(changes: SimpleChanges) {
  if (changes['control'] && this.control) {
    this.writeValue(this.control.value);
  }
}

private getVariant() {
  return this.label && this.subLabel
    ? 'label-and-subLabel'
    : this.label
      ? 'label-only'
      : 'no-label';
}

private handleSuffixDynamicComponent() {
  if (!this.suffixComponent) return;
  const componentRef = this.suffixComponentContainer.createComponent(
    this.suffixComponent,
    {
      injector: this.parentInjector,
    },
  );

  Object.entries(this.suffixComponentInputs).forEach(
    ([key, value]) => (componentRef.instance[key] = value),
  );
  componentRef.instance.disabled = this.disabled;
  Object.entries(this.suffixComponentOutputs).forEach(
    ([key, value]) =>
      componentRef.instance[key] instanceof EventEmitter &&
      componentRef.instance[key].subscribe(value),
  );
}

writeValue(value: any): void {
  if (value) {
    this.value = value;
    if (this.control) {
      this.control.setValue(value, { emitEvent: false });
    }
  }
}

registerOnChange(fn: any): void {
  this.onChange = fn;
}

registerOnTouched(fn: any): void {
  this.onTouched = fn;
}

setDisabledState(isDisabled: boolean): void {
  this.isDisabled = isDisabled;
}

onInput(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  this.value = inputElement.value;
  this.onChange(this.value);
  if (this.control) {
    this.control.markAsDirty();
    this.control.setValue(this.value);
  }
}

onBlur(): void {
  this.onTouched();
  if (this.control) {
    this.control.markAsTouched();
  }
  this.blurEvent.emit();
}

get errors(): ValidationErrors | null {
  return this.control ? this.control.errors : null;
}

ngOnDestroy() {
  if (this.controlValueChangeSubscription) {
    this.controlValueChangeSubscription.unsubscribe();
  }
}

}
