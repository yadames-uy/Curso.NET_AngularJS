import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/service/hero.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  listHero: Hero[] = [];
  form: FormGroup;
  id: number | undefined;

  constructor(private fb: FormBuilder, private _heroService: HeroService) {

    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required]]
    })
   }

  ngOnInit(): void {
    this.obtenerHero();
  }

  obtenerHero(){
    this._heroService.obtenerListaHeroe().subscribe(data=>{
      this.listHero = data;
    })
  }

  guardarHeroe(){
    const hero:Hero ={
      id: this.form.get('id')?.value,
      name: this.form.get('name')?.value
    }

    if(this.id == undefined){
      this._heroService.guardarHeroe(hero).subscribe(data=>{
        this.obtenerHero();
        this.form.reset();
      })
    }else{
      this._heroService.actualizarHeroe(this.id, hero).subscribe(data=>{
        this.obtenerHero();
        this.form.reset();
        this.id = undefined;
      })
    }


  }

  eliminarHero(hero: Hero){
    this._heroService.eliminarHeroe(hero.id!).subscribe(data=>{
      this.obtenerHero();
      this.form.reset;
    })
  }

  editarHeroe(hero: Hero){
    this.id = hero.id;

    this.form.patchValue({
      id: hero.id,
      name : hero.name
    });
  }


}
