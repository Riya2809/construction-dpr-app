export const validateLogin = ({ email, password }) => {
  const errors = {};

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

export const validateDPR = ({ project, date, weather, workDesc, workerCount }) => {
  const errors = {};

  if (!project) errors.project = "Please select a project";
  if (!date) errors.date = "Date is required";
  if (!weather) errors.weather = "Please select a weather condition";

  if (!workDesc.trim()) {
    errors.workDesc = "Work description is required";
  } else if (workDesc.trim().length < 20) {
    errors.workDesc = "Description must be at least 20 characters";
  }

  if (!workerCount) {
    errors.workerCount = "Worker count is required";
  } else if (isNaN(workerCount) || Number(workerCount) < 1) {
    errors.workerCount = "Must be a positive number";
  } else if (Number(workerCount) > 500) {
    errors.workerCount = "Exceeds limit — maximum is 500 workers";
  }

  return errors;
};
