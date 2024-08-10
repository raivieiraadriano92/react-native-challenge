import { useEffect, useRef, useState } from "react";

import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

export const useInternetStatus = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(
      (state: NetInfoState) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Set a timeout to prevent flickering
        timeoutRef.current = setTimeout(() => {
          const offline = !(state.isConnected && state.isInternetReachable);

          setIsOffline(offline);
        }, 1000);
      }
    );

    return () => removeNetInfoSubscription();
  }, []);

  return { isOffline };
};
