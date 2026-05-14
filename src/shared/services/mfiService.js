/**
 * Mock MFI (Microfinance Institution) Service
 */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mfiService = {
  /**
   * Create or update MFI tenant profile
   * @param {Object} mfiData 
   */
  createMFI: async (mfiData) => {
    await delay(1500);

    // Simulate validation
    if (!mfiData.institutionName) {
      return {
        success: false,
        message: "Institution name is required.",
      };
    }

    return {
      success: true,
      message: "MFI profile created successfully",
      data: {
        id: "mfi_" + Math.random().toString(36).substr(2, 9),
        ...mfiData,
        status: "active",
        onboardedAt: new Date().toISOString(),
      },
    };
  },

  /**
   * Get MFI details by ID
   * @param {string} id 
   */
  getMFIDetails: async (id) => {
    await delay(800);
    return {
      success: true,
      data: {
        id,
        institutionName: "Global Microfinance Corp",
        email: "admin@globalmfi.com",
        phone: "+1234567890",
        address: "123 Fintech Way, New York",
        licenseNumber: "MFI-8829-X",
      },
    };
  },
};

export default mfiService;
