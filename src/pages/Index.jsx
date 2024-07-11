// Update this page (the content is just a fallback if you fail to update the page)

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Spinner, Alert } from 'shadcn';

const fetchCrimeData = async () => {
  const { data } = await axios.get('/api/crime-reports');
  return data;
};

const CrimeList = ({ crimes }) => (
  <ul>
    {crimes.map((crime) => (
      <li key={crime.id}>{crime.description}</li>
    ))}
  </ul>
);

const Index = () => {
  const { data, error, isLoading } = useQuery('crimeData', fetchCrimeData);

  if (isLoading) return <Spinner />;
  if (error) return <Alert type="error">Error loading crime data</Alert>;

  return (
    <div className="text-center">
      <h1 className="text-3xl">Real-Time Crime Reports</h1>
      <CrimeList crimes={data} />
    </div>
  );
};

export default Index;
