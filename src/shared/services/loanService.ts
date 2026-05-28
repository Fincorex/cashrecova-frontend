import apiClient from './apiClient';
import { ApiResponse } from '../../types';

const isMockEnabled = import.meta.env.VITE_USE_MOCK_API !== 'false';
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));



export type LoanStatus = 'Active' | 'Disbursed' | 'Late' | 'Repaid' | 'Defaulted';
export type LoanType = 'Personal Loan' | 'Business Loan';
export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface Loan {
    id: string;
    borrower: {
        name: string;
        email: string;
        initials: string;
    };
    loanType: LoanType;
    amount: number;
    status: LoanStatus;
    nextRepayment: {
        date: string;
        daysLabel: string;
        isOverdue: boolean;
    };
    riskScore: number;
    riskLevel: RiskLevel;
    interestRate: string;
    tenure: string;
    disbursedOn: string;
    maturityDate: string;
    loanPurpose: string;
    repaymentSummary: {
        total: number;
        paid: number;
        outstanding: number;
        overdue: number;
    };
    nextRepaymentAmount: number;
}

export interface LoanFilters {
    search?: string;
    status?: string;
    loanType?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    perPage?: number;
}

export interface PaginatedLoans {
    data: Loan[];
    total: number;
    page: number;
    perPage: number;
    lastPage: number;
}


const MOCK_LOANS: Loan[] = [
    {
        id: 'LN-2025-00124', borrower: { name: 'John Doe', email: 'john.doe@gmail.com', initials: 'JD' },
        loanType: 'Personal Loan', amount: 50000, status: 'Active',
        nextRepayment: { date: 'May 25, 2025', daysLabel: 'in 3 days', isOverdue: false },
        riskScore: 720, riskLevel: 'Low', interestRate: '12% p.a', tenure: '6 Months',
        disbursedOn: 'Apr 25, 2025', maturityDate: 'Oct 25, 2025', loanPurpose: 'Education',
        repaymentSummary: { total: 56000, paid: 16000, outstanding: 40000, overdue: 0 },
        nextRepaymentAmount: 10000,
    },
    {
        id: 'LN-2025-00123', borrower: { name: 'Jane Smith', email: 'jane.smith@gmail.com', initials: 'JS' },
        loanType: 'Business Loan', amount: 150000, status: 'Disbursed',
        nextRepayment: { date: 'May 26, 2025', daysLabel: 'in 6 days', isOverdue: false },
        riskScore: 680, riskLevel: 'Medium', interestRate: '14% p.a', tenure: '12 Months',
        disbursedOn: 'Apr 26, 2025', maturityDate: 'Apr 26, 2026', loanPurpose: 'Business Expansion',
        repaymentSummary: { total: 171000, paid: 0, outstanding: 171000, overdue: 0 },
        nextRepaymentAmount: 14250,
    },
    {
        id: 'LN-2025-00122', borrower: { name: 'Michael Brown', email: 'michael.b@gmail.com', initials: 'MB' },
        loanType: 'Personal Loan', amount: 30000, status: 'Late',
        nextRepayment: { date: 'May 20, 2025', daysLabel: '2 days overdue', isOverdue: true },
        riskScore: 580, riskLevel: 'High', interestRate: '18% p.a', tenure: '3 Months',
        disbursedOn: 'Feb 20, 2025', maturityDate: 'May 20, 2025', loanPurpose: 'Medical',
        repaymentSummary: { total: 34350, paid: 22900, outstanding: 11450, overdue: 11450 },
        nextRepaymentAmount: 11450,
    },
    {
        id: 'LN-2025-00121', borrower: { name: 'Alice Johnson', email: 'alice.j@gmail.com', initials: 'AJ' },
        loanType: 'Business Loan', amount: 200000, status: 'Active',
        nextRepayment: { date: 'Jun 02, 2025', daysLabel: 'in 11 days', isOverdue: false },
        riskScore: 750, riskLevel: 'Low', interestRate: '11% p.a', tenure: '18 Months',
        disbursedOn: 'Dec 02, 2024', maturityDate: 'Jun 02, 2026', loanPurpose: 'Working Capital',
        repaymentSummary: { total: 233000, paid: 77666, outstanding: 155334, overdue: 0 },
        nextRepaymentAmount: 12944,
    },
    {
        id: 'LN-2025-00120', borrower: { name: 'David Wilson', email: 'david.w@gmail.com', initials: 'DW' },
        loanType: 'Personal Loan', amount: 75000, status: 'Repaid',
        nextRepayment: { date: 'May 10, 2025', daysLabel: 'Paid', isOverdue: false },
        riskScore: 700, riskLevel: 'Low', interestRate: '13% p.a', tenure: '6 Months',
        disbursedOn: 'Nov 10, 2024', maturityDate: 'May 10, 2025', loanPurpose: 'Home Improvement',
        repaymentSummary: { total: 84975, paid: 84975, outstanding: 0, overdue: 0 },
        nextRepaymentAmount: 0,
    },
    {
        id: 'LN-2025-00119', borrower: { name: 'Sophia Martinez', email: 'sophia.m@gmail.com', initials: 'SM' },
        loanType: 'Business Loan', amount: 120000, status: 'Defaulted',
        nextRepayment: { date: 'Apr 30, 2025', daysLabel: '32 days overdue', isOverdue: true },
        riskScore: 460, riskLevel: 'High', interestRate: '16% p.a', tenure: '9 Months',
        disbursedOn: 'Jul 30, 2024', maturityDate: 'Apr 30, 2025', loanPurpose: 'Equipment Purchase',
        repaymentSummary: { total: 138960, paid: 61760, outstanding: 77200, overdue: 77200 },
        nextRepaymentAmount: 15436,
    },
    {
        id: 'LN-2025-00118', borrower: { name: 'Daniel Garcia', email: 'daniel.g@gmail.com', initials: 'DG' },
        loanType: 'Personal Loan', amount: 40000, status: 'Active',
        nextRepayment: { date: 'May 26, 2025', daysLabel: 'in 4 days', isOverdue: false },
        riskScore: 690, riskLevel: 'Medium', interestRate: '15% p.a', tenure: '6 Months',
        disbursedOn: 'Nov 26, 2024', maturityDate: 'May 26, 2025', loanPurpose: 'Personal',
        repaymentSummary: { total: 43000, paid: 35833, outstanding: 7167, overdue: 0 },
        nextRepaymentAmount: 7167,
    },
    {
        id: 'LN-2025-00117', borrower: { name: 'Emily Davis', email: 'emily.d@gmail.com', initials: 'ED' },
        loanType: 'Business Loan', amount: 250000, status: 'Disbursed',
        nextRepayment: { date: 'Jun 05, 2025', daysLabel: 'in 14 days', isOverdue: false },
        riskScore: 740, riskLevel: 'Low', interestRate: '12.5% p.a', tenure: '24 Months',
        disbursedOn: 'May 05, 2025', maturityDate: 'May 05, 2027', loanPurpose: 'Business Expansion',
        repaymentSummary: { total: 313750, paid: 0, outstanding: 313750, overdue: 0 },
        nextRepaymentAmount: 13073,
    },
];


