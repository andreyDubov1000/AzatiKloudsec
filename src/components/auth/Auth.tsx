import Loader from "@component/atoms/Loader";
import React from "react";

const Auth: React.FC = ({ children }) => {
  // const history = useHistory();
  // const { state } = useLocation();
  // const storeRef = useRef(null);
  const loading = true;
  // const { store, updateStore } = useContext(AppContext);
  // const { loading } = store;

  // storeRef.current = store;

  // useEffect(() => {
  // updateStore((store) => ({ ...store, loading: true }));
  // auth.onAuthStateChanged(
  //   async (user) => {
  //     if (user?.uid) {
  //       let userDetails = (await getUserDetails(user.uid)) || {};
  //       userDetails.uid = user.uid;
  //       userDetails.emailVerified = user.emailVerified ? true : false;
  //       updateStore((store) => ({
  //         ...store,
  //         loading: false,
  //         user: userDetails,
  //       }));
  //     } else {
  //       updateStore((store) => ({ ...store, user: null, loading: false }));
  //     }
  //   },
  //   (err) => {
  //     console.log(err);
  //   }
  // );
  // }, [history, state, updateStore]);

  return loading ? <Loader /> : <>{children}</>;
};

export default Auth;
