import 'styled-components';
import { defaultTheme } from '../styles/themes/default';

type ThemeType = typeof defaultTheme;

// Declaração do módulo para adicionar tipagem ao tema padrão do styled-components
declare module 'styled-components' {
    // DefaultTheme é equivalente a ThemeType, garantindo que o tema padrão seja corretamente tipado
    export interface DefaultTheme extends ThemeType { }
}