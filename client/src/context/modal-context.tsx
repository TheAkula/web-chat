import React, {
  ReactNode,
  Reducer,
  useContext,
  useMemo,
  useReducer,
} from "react";

interface ModaContextValue {
  close: () => void;
  show: (c: ReactNode) => void;
  content: ReactNode;
  isShow: boolean;
}

const ModalContext = React.createContext<ModaContextValue>({
  close: () => {},
  show: () => {},
  content: null,
  isShow: false,
});

interface ModalContextProviderProps {
  children: ReactNode;
}

interface ReducerState {
  content: ReactNode;
  isShow: boolean;
}

enum ReducerActions {
  SHOW = "SHOW",
  CLOSE = "CLOSE",
}

interface ReducerAction {
  type: ReducerActions;
  content?: ReactNode;
}

const reducer: Reducer<ReducerState, ReducerAction> = (state, action) => {
  switch (action.type) {
    case ReducerActions.CLOSE:
      return {
        ...state,
        content: null,
        isShow: false,
      };
    case ReducerActions.SHOW:
      return {
        ...state,
        content: action.content,
        isShow: true,
      };
    default:
      throw new Error("Invalid action type: " + action.type);
  }
};

export const ModalContextProvider = ({
  children,
}: ModalContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, {
    content: null,
    isShow: false,
  });

  const show = (content: ReactNode) => {
    dispatch({ type: ReducerActions.SHOW, content });
  };

  const close = () => {
    dispatch({ type: ReducerActions.CLOSE });
  };

  const value: ModaContextValue = useMemo(
    () => ({
      show,
      close,
      ...state,
    }),
    [state]
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
