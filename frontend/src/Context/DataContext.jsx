import { createContext, useContext, useState } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [departmenstProfile, setDepartmentsProfile] = useState([]);

  return (
    <DataContext.Provider value={[departmenstProfile, setDepartmentsProfile]}>
      {children}
    </DataContext.Provider>
  );
};

// custom hook
const useData = () => useContext(DataContext);

export { useData, DataProvider };
