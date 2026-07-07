-- 04_policy_scenarios.sql
-- Simulates the impact of different lending policies on historical volume and default risk.
-- Policies:
-- 1. Baseline: No additional filters (Current eligible portfolio)
-- 2. Balanced: Exclude Grade G and DTI > 35%
-- 3. Conservative: Exclude Grades E, F, G and DTI > 25%

WITH Baseline AS (
    SELECT 
        '1. Baseline' AS Policy,
        COUNT(*) AS Retained_Volume,
        SUM(loan_amount) AS Total_Funded_Amount,
        SUM(default_flag) AS Defaults,
        CAST(SUM(default_flag) AS FLOAT) / COUNT(*) AS Default_Rate,
        SUM(CASE WHEN default_flag = 1 THEN loan_amount ELSE 0 END) AS Defaulted_Principal_Exposure
    FROM loans
    WHERE outcome_eligible = 1
),
Balanced AS (
    SELECT 
        '2. Balanced' AS Policy,
        COUNT(*) AS Retained_Volume,
        SUM(loan_amount) AS Total_Funded_Amount,
        SUM(default_flag) AS Defaults,
        CAST(SUM(default_flag) AS FLOAT) / COUNT(*) AS Default_Rate,
        SUM(CASE WHEN default_flag = 1 THEN loan_amount ELSE 0 END) AS Defaulted_Principal_Exposure
    FROM loans
    WHERE outcome_eligible = 1
      AND grade NOT IN ('G')
      AND (debt_to_income <= 35 OR debt_to_income IS NULL)
),
Conservative AS (
    SELECT 
        '3. Conservative' AS Policy,
        COUNT(*) AS Retained_Volume,
        SUM(loan_amount) AS Total_Funded_Amount,
        SUM(default_flag) AS Defaults,
        CAST(SUM(default_flag) AS FLOAT) / COUNT(*) AS Default_Rate,
        SUM(CASE WHEN default_flag = 1 THEN loan_amount ELSE 0 END) AS Defaulted_Principal_Exposure
    FROM loans
    WHERE outcome_eligible = 1
      AND grade NOT IN ('E', 'F', 'G')
      AND (debt_to_income <= 25 OR debt_to_income IS NULL)
)

SELECT * FROM Baseline
UNION ALL
SELECT * FROM Balanced
UNION ALL
SELECT * FROM Conservative
ORDER BY Policy ASC;
