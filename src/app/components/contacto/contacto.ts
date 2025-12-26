import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: 'contacto.html',
  styleUrls: ['./contacto.css']
})
export class ContactoComponent implements OnInit {

  contactoForm!: FormGroup;
  enviado = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      asunto: ['', Validators.required],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  enviar(): void {
    if (this.contactoForm.invalid) {
      this.contactoForm.markAllAsTouched();
      return;
    }

    console.log('Formulario enviado:', this.contactoForm.value);
    this.enviado = true;
    this.contactoForm.reset();
  }

  get f() {
    return this.contactoForm.controls;
  }
}
