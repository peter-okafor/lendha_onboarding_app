import type { ComponentStyleConfig } from '@chakra-ui/theme';

export interface ThemeProps {
  components: {
    [key: string]: ComponentStyleConfig;
  };
}
