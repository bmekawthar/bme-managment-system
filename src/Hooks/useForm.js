import { useState } from "react";

export default function useForm(initialValues, onSubmit) {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      await onSubmit(values);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { values, loading, error, handleChange, handleSubmit };
}