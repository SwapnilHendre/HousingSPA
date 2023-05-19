import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent {

  @ViewChild('Form') addPropertyForm!: NgForm;

  constructor(private route: Router) {}

  onBack() {
    this.route.navigate(['/']);
  }

  onSubmit() {

  }
}
