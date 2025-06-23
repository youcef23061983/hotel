import { useReducer, useEffect, createContext, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../info & contact/Firebase";

export const AppContext = createContext();

const initialState = {
  room: {},
  user: {},
  payment: {},
  formUser: null,
  firebaseUser: null,
};

const AppProvider = ({ children }) => {
  const authUrl = import.meta.env.VITE_PROD_URL_URL;

  const [isInitialized, setIsInitialized] = useState(false);

  const Reducer = (state, action) => {
    switch (action.type) {
      case "SET_FORM_USER": {
        return {
          ...state,
          formUser: action.payload,
        };
      }

      case "SET_FIREBASE_USER": {
        return {
          ...state,
          firebaseUser: action.payload,
        };
      }
      case "INFORMATION": {
        return {
          ...state,
          user: action.payload,
        };
      }
      case "PAYMENT": {
        return {
          ...state,
          payment: action.payload,
        };
      }

      case "LOGOUT": {
        return {
          ...state,
          firebaseUser: null,
          formUser: null,
        };
      }

      case "LOAD_CART": {
        return { ...state, room: action.payload };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  // Initialize Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          provider: firebaseUser.providerData[0]?.providerId,
        };
        setFirebaseUser(userData);
      } else {
        setFirebaseUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const roomUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: "INFORMATION", payload: user });
  };

  const roomPayment = (payment) => {
    localStorage.setItem("payment", JSON.stringify(payment));
    dispatch({ type: "PAYMENT", payload: payment });
  };

  const setFormUser = (user) => {
    sessionStorage.setItem("formUser", JSON.stringify(user));
    dispatch({ type: "SET_FORM_USER", payload: user });
  };

  const setFirebaseUser = (user) => {
    localStorage.setItem("fireUser", JSON.stringify(user));

    dispatch({ type: "SET_FIREBASE_USER", payload: user });
  };
  const addToCart = (room) => {
    dispatch({ type: "LOAD_CART", payload: room });
  };
  const logout = async () => {
    try {
      const response = await fetch(`${authUrl}/auth/logout`, {
        method: "POST",
        credentials: "include", // Required for cookies
      });

      if (!response.ok) {
        throw new Error("Failed to clear server session");
      }
      sessionStorage.removeItem("formUser");
      sessionStorage.removeItem("fireUser");
      sessionStorage.removeItem("token");
      dispatch({ type: "LOGOUT" });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
      throw error; // Re-throw to handle in components
    }
  };

  // Initialize app state

  useEffect(() => {
    if (isInitialized) return;

    const initializeState = () => {
      try {
        const storedCart = localStorage.getItem("room");
        if (storedCart && storedCart !== "undefined") {
          dispatch({ type: "LOAD_CART", payload: JSON.parse(storedCart) });
        }
      } catch (error) {
        console.error("Failed to parse room data from localStorage:", error);
        localStorage.removeItem("room"); // Clean up corrupted data
      }

      try {
        const savedFirebaseUser = localStorage.getItem("fireUser");
        if (savedFirebaseUser) {
          const user = JSON.parse(savedFirebaseUser);
          // Verify the user object has required fields
          if (user && user.uid) {
            dispatch({ type: "SET_FIREBASE_USER", payload: user });
          }
        }
      } catch (e) {
        console.warn("Failed to load Firebase user", e);
      }

      try {
        const savedFormUser = localStorage.getItem("formUser");
        if (savedFormUser) {
          const user = JSON.parse(savedFormUser);
          // Verify the user object has required fields
          if (user && user.email) {
            dispatch({ type: "SET_FORM_USER", payload: user });
          }
        }
      } catch (e) {
        console.warn("Failed to load form user", e);
      }

      // Load payment
      const storedPayment = localStorage.getItem("payment");
      if (storedPayment) {
        dispatch({ type: "PAYMENT", payload: JSON.parse(storedPayment) });
      }

      const storedInformation = localStorage.getItem("user");
      if (storedInformation) {
        dispatch({
          type: "INFORMATION",
          payload: JSON.parse(storedInformation),
        });
      }

      setIsInitialized(true);
    };

    initializeState();
  }, [isInitialized]);

  const checkAuthStatus = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return null;

      const response = await fetch(`${authUrl}/auth/verify`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        sessionStorage.removeItem("token");
        return null;
      }

      const data = await response.json();
      sessionStorage.setItem("token", data.token);

      return data;
    } catch (error) {
      console.error("Auth check error:", error);
      return null;
    }
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        addToCart,
        setFirebaseUser,
        setFormUser,
        checkAuthStatus,
        roomPayment,
        roomUser,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
