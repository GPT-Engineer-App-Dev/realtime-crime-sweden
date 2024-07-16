import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Welcome to Crime Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">This application helps you keep track of reported crimes.</p>
        <Button asChild>
          <Link to="/crime-list">View Crime List</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default Index;