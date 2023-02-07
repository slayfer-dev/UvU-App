/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { StaticImageData } from "next/image";
import { ReactNode, createContext, useReducer } from "react";

interface IAcompañanteProvider {
  children: ReactNode;
}

interface IUsuarioProvider {
  children: ReactNode;
}

interface IAcompañante {
  name: string;
  avatar: string | StaticImageData;
  icon: string | StaticImageData;
  setAcompañante: (payload: Record<string, any>) => void;
}

type TAcompañanteAction = {
  type: "SET_ACOMPAÑANTE";
  payload: {
    avatar: string | StaticImageData;
    name: string;
    icon: string | StaticImageData;
  };
};

type TUsuarioAction = { type: "SET_USUARIO"; payload: string };

const ACOMPAÑANTE_INITIAL_STATE: IAcompañante = {
  name: "",
  avatar: "",
  icon: "",
  setAcompañante: (_: Record<string, any>) => {},
};

const USUARIO_INITIAL_STATE = {
  usuario: "",
  setUsuario: (_: any) => {},
};

export const AcompañanteContext = createContext(ACOMPAÑANTE_INITIAL_STATE);

export const AcompañanteReducer = (
  state: IAcompañante,
  action: TAcompañanteAction
) => {
  const storage = localStorage;

  switch (action.type) {
    case "SET_ACOMPAÑANTE":
      storage.setItem(
        "acompañante",
        JSON.stringify({
          ...state,
          ...action.payload,
        })
      );
      return {
        ...state,
        ...action.payload,
      };
    default:
      storage.setItem("acompañante", JSON.stringify(state));
      return state;
  }
};

export const AcompañanteProvider = ({ children }: IAcompañanteProvider) => {
  const storage = localStorage;

  const [{ name, avatar, icon }, dispatch] = useReducer(
    AcompañanteReducer,
    ACOMPAÑANTE_INITIAL_STATE
  );

  const setAcompañante = ({
    avatar,
    name,
    icon,
  }: {
    avatar: string | StaticImageData;
    name: string;
    icon: string | StaticImageData;
  }) => {
    dispatch({
      type: "SET_ACOMPAÑANTE",
      payload: { avatar, name, icon },
    });
  };

  const defaultValue = JSON.parse(storage.getItem("acompañante") ?? "{}") ?? {
    name,
    avatar,
    icon,
  };

  return (
    <AcompañanteContext.Provider value={{ ...defaultValue, setAcompañante }}>
      {children}
    </AcompañanteContext.Provider>
  );
};

export const UsuarioContext = createContext(USUARIO_INITIAL_STATE);

export const UsuarioReducer = (
  state: typeof USUARIO_INITIAL_STATE,
  action: TUsuarioAction
) => {
  switch (action.type) {
    case "SET_USUARIO":
      return {
        ...state,
        usuario: action.payload,
      };
    default:
      return state;
  }
};

export const UsuarioProvider = ({ children }: IUsuarioProvider) => {
  const [{ usuario }, dispatch] = useReducer(
    UsuarioReducer,
    USUARIO_INITIAL_STATE
  );

  const setUsuario = (value: any) => {
    dispatch({ type: "SET_USUARIO", payload: value });
  };

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
};
