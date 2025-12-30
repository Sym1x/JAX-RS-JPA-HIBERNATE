import { useState } from "react";
import { User, Pencil, Trash2, Check, X } from "lucide-react";
import { Person } from "@/api/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PersonRowProps {
  person: Person;
  onUpdate: (id: number, name: string, age: number) => void;
  onDelete: (id: number) => void;
}

export function PersonRow({ person, onUpdate, onDelete }: PersonRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(person.name);
  const [editAge, setEditAge] = useState(person.age.toString());

  const handleSave = () => {
    const age = parseInt(editAge, 10);
    if (editName.trim() && !isNaN(age) && age > 0) {
      onUpdate(person.id, editName.trim(), age);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditName(person.name);
    setEditAge(person.age.toString());
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <tr className="border-b border-border animate-fade-in">
        <td className="py-3 px-4">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-muted-foreground" />
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="h-8 max-w-[180px]"
              placeholder="Name"
            />
          </div>
        </td>
        <td className="py-3 px-4">
          <Input
            type="number"
            value={editAge}
            onChange={(e) => setEditAge(e.target.value)}
            className="h-8 w-20"
            placeholder="Age"
            min="1"
          />
        </td>
        <td className="py-3 px-4 text-right">
          <div className="flex items-center justify-end gap-2">
            <Button size="sm" onClick={handleSave} className="h-8 px-3">
              <Check className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel} className="h-8 px-3">
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b border-border hover:bg-muted/50 transition-colors">
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-primary" />
          <span className="font-medium">{person.name}</span>
        </div>
      </td>
      <td className="py-3 px-4 text-muted-foreground">
        {person.age} years old
      </td>
      <td className="py-3 px-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsEditing(true)}
            className="h-8 px-3"
          >
            <Pencil className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(person.id)}
            className="h-8 px-3 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
}