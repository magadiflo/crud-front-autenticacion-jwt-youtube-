import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from '../service/producto.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit {

  productos: Producto[] = [];
  isAdmin: boolean = false;


  constructor(
    private tokenService: TokenService,
    private productoService: ProductoService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.cargarProductos();
    this.isAdmin = this.tokenService.isAdmin;
  }

  cargarProductos(): void {
    this.productoService.lista().subscribe(
      data => {
        this.productos = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrar(id: number) {
    this.productoService.delete(id).subscribe(
      data => {
        alert('Producto eliminado!');
        this.cargarProductos();
      },
      err => {
        alert(err.error.message);
      }
    );
  }

}
