"use client"

import { useState, useEffect } from "react";
import { getUserFromLocalStorage } from "../util/local.storage.utils";

export const useUser = () => {
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setUserId(user.id);
    }
  }, []);

  return {
    firstName,
    lastName,
    userId,
  };
};
