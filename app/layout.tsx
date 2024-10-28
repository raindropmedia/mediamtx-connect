export const dynamic = "force-dynamic";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Viewport } from "next";
import { Inter } from "next/font/google";
import SW from "./_components/sw";
import "./globals.css";
import NavBar from "./nav-bar";
import { Toaster } from "@/components/ui/toaster";
import { login } from "./_actions/login";

interface LoginState {
  password: string;
  username: string;
  isLoading: boolean;
  error: string;
  isLoggedIn: boolean;
}

type LoginAction =
  | { type: "login" | "success" | "error" | "logout" }
  | { type: "field"; fieldName: string; payload: string };

  const loginReducer = (state: LoginState, action: LoginAction): LoginState => {
    switch (action.type) {
      case "field": {
        return {
          ...state,
          [action.fieldName]: action.payload 
        };
      }
      case "login": {
        return {
          ...state,
          error: "",
          isLoading: true
        };
      }
      case "success": {
        return { ...state, error: "", isLoading: false, isLoggedIn: true };
      }
      case "error": {
        return {
          ...state,
          isLoading: false,
          isLoggedIn: false,
          username: "",
          password: "",
          error: "Incorrect username or password!"
        };
      }
      case "logout": {
        return {
          ...state,
          isLoggedIn: false
        };
      }
      default:
        return state;
    }
  };

  const initialState: LoginState = {
    password: "",
    username: "",
    isLoading: false,
    error: "",
    isLoggedIn: false
  };

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const viewport: Viewport = {
  themeColor: "#020817",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { name: "Recordings", location: "/recordings" },
    { name: "Config", location: "/config" },
  ];
  const [state, dispatch] = React.useReducer(loginReducer, initialState);
  const { username, password, isLoading, error, isLoggedIn } = state;
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "login" });

    try {
      await login({ username, password });
      dispatch({ type: "success" });
    } catch (error) {
      dispatch({ type: "error" });
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col gap-4 items-center",
          inter.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <header className="flex sticky top-0 z-40 w-full bg-background/75 shadow border-b justify-center backdrop-blur">
          {isLoggedIn ? (
            <p>{`Hello ${username}`}</p>
            <div className="px-4 w-full max-w-7xl">
              <NavBar items={navItems}></NavBar>
            </div>
          </header>
          <div className="max-w-7xl p-4 w-full">{children}</div>
        ) : (
          <form className="form" onSubmit={onSubmit}>
            {error && <p className="error">{error}</p>}
            <p> PLease Login!</p>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) =>
                dispatch({
                  type: "field",
                  fieldName: "username",
                  payload: e.currentTarget.value
                })
              }
            />
            <input
              type="password"
              placeholder="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) =>
                dispatch({
                  type: "field",
                  fieldName: "password",
                  payload: e.currentTarget.value
                })
              }
            />
            <button type="submit" className="submit" disabled={isLoading}>
              {isLoading ? "Loggin in....." : "Login In"}
            </button>
          </form>
        )
        </ThemeProvider>
        <Toaster></Toaster>
      </body>

      <SW></SW>
    </html>
  );
}
