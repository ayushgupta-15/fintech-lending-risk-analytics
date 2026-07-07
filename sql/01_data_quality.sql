-- 01_data_quality.sql
-- Checks the basic integrity of the lending dataset

-- 1. Check for Duplicate Loans
SELECT 
    COUNT(emp_title) as total_rows, 
    COUNT(DISTINCT loan_amount) as distinct_loan_amounts,
    -- We don't have a specific 'loan_id' column, but we can check if there are complete duplicate rows
    COUNT(*) - COUNT(DISTINCT loan_amount || emp_title || state) as potential_duplicates
FROM loans;

-- 2. Validate Outcome Eligible Flags
-- Ensure outcome_eligible is 1 only for Fully Paid, Charged Off, and Default
SELECT 
    loan_status,
    outcome_eligible,
    COUNT(*) as num_loans
FROM loans
GROUP BY loan_status, outcome_eligible;

-- 3. Check for Nulls in Key Metric Columns
SELECT 
    SUM(CASE WHEN loan_amount IS NULL THEN 1 ELSE 0 END) as null_loan_amount,
    SUM(CASE WHEN interest_rate IS NULL THEN 1 ELSE 0 END) as null_interest_rate,
    SUM(CASE WHEN grade IS NULL THEN 1 ELSE 0 END) as null_grade,
    SUM(CASE WHEN debt_to_income IS NULL THEN 1 ELSE 0 END) as null_dti,
    SUM(CASE WHEN loan_status IS NULL THEN 1 ELSE 0 END) as null_loan_status
FROM loans;

-- 4. Verify Leakage Columns are Excluded from Future Models
-- This query confirms they exist and shows their fill rate, but they shouldn't be used
SELECT 
    COUNT(*) as total_loans,
    SUM(CASE WHEN balance > 0 THEN 1 ELSE 0 END) as loans_with_balance,
    SUM(CASE WHEN paid_total > 0 THEN 1 ELSE 0 END) as loans_with_payments
FROM loans;
