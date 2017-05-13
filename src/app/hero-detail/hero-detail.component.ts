import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {
  heroForm: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.createForm();
  }
  createForm(){
    this.heroForm = this.fb.group({
      name: [ '', Validators.required ],
    })
  }
}
