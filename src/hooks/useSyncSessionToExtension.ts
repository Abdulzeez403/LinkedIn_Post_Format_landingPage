import { useEffect } from "react";
import { supabase } from "../lib/supabase";

const useSyncSessionToExtension = () => {
  useEffect(() => {
    const sync = async () => {
      const { data } = await supabase.auth.getSession();
      const token = data?.session?.access_token;

      if (token && chrome.runtime?.sendMessage) {
        chrome.runtime.sendMessage({
          type: "AUTH_TOKEN",
          token,
        });
        console.log("Token sent to extension");
      }
    };

    sync();
  }, []);
};

export default useSyncSessionToExtension;
