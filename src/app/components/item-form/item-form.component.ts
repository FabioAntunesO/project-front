import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { Item } from '/Users/mari_/OneDrive/Área de Trabalho/projects/project-front/src/app/models/item.model';
import { ItemService } from '/Users/mari_/OneDrive/Área de Trabalho/projects/project-front/src/app/services/item.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  providers: [
    ItemService,
    FormBuilder
  ]
})
export class ItemFormComponent implements OnInit {
  itemForm: FormGroup;
  editingItem: Item | null = null;
  quantityMask: string = '';
  unitSuffix: string = '';

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z\s]+$/)]],
      unit: ['lt', Validators.required],
      quantity: [null],
      price: [
        '', 
        [Validators.required, Validators.pattern(/^\d+(\,\d{1,2})?$/)]
      ],
      perishable: [false, Validators.required],
      expirationDate: [null, this.dateValidator],
      manufacturingDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    if (itemId) {
      this.editingItem = this.itemService.getItemById(+itemId);
      if (this.editingItem) {
        this.itemForm.patchValue(this.editingItem);
        this.onPerishableChange();
      }
    }

    this.onPerishableChange();
    this.onUnitChange();
  }

  dateValidator(control: any): { [key: string]: any } | null {
    const value = control.value;
    if (!value) return null;

    const [day, month, year] = value.split('/').map(Number);
    const expirationDate = new Date(year, month - 1, day);
    const currentDate = new Date();

    if (expirationDate < currentDate) {
      return { expired: true };
    }
    return null;
  }

  // Validar data de fabricação
  manufacturingDateValidator(control: any): { [key: string]: any } | null {
    const manufacturingDate = control.value;
    const expirationDate = this.itemForm.get('expirationDate')?.value;

    if (this.itemForm.get('perishable')?.value && expirationDate) {
      const [manDay, manMonth, manYear] = manufacturingDate.split('/').map(Number);
      const manufacturing = new Date(manYear, manMonth - 1, manDay);

      const [expDay, expMonth, expYear] = expirationDate.split('/').map(Number);
      const expiration = new Date(expYear, expMonth - 1, expDay);

      if (manufacturing > expiration) {
        return { manufacturingAfterExpiration: true };
      }
    }
    return null;
  }

  onPerishableChange(): void {
    const perishableControl = this.itemForm.get('perishable');
    const expirationDateControl = this.itemForm.get('expirationDate');
    const manufacturingDateControl = this.itemForm.get('manufacturingDate');

    perishableControl?.valueChanges.subscribe((isPerishable) => {
      if (isPerishable) {
        expirationDateControl?.setValidators([Validators.required, this.dateValidator]);
        manufacturingDateControl?.setValidators([Validators.required, this.manufacturingDateValidator]);
      } else {
        expirationDateControl?.clearValidators();
        expirationDateControl?.reset();
        manufacturingDateControl?.clearValidators();
        manufacturingDateControl?.reset();
      }
      expirationDateControl?.updateValueAndValidity();
      manufacturingDateControl?.updateValueAndValidity();
    });
  }

  onUnitChange(): void {
    const unitControl = this.itemForm.get('unit');
    const quantityControl = this.itemForm.get('quantity');

    unitControl?.valueChanges.subscribe((unit) => {
      switch (unit) {
        case 'lt':
          //this.quantityMask = '00.000';
          this.unitSuffix = 'lt';
          quantityControl?.setValidators([Validators.required, Validators.pattern(/^\d+(\.\d{1,3})?$/)]);
          break;
        case 'kg':
          //this.quantityMask = '00.000';
          this.unitSuffix = 'kg';
          quantityControl?.setValidators([Validators.required, Validators.pattern(/^\d+(\.\d{1,3})?$/)]);
          break;
        case 'un':
          this.quantityMask = '0000000';
          this.unitSuffix = 'un';
          quantityControl?.setValidators([Validators.required, Validators.pattern(/^\d+$/)]);
          break;
        default:
          this.quantityMask = '';
          this.unitSuffix = '';
          quantityControl?.clearValidators();
          break;
      }
      quantityControl?.updateValueAndValidity();
    });

    this.applyInitialSettings();
  }

  applyInitialSettings(): void {
    const unit = this.itemForm.get('unit')?.value;
    if (unit === 'lt') {
      //this.quantityMask = '00.000';
      this.unitSuffix = 'lt';
    } else if (unit === 'kg') {
      //this.quantityMask = '00.000';
      this.unitSuffix = 'kg';
    } else if (unit === 'un') {
      this.quantityMask = '0000000';
      this.unitSuffix = 'un';
    }
  }

  onSave(): void {
    if (this.itemForm.invalid) {
      console.log('Form is invalid:', this.itemForm.errors);
      return;
    }
    const itemData: Item = this.itemForm.value;
    if (this.editingItem) {
      this.itemService.updateItem(this.editingItem.id, itemData);
    } else {
      this.itemService.addItem(itemData);
    }
    this.router.navigate(['/listagem']);
  }

  onCancel(): void {
    this.router.navigate(['/listagem']);
  }
}
