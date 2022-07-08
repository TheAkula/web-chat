import { useEffect } from "react";
import { useAuthContext } from "./context/auth-context";
import { useMyUserInfoLazyQuery } from "./generated/graphql";
import { RootRoutes } from "./navigation/root";

function App() {
  const [myInfoQuery, { data, loading }] = useMyUserInfoLazyQuery();
  const { changeAuthData } = useAuthContext();

  useEffect(() => {
    myInfoQuery({
      onCompleted(data) {
        changeAuthData(data.myUserInfo);
      },
    });
  }, [changeAuthData, myInfoQuery]);

  return (
    <div className="App">
      <RootRoutes />
    </div>
  );
}

export default App;
