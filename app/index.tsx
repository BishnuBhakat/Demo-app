import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function Index() {
  const [ready, setReady] = useState(false);
  const [firstTime, setFirstTime] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("seenIntro").then((value) => {
      setFirstTime(!value);
      setReady(true);
    });
  }, []);

  if (!ready) return null;

  return firstTime ? (
    <Redirect href="/auth/intro" />
  ) : (
    <Redirect href="/auth/login" />
  );
}
