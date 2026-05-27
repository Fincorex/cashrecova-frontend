/**
 * Production-Ready MFI (Microfinance Institution) Service (mfiService.ts)
 * 
 * ? Handles institution onboarding profile submission, license checks,
 * ? KYC metadata payload, and status synchronization with administrative dashboard controllers.
 * 
 * NOTE:
 * Metadata schemas submitted during onboarding map directly to JSON columns
 * in backend database systems, minimizing the need for dynamic schemas.
 */

import apiClient from './apiClient';
import { ApiResponse } from '../../types';

const isMockEnabled = import.meta.env.VITE_USE_MOCK_API === 'true';
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const mfiService = {
  /**
   * Submits full multi-step compliance onboarding payload.
   * 
   * ? Packages UBO registers, CAC certificates, and bank detail links in one request.
   */
  createMFI: async (mfiData: any): Promise<ApiResponse<any>> => {
    if (isMockEnabled) {
      await delay(1200);
      if (!mfiData.institutionName) {
        return {
          success: false,
          message: "Institution name is required.",
        };
      }
      return {
        success: true,
        message: "Compliance profile submitted successfully",
        data: {
          id: "mfi_" + Math.random().toString(36).substring(2, 11),
          ...mfiData,
          status: "pending_review",
          onboardedAt: new Date().toISOString(),
        },
      };
    }

    try {
      // Maps to dynamic onboarding processor endpoints in backend Laravel routing.
      const response = await apiClient.post<any>('/mfi/onboarding', {
        institution_name: mfiData.institutionName,
        license_number: mfiData.licenseNumber,
        address: mfiData.address,
        city: mfiData.city,
        country: mfiData.country,
        employee_count: mfiData.employeeCount,
        // Storing UBO registry lists, source of funds, CAC document references
        metadata: mfiData.metadata, 
      });
      return {
        success: true,
        message: response.message || "Profile submitted successfully",
        data: response.mfi,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        errors: error.errors,
      };
    }
  },

  /**
   * Fetches active verified details for an institution.
   */
  getMFIDetails: async (id: string): Promise<ApiResponse<any>> => {
    if (isMockEnabled) {
      await delay(600);
      return {
        success: true,
        data: {
          id,
          institutionName: "CashRecova Finance Limited",
          email: "compliance@cashrecova.com",
          phone: "+234 1 234 5678",
          address: "Lagos, Nigeria",
          licenseNumber: "RC-1849204",
        },
      };
    }

    try {
      const response = await apiClient.get<any>(`/mfi/details/${id}`);
      return {
        success: true,
        data: response.mfi,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
};

export default mfiService;
