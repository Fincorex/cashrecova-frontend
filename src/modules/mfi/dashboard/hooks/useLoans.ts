
import { useState, useEffect, useCallback } from 'react';
import loanService, { Loan, LoanFilters, PaginatedLoans } from '../../../../shared/services/loanService';
 
interface UseLoansReturn {
    loans: Loan[];
    loading: boolean;
    error: string | null;
    total: number;
    page: number;
    lastPage: number;
    setPage: (page: number) => void;
    filters: LoanFilters;
    setFilters: (filters: Partial<LoanFilters>) => void;
    refresh: () => void;
}
 
const useLoans = (): UseLoansReturn => {
    const [result, setResult] = useState<PaginatedLoans>({ data: [], total: 0, page: 1, perPage: 10, lastPage: 1 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFiltersState] = useState<LoanFilters>({ page: 1, perPage: 10 });
 
    const fetchLoans = useCallback(async () => {
        setLoading(true);
        setError(null);
        const response = await loanService.getLoans(filters);
        if (response.success && response.data) {
            setResult(response.data);
        } else {
            setError(response.message || 'Failed to load loans');
        }
        setLoading(false);
    }, [filters]);
 
    useEffect(() => {
        fetchLoans();
    }, [fetchLoans]);
 
    const setFilters = (newFilters: Partial<LoanFilters>) => {
        setFiltersState((prev) => ({ ...prev, ...newFilters, page: 1 }));
    };
 
    const setPage = (page: number) => {
        setFiltersState((prev) => ({ ...prev, page }));
    };
 
    return {
        loans: result.data,
        loading,
        error,
        total: result.total,
        page: result.page,
        lastPage: result.lastPage,
        setPage,
        filters,
        setFilters,
        refresh: fetchLoans,
    };
};
 
export default useLoans;