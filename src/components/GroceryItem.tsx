import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Edit, Save, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface GroceryItemProps {
  item: {
    id: string;
    name: string;
    completed: boolean;
  };
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newName: string) => void;
}

const GroceryItem: React.FC<GroceryItemProps> = ({ item, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(item.name);

  const handleSaveEdit = () => {
    if (editedName.trim() !== '' && editedName !== item.name) {
      onEdit(item.id, editedName.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedName(item.name);
    setIsEditing(false);
  };

  return (
    <div className={`flex items-center justify-between p-4 rounded-lg shadow-sm mb-2 transition-all duration-200 ${item.completed ? 'bg-grocery-completed text-grocery-completed-foreground' : 'bg-grocery-card text-grocery-card-foreground'}`}>
      <div className="flex items-center space-x-3 flex-1">
        <Checkbox
          checked={item.completed}
          onCheckedChange={() => onToggle(item.id)}
          className="h-5 w-5 border-2 border-grocery-button data-[state=checked]:bg-grocery-button data-[state=checked]:text-grocery-button-foreground"
          disabled={isEditing}
        />
        {isEditing ? (
          <Input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSaveEdit();
              if (e.key === 'Escape') handleCancelEdit();
            }}
            className="flex-1 p-1 border-b-2 border-grocery-button focus:outline-none bg-transparent"
          />
        ) : (
          <span className={`text-lg ${item.completed ? 'line-through opacity-70' : ''}`}>
            {item.name}
          </span>
        )}
      </div>
      <div className="flex space-x-2">
        {isEditing ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSaveEdit}
              className="text-grocery-button hover:bg-grocery-button/10"
            >
              <Save className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCancelEdit}
              className="text-muted-foreground hover:bg-muted/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              className="text-muted-foreground hover:bg-muted/10"
            >
              <Edit className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(item.id)}
              className="text-grocery-delete hover:bg-grocery-delete/10"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default GroceryItem;
