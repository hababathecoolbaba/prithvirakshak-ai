import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router";

import {
  Eye,
  EyeOff,
  LogIn,
  ShieldCheck,
  UserPlus,
} from "lucide-react";

import Logo from "../components/Logo";
import {
  useLanguage,
} from "../context/LanguageContext";

export default function Login() {
  const navigate = useNavigate();

  const [params, setParams] =
    useSearchParams();

  const { t } = useLanguage();

  const role =
    params.get("role") || "citizen";

  const initialMode =
    params.get("mode") === "signup"
      ? "signup"
      : "signin";

  const [mode, setMode] =
    useState(initialMode);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  function switchMode(nextMode) {
    setMode(nextMode);

    setParams({
      role,
      mode: nextMode,
    });

    setMessage("");
  }

  function citizenSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (mode === "signup") {
      if (
        !name.trim() ||
        !email.trim() ||
        !password
      ) {
        setMessage(t("fillFields"));
        return;
      }

      if (password !== confirmPassword) {
        setMessage(
          t("passwordsMismatch")
        );
        return;
      }

      let users = [];

      try {
        users =
          JSON.parse(
            localStorage.getItem(
              "prithvirakshak-users"
            )
          ) || [];
      } catch {
        users = [];
      }

      if (
        users.some(
          (user) =>
            user.email.toLowerCase() ===
            email.trim().toLowerCase()
        )
      ) {
        setMessage(
          t("accountExists")
        );
        return;
      }

      const newUser = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        password,
      };

      users.push(newUser);

      localStorage.setItem(
        "prithvirakshak-users",
        JSON.stringify(users)
      );

      localStorage.setItem(
        "prithvirakshak-current-user",
        JSON.stringify({
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        })
      );

      navigate("/home");
      return;
    }

    let users = [];

    try {
      users =
        JSON.parse(
          localStorage.getItem(
            "prithvirakshak-users"
          )
        ) || [];
    } catch {
      users = [];
    }

    const user = users.find(
      (item) =>
        item.email.toLowerCase() ===
          email.trim().toLowerCase() &&
        item.password === password
    );

    if (!user) {
      setMessage(t("invalidLogin"));
      return;
    }

    localStorage.setItem(
      "prithvirakshak-current-user",
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
      })
    );

    navigate("/home");
  }

  function operationalLogin(event) {
    event.preventDefault();

    if (role === "authority") {
      navigate(
        "/authority/dashboard"
      );
      return;
    }

    if (role === "responder") {
      navigate("/responder");
      return;
    }

    navigate("/home");
  }

  const isCitizen =
    role === "citizen";

  return (
    <main className="grid-background min-h-screen bg-slate-950 px-5 py-10 text-white">
      <div className="mx-auto max-w-md">
        <Link
          to="/"
          className="inline-block"
        >
          <Logo />
        </Link>

        <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/85 p-7 shadow-2xl">
          {isCitizen ? (
            <>
              <div className="grid grid-cols-2 rounded-xl bg-slate-950 p-1">
                <button
                  onClick={() =>
                    switchMode("signin")
                  }
                  className={`rounded-lg py-3 text-sm font-bold ${
                    mode === "signin"
                      ? "bg-cyan-400 text-slate-950"
                      : "text-slate-400"
                  }`}
                >
                  {t("signIn")}
                </button>

                <button
                  onClick={() =>
                    switchMode("signup")
                  }
                  className={`rounded-lg py-3 text-sm font-bold ${
                    mode === "signup"
                      ? "bg-cyan-400 text-slate-950"
                      : "text-slate-400"
                  }`}
                >
                  {t("signUp")}
                </button>
              </div>

              <h1 className="mt-7 text-3xl font-black">
                {mode === "signin"
                  ? t("welcomeBack")
                  : t("accountTitle")}
              </h1>

              <form
                onSubmit={citizenSubmit}
                className="mt-7 space-y-4"
              >
                {mode === "signup" && (
                  <Field
                    label={t("name")}
                    value={name}
                    onChange={setName}
                    type="text"
                  />
                )}

                <Field
                  label={t("email")}
                  value={email}
                  onChange={setEmail}
                  type="email"
                />

                <div>
                  <label className="text-xs font-bold text-slate-500">
                    {t("password")}
                  </label>

                  <div className="mt-2 flex items-center rounded-xl border border-slate-700 bg-slate-950">
                    <input
                      value={password}
                      onChange={(event) =>
                        setPassword(
                          event.target.value
                        )
                      }
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      required
                      className="min-w-0 flex-1 bg-transparent p-4 outline-none"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="p-4 text-slate-500"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {mode === "signup" && (
                  <Field
                    label={t(
                      "confirmPassword"
                    )}
                    value={confirmPassword}
                    onChange={
                      setConfirmPassword
                    }
                    type="password"
                  />
                )}

                {message && (
                  <div className="rounded-xl border border-amber-400/20 bg-amber-400/10 p-3 text-sm text-amber-200">
                    {message}
                  </div>
                )}

                <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 p-4 font-black text-slate-950">
                  {mode === "signin" ? (
                    <LogIn size={18} />
                  ) : (
                    <UserPlus size={18} />
                  )}

                  {mode === "signin"
                    ? t("signInButton")
                    : t(
                        "createAccount"
                      )}
                </button>
              </form>

              <p className="mt-5 text-center text-sm text-slate-500">
                {mode === "signin"
                  ? t("noAccount")
                  : t("haveAccount")}

                {" "}

                <button
                  onClick={() =>
                    switchMode(
                      mode === "signin"
                        ? "signup"
                        : "signin"
                    )
                  }
                  className="font-bold text-cyan-300"
                >
                  {mode === "signin"
                    ? t("signUp")
                    : t("signIn")}
                </button>
              </p>

              <div className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/10 p-3 text-xs leading-5 text-amber-200">
                {t("demoAuth")}
              </div>
            </>
          ) : (
            <>
              <ShieldCheck
                className="text-cyan-300"
                size={30}
              />

              <h1 className="mt-5 text-3xl font-black capitalize">
                {role} Login
              </h1>

              <form
                onSubmit={
                  operationalLogin
                }
                className="mt-7 space-y-4"
              >
                <Field
                  label="Operator ID"
                  value={email}
                  onChange={setEmail}
                  type="text"
                />

                <Field
                  label="Password"
                  value={password}
                  onChange={setPassword}
                  type="password"
                />

                {role ===
                  "authority" && (
                  <input
                    placeholder="MFA code"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 outline-none"
                  />
                )}

                <button className="w-full rounded-xl bg-cyan-400 p-4 font-black text-slate-950">
                  Continue to Dashboard
                </button>
              </form>

              <div className="mt-6 text-xs text-slate-500">
                Prototype operational login.
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type,
}) {
  return (
    <div>
      <label className="text-xs font-bold text-slate-500">
        {label}
      </label>

      <input
        type={type}
        required
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 outline-none focus:border-cyan-400"
      />
    </div>
  );
}