const loanService = {
    getLoans: async (filters: LoanFilters = {}): Promise<ApiResponse<PaginatedLoans>> => {
        if (isMockEnabled) {
            await delay(600);

            let results = [...MOCK_LOANS];

            if (filters.search) {
                const q = filters.search.toLowerCase();
                results = results.filter(
                    (l) =>
                        l.borrower.name.toLowerCase().includes(q) ||
                        l.id.toLowerCase().includes(q) ||
                        l.borrower.email.toLowerCase().includes(q)
                );
            }

            if (filters.status && filters.status !== 'All') {
                results = results.filter((l) => l.status === filters.status);
            }

            if (filters.loanType && filters.loanType !== 'All') {
                results = results.filter((l) => l.loanType === filters.loanType);
            }

            const page = filters.page ?? 1;
            const perPage = filters.perPage ?? 10;
            const start = (page - 1) * perPage;
            const paginated = results.slice(start, start + perPage);

            return {
                success: true,
                data: {
                    data: paginated,
                    total: results.length,
                    page,
                    perPage,
                    lastPage: Math.ceil(results.length / perPage),
                },
            };
        }

        try {
            const params = new URLSearchParams();
            if (filters.search)   params.append('search', filters.search);
            if (filters.status && filters.status !== 'All') params.append('status', filters.status);
            if (filters.loanType && filters.loanType !== 'All') params.append('loan_type', filters.loanType);
            if (filters.dateFrom) params.append('date_from', filters.dateFrom);
            if (filters.dateTo)   params.append('date_to', filters.dateTo);
            params.append('page', String(filters.page ?? 1));
            params.append('per_page', String(filters.perPage ?? 10));

            const response = await apiClient.get<any>(`/loans?${params.toString()}`);
            return {
                success: true,
                data: {
                    data: response.data,
                    total: response.meta?.total ?? response.data.length,
                    page: response.meta?.current_page ?? 1,
                    perPage: response.meta?.per_page ?? 10,
                    lastPage: response.meta?.last_page ?? 1,
                },
            };
        } catch (error: any) {
            return { success: false, message: error.message };
        }
    },
    getLoanById: async (id: string): Promise<ApiResponse<Loan>> => {
        if (isMockEnabled) {
            await delay(400);
            const loan = MOCK_LOANS.find((l) => l.id === id);
            if (!loan) return { success: false, message: 'Loan not found' };
            return { success: true, data: loan };
        }

        try {
            const response = await apiClient.get<any>(`/loans/${id}`);
            return { success: true, data: response.data };
        } catch (error: any) {
            return { success: false, message: error.message };
        }
    },
};

export default loanService;
