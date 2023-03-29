import { createContext, useContext, useState, useEffect } from 'react';
import { fetchMeters } from '@/models/meterLogs';
import { MeterData } from '@/types';

interface MeterContextData {
  meterData: MeterData[];
  isLoading: boolean;
  setMeters: (meterData: MeterData[]) => void;
}

const MeterContext = createContext<MeterContextData>({
  meterData: [],
  isLoading: true,
  setMeters: () => {},
});

export const useMeters = () => {
  return useContext(MeterContext);
};

export const MeterProvider: React.FC = ({ children }) => {
  const [meterData, setMeters] = useState<MeterData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMeters();
      setMeters(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return <MeterContext.Provider value={{ meterData, isLoading, setMeters }}>{children}</MeterContext.Provider>;
};
