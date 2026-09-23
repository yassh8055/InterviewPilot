import { RouterProvider } from "react-router";
import { router } from "./app.router.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { InterviewProvider } from "./features/interview/interviewContext.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <InterviewProvider>
          <RouterProvider router={router} />
        </InterviewProvider>
      </AuthProvider>
    </>
  );
}

export default App;
