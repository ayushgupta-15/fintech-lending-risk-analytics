{{ config(materialized='table') }}

SELECT 
    COUNT(*) AS total_loans,
    SUM(loan_amount) AS total_funded_amount,
    AVG(loan_amount) AS avg_loan_size,
    AVG(interest_rate) AS avg_interest_rate,
    AVG(debt_to_income) AS avg_dti,
    
    SUM(CASE WHEN default_flag = 1 THEN 1 ELSE 0 END) AS total_defaults,
    SUM(CASE WHEN default_flag = 1 THEN loan_amount ELSE 0 END) AS default_exposure,
    
    -- Using NULLIF to avoid division by zero
    ROUND(CAST(SUM(CASE WHEN default_flag = 1 THEN 1 ELSE 0 END) AS NUMERIC) / NULLIF(SUM(outcome_eligible), 0), 4) AS default_rate,
    
    -- Expected loss simplified proxy: average default exposure historically
    SUM(CASE WHEN default_flag = 1 THEN loan_amount - paid_total ELSE 0 END) AS expected_loss

FROM {{ ref('loans_clean') }}
