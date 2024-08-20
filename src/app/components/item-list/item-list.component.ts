import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Item } from '/Users/mari_/OneDrive/Área de Trabalho/projects/project-front/src/app/models/item.model';
import { ItemService } from '/Users/mari_/OneDrive/Área de Trabalho/projects/project-front/src/app/services/item.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];

  constructor(private itemService: ItemService, private router: Router) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.items = this.itemService.getItems();
    console.log(this.items);
  }

  onEdit(id: number): void {
    this.router.navigate(['/cadastro', id]);
  }

  onDelete(id: number): void {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      this.itemService.deleteItem(id);
      confirm('Item excluido com sucesso!')
      this.loadItems();
    } else {
      confirm('O item não foi excluido.')
    }
  }

  onAdd(): void {
    this.router.navigate(['/cadastro']);
  }
}
