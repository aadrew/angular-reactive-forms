import {
  Component,
  Input,
  OnChanges
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { HeroService } from '../hero.service';
import {
  Address,
  Hero,
  states
} from '../data-model';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnChanges {
  @Input() hero: Hero;
  heroForm: FormGroup;
  nameChangeLog: string[] = [];
  states = states;
  constructor(
    private fb: FormBuilder,
    private heroService: HeroService) {
    this.createForm();
  }
  createForm() {
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
      secretLairs: this.fb.array([]),
      power: '',
      sidekick: ''
    });
  }
  ngOnChanges(): void {
    this.heroForm.reset({
      name: this.hero.name,
    });
    this.setAddresses(this.hero.addresses);
  }
  setAddresses(addresses: Address[]) {
    const addressFGs = addresses.map(address => this.fb.group(address));
    const addressFormArray = this.fb.array(addressFGs);
    this.heroForm.setControl('secretLairs', addressFormArray);
  }
  get secretLairs(): FormArray {
    return this.heroForm.get('secretLairs') as FormArray;
  }
  addLair() {
    this.secretLairs.push(this.fb.group(new Address()));
  }
  removeLair(index: number) {
    this.hero.addresses.splice(index, 1);
    this.setAddresses(this.hero.addresses);
  }
}
