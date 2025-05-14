/** @format */

import { createContext, useEffect, useState } from "react";
import { users as initialUsers } from "../data/users";
import type { TUserDataType } from "../types/types";
type Props = {
  children: React.ReactNode;
};

type TUserContext = {
  userList: TUserDataType[];
  editUserData: (user: TUserDataType) => void;
  createUser: (user: TUserDataType) => void;
  removeUser: (id: number) => void;
};

const initialValues = {
  userList: [],
  editUserData: () => {},
  removeUser: () => {},
  createUser: () => {},
};

export const userContext = createContext<TUserContext>(initialValues);

const UserProvider = ({ children }: Props) => {
  const userStorage = localStorage.getItem("users");
  const [userList, setUserList] = useState<TUserDataType[]>(
    JSON.parse(userStorage || "[]"),
  );

  useEffect(() => {
    if (!userStorage) {
      setUserList(initialUsers);
      localStorage.setItem("users", JSON.stringify(initialUsers));
    }
  }, [userStorage]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(userList));
  }, [userList]);

  const editUserData = (user: TUserDataType) => {
    const updateUserList = userList.map((item) =>
      item.key === user.key ? user : item,
    );
    setUserList(updateUserList);
  };

  const removeUser = (key: number) => {
    const updateUserList = userList.filter((i) => i.key !== key);
    setUserList(updateUserList);
  };

  const createUser = (user: TUserDataType) => {
    setUserList((prev) => [user, ...prev]);
  };

  return (
    <userContext.Provider
      value={{ userList, editUserData, removeUser, createUser }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
