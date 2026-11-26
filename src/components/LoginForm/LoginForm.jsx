import useForm from "../../Hooks/useForm";
import "./LoginForm.css";
export default function LoginForm() {
  const { values, loading, error, handleChange, handleSubmit } = useForm(
    { email: "", password: "" },
    async (values) => {
      console.log("Logging in with:", values);

      if (
        values.email === "admin@akalilhospital.com" &&
        values.password === "Pass123@"
      ) {
        console.log("Login successful");
      } else {
        throw new Error("Invalid email or password");
      }
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>

      <div>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={values.email}
            required
            onChange={handleChange}
          />
        </label>
      </div>

      <div>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={values.password}
            required
            onChange={handleChange}
          />
        </label>
      </div>

      {error && <p>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}