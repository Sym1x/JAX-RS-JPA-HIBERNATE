import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddPersonFormProps {
  onAdd: (name: string, age: number) => void;
}

export function AddPersonForm({ onAdd }: AddPersonFormProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ageNum = parseInt(age, 10);
    if (name.trim() && !isNaN(ageNum) && ageNum > 0) {
      onAdd(name.trim(), ageNum);
      setName("");
      setAge("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-5 shadow-card">
      <h2 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
        <UserPlus className="h-5 w-5 text-primary" />
        Add New Person
      </h2>
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[180px]">
          <Label htmlFor="name" className="mb-2 block text-sm text-muted-foreground">
            Name
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
          />
        </div>
        <div className="w-28">
          <Label htmlFor="age" className="mb-2 block text-sm text-muted-foreground">
            Age
          </Label>
          <Input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
            min="1"
            required
          />
        </div>
        <Button type="submit" className="h-10">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Person
        </Button>
      </div>
    </form>
  );
}