export default function validateInfo(values) {
  let errors = {};

  if (!values.username.trim()) {
    errors.username = "Vui lòng điền thông tin";
  }

  if (!values.email) {
    errors.email = "Email required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email không khả dụng";
  }
  if (!values.password) {
    errors.password = "Vui lòng điền mật khẩu";
  } else if (values.password.length < 6) {
    errors.password = "Mật khẩu gồm 6 kí tự";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Vui lòng điền mật khẩu";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Mật khẩu không khớp";
  }
  return errors;
}
