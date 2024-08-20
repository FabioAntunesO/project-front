import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private readonly storageKey = 'items';

  constructor() {
    console.log('ItemService instantiated');
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  addItem(item: Item): void {
    const items = this.getItems();
    const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    item.id = newId;
    items.push(item);
    this.saveItems(items);
    //console.log('Items saved:', localStorage.getItem(this.storageKey));
  }
  
  getItems(): Item[] {
    const items = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    //console.log('Retrieved items:', items);
    return items;
  }

  getItemById(id: number): Item | null {
    const item = this.getItems().find(item => item.id === id);
    return item || null;
  }  

  updateItem(id: number, updatedItem: Item): void {
    let items = this.getItems();
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updatedItem };
      this.saveItems(items);
    }
  }

  deleteItem(id: number): void {
    const items = this.getItems().filter(item => item.id !== id);
    this.saveItems(items);
  }

  private saveItems(items: Item[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
}
