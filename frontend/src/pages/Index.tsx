import { useState, useEffect } from "react";
import { Users, RefreshCw } from "lucide-react";
import { getAllUsers, addUser, deleteUser, updateUser, Person } from "@/api/users";
import { PersonRow } from "@/components/PersonRow";
import { AddPersonForm } from "@/components/AddPersonForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  const fetchPeople = async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    try {
      const data = await getAllUsers();
      setPeople(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch people. Make sure the backend is running.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const handleAdd = async (name: string, age: number) => {
    try {
      const result = await addUser(name, age);
      if (result.state === "ok") {
        toast({ title: "Success", description: `Added ${name} successfully.` });
        fetchPeople();
      } else {
        toast({ title: "Failed", description: "Could not add person.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to add person.", variant: "destructive" });
    }
  };

  const handleUpdate = async (id: number, name: string, age: number) => {
    try {
      const result = await updateUser(id, name, age);
      if (result.state === "ok") {
        toast({ title: "Updated", description: `${name} updated successfully.` });
        fetchPeople();
      } else {
        toast({ title: "Failed", description: "Could not update person.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update person.", variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      toast({ title: "Deleted", description: "Person removed successfully." });
      fetchPeople();
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete person.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            People System
          </h1>
          <p className="text-muted-foreground mt-2">
            Simple system managing people records.
          </p>
        </header>

        {/* Add Form */}
        <div className="mb-6">
          <AddPersonForm onAdd={handleAdd} />
        </div>

        {/* People List */}
        <div className="bg-card border border-border rounded-lg shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold">
              All People ({people.length})
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fetchPeople(true)}
              disabled={refreshing}
              className="h-8"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          {loading ? (
            <div className="p-8 text-center text-muted-foreground">
              Loading...
            </div>
          ) : people.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No people found. Add someone above!
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr className="text-left text-sm text-muted-foreground">
                  <th className="py-3 px-4 font-medium">Name</th>
                  <th className="py-3 px-4 font-medium">Age</th>
                  <th className="py-3 px-4 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {people.map((person) => (
                  <PersonRow
                    key={person.id}
                    person={person}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>

        <footer className="mt-8 text-center text-sm text-muted-foreground">
          People Management System
        </footer>
      </div>
    </div>
  );
};

export default Index;