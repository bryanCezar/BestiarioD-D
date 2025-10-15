// src/navigation/types.ts
import { Monster } from "../types/Monster";

export type RootStackParamList = {
  Home: undefined;
  Create: undefined;
  Update: {
    monster: Monster;
    onUpdate?: () => void; // aqui indicamos que a tela pode receber uma função callback
  };
};
