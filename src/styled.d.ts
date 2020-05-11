import {} from "styled-components";
import theme from "./styles/theme";

type Theme = typeof theme;

// we are making use of Typescript’s type inference for our theme object to do it for us
declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
