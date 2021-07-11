import { lazy } from "react";

const authRoutes = [
  {
    path: "/confirm-account",
    component: lazy(() => import("./AccountConfirmation")),
  },
  {
    path: "/confirm",
    component: lazy(() => import("./PasswordConfirmation")),
  },
  {
    path: "/signup",
    component: lazy(() => import("./Signup")),
  },
  {
    path: "/login",
    component: lazy(() => import("./Login")),
  },
  {
    path: "/resend-otp",
    component: lazy(() => import("./ForgotPassword")),
  },
  {
    path: "/forgot-password",
    component: lazy(() => import("./ResetPassword")),
  },
];

export default authRoutes;
