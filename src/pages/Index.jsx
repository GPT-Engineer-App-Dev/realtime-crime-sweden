import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchCrimes = async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return response.data.slice(0, 10).map(post => ({
    id: post.id,
    description: post.title,
    date: new Date().toLocaleDateString()
  }));
};

const CrimeList = () => {
  const [filter, setFilter] = useState("");
  const queryClient = useQueryClient();

  const { data: crimes = [], isLoading, error } = useQuery({
    queryKey: ["crimes"],
    queryFn: fetchCrimes
  });

  const addCrimeMutation = useMutation({
    mutationFn: (newCrime) => axios.post("https://jsonplaceholder.typicode.com/posts", newCrime),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crimes"] });
    },
  });

  const deleteCrimeMutation = useMutation({
    mutationFn: (id) => axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crimes"] });
    },
  });

  const handleAddCrime = () => {
    const newCrime = {
      description: "New Crime",
      date: new Date().toLocaleDateString()
    };
    addCrimeMutation.mutate(newCrime);
  };

  const handleDeleteCrime = (id) => {
    deleteCrimeMutation.mutate(id);
  };

  const filteredCrimes = crimes.filter(crime =>
    crime.description.toLowerCase().includes(filter.toLowerCase())
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Crime List</CardTitle>
        <CardDescription>Recent reported crimes in the area</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <Input
            placeholder="Filter crimes..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="max-w-sm"
          />
          <Button onClick={handleAddCrime}>Add Crime</Button>
        </div>
        <ScrollArea className="h-[400px]">
          {filteredCrimes.map((crime) => (
            <div key={crime.id} className="flex justify-between items-center p-2 border-b">
              <div>
                <p className="font-medium">{crime.description}</p>
                <p className="text-sm text-gray-500">{crime.date}</p>
              </div>
              <Button variant="destructive" onClick={() => handleDeleteCrime(crime.id)}>Delete</Button>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">Total crimes: {filteredCrimes.length}</p>
      </CardFooter>
    </Card>
  );
};

const Index = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Real-Time Crime Reports</h1>
      <CrimeList />
    </div>
  );
};

export default Index;