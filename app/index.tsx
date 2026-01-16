// import { Redirect } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useEffect, useState } from "react";

// export default function Index() {
//   const [ready, setReady] = useState(false);
//   const [firstTime, setFirstTime] = useState(true);

//   useEffect(() => {
//     AsyncStorage.getItem("seenIntro").then((value) => {
//       setFirstTime(!value);
//       setReady(true);
//     });
//   }, []);

//   if (!ready) return null;

//   return firstTime ? (
//     <Redirect href="/auth/intro" />
//   ) : (
//     <Redirect href="/auth/login" />
//   );
// }
import { Redirect } from "expo-router";

export default function Index() {
  // ✅ Always show intro when app opens
  return <Redirect href="/auth/intro" />;
}
