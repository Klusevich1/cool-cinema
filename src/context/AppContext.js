import React, { createContext } from "react";

export const AppContext = createContext({});

const AppContextProvider = ({children}) => {
    const [searchValue, setSearchValue] = React.useState("");
    const [filterSearch, setFilterSearch] = React.useState("");
    const [isUser, setIsUser] = React.useState(false);
    const [data, setData] = React.useState([]);

    const setValues = (values) => {
        setData((prevData) => ({
          ...prevData,
          ...values,
        }));
      };
    
    // const [selected, setSelected] = React.useState(null);

    return (
        <AppContext.Provider value={{searchValue, setSearchValue, filterSearch, setFilterSearch, isUser, setIsUser, data, setData, setValues}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;