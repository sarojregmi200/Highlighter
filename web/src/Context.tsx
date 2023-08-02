import React, { createContext, useState } from "react";

const Context = createContext<contextType>({
  user: { id: "" },
  setUser: () => {},
});

interface userState {
  id: string;
}
type contextType = {
  user: userState;
  setUser: React.Dispatch<React.SetStateAction<userState>>;
};
export const ContextProvider: React.FC<{ children: React.JSX.Element }> = ({
  children,
}) => {
  const [user, setUser] = useState<userState>({
    id: "hlo brother",
  });
  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};

export default Context;
