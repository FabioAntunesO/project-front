export interface Item {
  id: number;                          
  name: string;                        
  unit: 'lt' | 'kg' | 'un';            
  quantity?: number;                   
  price: number;                       
  perishable: boolean;                 
  expirationDate?: string;             
  manufacturingDate: string;           
}