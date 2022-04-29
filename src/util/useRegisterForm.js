import { useState, useEffect } from "react";
import { register } from "../redux/apiCall";
import { useDispatch } from "react-redux";

const useRegisterForm = (validate, callback) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      register(dispatch, values);
    }
  }, [errors, isSubmitting]);

  return { handleChange, handleSubmit, values, errors, dispatch };
};

export default useRegisterForm;
