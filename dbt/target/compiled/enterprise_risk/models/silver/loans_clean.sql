

WITH raw AS (
    SELECT * FROM "enterprise_risk"."bronze"."loans_raw"
)
SELECT 
    -- 1. Base Identifiers
    CAST("Unnamed: 0" AS INTEGER) AS loan_id,
    
    -- 2. Borrower Demographics & Income
    emp_title,
    CAST(emp_length AS REAL) AS emp_length,
    state,
    homeownership,
    CAST(annual_income AS REAL) AS annual_income,
    verified_income,
    CAST(debt_to_income AS REAL) AS debt_to_income,
    
    -- 3. Loan Attributes
    loan_purpose,
    application_type,
    CAST(loan_amount AS INTEGER) AS loan_amount,
    CAST(term AS INTEGER) AS term,
    CAST(interest_rate AS REAL) AS interest_rate,
    CAST(installment AS REAL) AS installment,
    grade,
    sub_grade,
    issue_month,
    loan_status,
    
    -- 4. Payment & Outcome
    CAST(balance AS REAL) AS balance,
    CAST(paid_total AS REAL) AS paid_total,
    CAST(paid_principal AS REAL) AS paid_principal,
    CAST(paid_interest AS REAL) AS paid_interest,
    
    -- 5. Derived Business Columns
    ROUND(CAST(annual_income / 12 AS NUMERIC), 2) AS monthly_income,
    
    CASE 
        WHEN annual_income < 50000 THEN 'Low'
        WHEN annual_income BETWEEN 50000 AND 100000 THEN 'Medium'
        ELSE 'High'
    END AS income_band,

    CASE 
        WHEN debt_to_income < 20 THEN 'Low (<20%)'
        WHEN debt_to_income BETWEEN 20 AND 35 THEN 'Medium (20-35%)'
        ELSE 'High (>35%)'
    END AS dti_band,

    CASE 
        WHEN loan_amount < 10000 THEN 'Small (<$10k)'
        WHEN loan_amount BETWEEN 10000 AND 25000 THEN 'Medium ($10k-$25k)'
        ELSE 'Large (>$25k)'
    END AS loan_size_band,

    CASE 
        WHEN loan_status IN ('Charged Off', 'Default', 'Late (31-120 days)') THEN 1
        ELSE 0
    END AS default_flag,

    CASE 
        WHEN loan_status IN ('Fully Paid', 'Charged Off', 'Default', 'Late (31-120 days)') THEN 1
        ELSE 0
    END AS outcome_eligible

FROM raw
WHERE loan_amount IS NOT NULL
  AND grade IS NOT NULL
  AND annual_income > 0
  AND debt_to_income >= 0