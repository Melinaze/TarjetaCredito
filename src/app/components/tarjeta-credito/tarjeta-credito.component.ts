import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {
  listTarjetas: any[] = [
    {titular: "Juan Prez", numeroTarjeta:"15151520", fechaExpiracion: "11/12",
    cvv: "123"},
    {titular: "Melina", numeroTarjeta:"12020520", fechaExpiracion: "10/12",
    cvv: "123"}
  ];

  form: FormGroup;
  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.form = this.fb.group ({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5)]],
      cvv:  ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
    })
   }

  ngOnInit(): void {
  }
  
  agregarTarjeta(){
    console.log(this.form);

    const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    }
    
    this.listTarjetas.push(tarjeta)
    this.toastr.success('La tarjeta fue registrada con éxito!', 'Tarjeta registrada');
    this.form.reset();
  }

  eliminarTarjeta(index: number){
    this.listTarjetas.splice(index,1);
    this.toastr.error('La tarjeta fue eliminada con éxito', 'Tarjeta eliminada')
  }

}
