import { useEffect, useState } from "react";

import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

export const useInternetStatus = () => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(
      (state: NetInfoState) => {
        const offline = !(state.isConnected && state.isInternetReachable);

        setIsOffline(offline);
      }
    );

    return () => removeNetInfoSubscription();
  }, []);

  return { isOffline };
};
