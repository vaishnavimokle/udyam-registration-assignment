import { createTheme, Button, MantineProvider } from "@mantine/core";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

const theme = createTheme({
  fontFamily: "Montserrat, sans-serif",
  components: {
    Button: Button.extend({
      defaultProps: {
        radius: "xl",
        variant: "gradient",
        gradient: { from: "#096ef2", to: "#0092ff", deg: 90 },
      },
    }),
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
