import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductSizes } from '../../../data/interfaces/product-sizes.interfaces';
import { ProductTypeIdPipe } from "../../../helpers/pipes/product-type-id.pipe";

@Component({
  selector: 'app-size-btn',
  standalone: true,
  imports: [ReactiveFormsModule, ProductTypeIdPipe],
  templateUrl: './size-btn.component.html',
  styleUrl: './size-btn.component.scss'
})
export class SizeBtnComponent implements OnInit {
  @Input() productTypes!: ProductSizes[];
  @Output() sizeSelected = new EventEmitter<ProductSizes>();
  sizeForm!: FormGroup;

  ngOnInit(): void {
    this.sizeForm = new FormGroup({
      selectedSize: new FormControl(this.productTypes[0])
    });
    if (this.sizeForm) {
      this.sizeForm.valueChanges.subscribe(value => {
        this.sizeSelected.emit(value.selectedSize);
      });
    }
  }
}
