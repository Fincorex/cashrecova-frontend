/**
 * Mock Authentication Service
 */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const authService = {
  /**
   * Register a new MFI user
   * @param {Object} userData - Institution Name, Email, Phone, Password
   */
  registerMFI: async (userData) => {
    await delay(1200);

    // Simulate edge case: Duplicate email
    if (userData.email === "exists@fincorex.com") {
      return {
        success: false,
        message: "An institution with this email already exists.",
      };
    }

    const mockUser = {
      id: "mfi_" + Math.random().toString(36).substr(2, 9),
      institutionName: userData.institutionName,
      email: userData.email,
      phone: userData.phone,
    };

    return {
      success: true,
      message: "Registration successful",
      data: mockUser,
      token: "fake-jwt-token-" + Math.random().toString(36).substr(2),
    };
  },

  /**
   * Login MFI user
   * @param {Object} credentials - Email, Password
   */
  login: async (credentials) => {
    await delay(1000);

    // Simulate validation
    if (credentials.email === "error@fincorex.com") {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const mockUser = {
      id: "mfi_12345",
      institutionName: "Global Microfinance Corp",
      email: credentials.email,
    };

    return {
      success: true,
      message: "Login successful",
      data: mockUser,
      token: "fake-jwt-token-12345",
    };
  },

  /**
   * Logout user
   */
  logout: async () => {
    await delay(500);
    return { success: true };
  },
};

export default authService;
