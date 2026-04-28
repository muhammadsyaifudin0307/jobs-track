import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router";
import { Button } from "@/components/ui/button";

const Login = () => {
  const { user, loading, login } = useAuth();
  if (user) <Navigate to={"/"} replace />;

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Apply Note</h1>
        <p className="text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus similique culpa ut!
        </p>
      </div>

      <Button onClick={login} disabled={loading} className=" gap-2">
        {loading ? (
          "loading"
        ) : (
          <>
            <img src="https://www.google.com/favicon.ico" className="h-4 w-4" />
            Login dengan Google
          </>
        )}
      </Button>
    </div>
  );
};

export default Login;
