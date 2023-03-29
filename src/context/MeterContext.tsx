import { createContext, useContext, useState, useEffect } from 'react';
import { fetchMeters } from '@/models/meterLogs';
import { MeterData } from '@/types';

interface MeterContextData {
  meters: MeterData[];
  isLoading: boolean;
}

const MeterContext = createContext<MeterContextData>({ meters: [], isLoading: true });

export const useMeters = () => {
  return useContext(MeterContext);
};

export const MeterProvider: React.FC = ({ children }) => {
  const [meters, setMeters] = useState<MeterData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMeters();
      setMeters(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return <MeterContext.Provider value={{ meters, isLoading }}>{children}</MeterContext.Provider>;
};
