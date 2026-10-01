import { Inter, Montserrat } from "next/font/google";
import Layout from "components/Layout";
import "styles/globals.css";

// Montserrat é a família da logo; Inter cuida dos textos corridos.
const titulos = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--fonte-titulos",
  display: "swap",
});

const textos = Inter({
  subsets: ["latin"],
  variable: "--fonte-textos",
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${titulos.variable} ${textos.variable} app`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
