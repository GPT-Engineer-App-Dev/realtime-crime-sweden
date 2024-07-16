import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const CrimeList = () => {
  const [crimes, setCrimes] = useState([]);
  const [newCrime, setNewCrime] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // Fetch crimes from an API or load from local storage
    const storedCrimes = JSON.parse(localStorage.getItem('crimes')) || [];
    setCrimes(storedCrimes);
  }, []);

  useEffect(() => {
    // Save crimes to local storage whenever the list changes
    localStorage.setItem('crimes', JSON.stringify(crimes));
  }, [crimes]);

  const addCrime = () => {
    if (newCrime.trim() !== '') {
      setCrimes([...crimes, { id: Date.now(), name: newCrime.trim() }]);
      setNewCrime('');
    }
  };

  const deleteCrime = (id) => {
    setCrimes(crimes.filter(crime => crime.id !== id));
  };

  const filteredCrimes = crimes.filter(crime =>
    crime.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Crime List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Add a new crime"
            value={newCrime}
            onChange={(e) => setNewCrime(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCrime()}
          />
          <Button onClick={addCrime}>Add</Button>
        </div>
        <Input
          type="text"
          placeholder="Filter crimes"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-4"
        />
        <ScrollArea className="h-[300px]">
          {filteredCrimes.map((crime) => (
            <div key={crime.id} className="flex justify-between items-center mb-2">
              <span>{crime.name}</span>
              <Button variant="destructive" size="sm" onClick={() => deleteCrime(crime.id)}>
                Delete
              </Button>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CrimeList;