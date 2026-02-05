import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import GroceryItem from '@/components/GroceryItem';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface GroceryItemType {
  id: string;
  name: string;
  completed: boolean;
}

const Index: React.FC = () => {
  const [items, setItems] = useState<GroceryItemType[]>([]);
  const [newItemName, setNewItemName] = useState<string>('');

  useEffect(() => {
    const storedItems = localStorage.getItem('groceryItems');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('groceryItems', JSON.stringify(items));
  }, [items]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim() === '') return;

    const newItem: GroceryItemType = {
      id: uuidv4(),
      name: newItemName.trim(),
      completed: false
    };
    setItems((prevItems) => [...prevItems, newItem]);
    setNewItemName('');
  };

  const handleToggleItem = (id: string) => {
    setItems((prevItems) =>
    prevItems.map((item) =>
    item.id === id ? { ...item, completed: !item.completed } : item
    )
    );
  };

  const handleDeleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleEditItem = (id: string, newName: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, name: newName } : item
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-grocery-background text-grocery-foreground">
      <h1 className='text-4xl text-center font-extrabold mb-8'>My Grocery List</h1>

      <form onSubmit={handleAddItem} className="flex w-full max-w-md mb-8 space-x-2">
        <Input type="text" placeholder="Add a new grocery item..." value={newItemName} onChange={e => setNewItemName(e.target.value)} className="flex-1 p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-grocery-button focus:border-transparent transition-all duration-200" />

        <Button type="submit" className="bg-grocery-button text-grocery-button-foreground hover:bg-grocery-button/90">
          <Plus className="h-5 w-5 mr-2" /> Add Item
        </Button>
      </form>

      <div className="w-full max-w-md">
        {items.length === 0 ? <p className="text-center text-muted-foreground">Your grocery list is empty. Start adding items!</p> : <ul className="space-y-3">
            {items.map(item => <li key={item.id}>
                <GroceryItem item={item} onToggle={handleToggleItem} onDelete={handleDeleteItem} onEdit={handleEditItem} />

              </li>)}
          </ul>}
      </div>
    </div>);

};

export default Index;
