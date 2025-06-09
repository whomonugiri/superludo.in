export const isFullNameInvalid = (fullName, t) => {
  const fullNameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;
  if (!fullName) {
    return `${t("fullname_check1")}`;
  }
  if (!fullNameRegex.test(fullName)) {
    return `${t("fullname_check2")}`;
  }

  if (!isValidName(fullName)) {
    return `${t("fullname_check2")}`;
  }
  return false;
};

function isValidName(name) {
  // Check if name is more than 15 characters
  if (name.length > 15) {
    return false;
  }

  // Count the digits in the name
  const digitCount = (name.match(/\d/g) || []).length;

  // Allow only up to 5 digits
  return digitCount <= 5;
}

export const isMobileNumberInvalid = (mobileNumber, t) => {
  const mobileNumberRegex = /^\d{10}$/; // Allows only 10-digit numbers
  if (!mobileNumber) {
    return `${t("mobileno_check1")}`;
  }
  if (!mobileNumberRegex.test(mobileNumber)) {
    return `${t("mobileno_check2")}`;
  }
  return false;
};

export const isOTPInvalid = (otp, t) => {
  const otpRegex = /^\d{6}$/; // Matches exactly 6 digits

  if (!otp) {
    return `${t("otp_check1")}`;
  }
  if (!otpRegex.test(otp)) {
    return `${t("otp_check2")}`;
  }
  return false;
};
