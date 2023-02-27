import {Component, OnInit} from '@angular/core';
import {ConverterService} from "../converter.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit{
  public currencies: any = null;
  public formConverterCurrency = new FormGroup({
    currency1: new FormControl(''),
    valueCurrency1: new FormControl(''),
    currency2: new FormControl(''),
    valueCurrency2: new FormControl('')
  });
  constructor(private converterService: ConverterService, private fb: FormBuilder) {
    this.formConverterCurrency = this.fb.group({
      currency1: ['EUR'],
      valueCurrency1: [''],
      currency2: ['USD'],
      valueCurrency2: ['']
    });
    // Get currencies
    this.converterService.getCurrencies().subscribe((data) => {
      this.currencies = Object.keys(data.rates)
    });
  }

  ngOnInit(): void {
    this.f['valueCurrency1'].valueChanges.subscribe((value) => {
      if(value !== '' && value !== null && this.f.currency1 !== null && this.f.currency2 !== null) {
        this.converterService.getCurrencyValue(this.f.currency1.value, this.f.currency2.value, value).subscribe((data) => {
          this.f['valueCurrency2'].setValue(data.new_amount);
        });
      }else{
        this.f['valueCurrency2'].setValue('');
      }
    });
  }

  // Consomme l'API à chaque changement de valeur
  convertCurrency(value: string | null) {
    if(value !== '') {
      this.converterService.getCurrencyValue(this.f['currency1'].value, this.f['currency2'].value, value).subscribe((data) => {
        this.f['valueCurrency2'].setValue(data.new_amount);
      });
    }else{
      this.f['valueCurrency2'].setValue('');
    }
  }

  get f() {
    return this.formConverterCurrency.controls;
  }

  changeCurrency() {
    let currency1 = this.f['currency1'].value;
    let currency2 = this.f['currency2'].value;
    this.f['currency1'].setValue(currency2);
    this.f['currency2'].setValue(currency1);
    if (this.f.valueCurrency1.value !== '' && this.f.valueCurrency1.value !== null){
      this.convertCurrency(this.f.valueCurrency1.value);
    }
  }
}
