-- 03_risk_segmentation.sql
-- Queries to answer Borrower Risk business questions

-- Q7. How does default rate vary across income bands?
WITH IncomeBands AS (
    SELECT 
        CASE 
            WHEN annual_income < 50000 THEN '< $50k'
            WHEN annual_income < 100000 THEN '$50k - $100k'
            WHEN annual_income < 150000 THEN '$100k - $150k'
            ELSE '> $150k'
        END AS income_band,
        outcome_eligible,
        default_flag
    FROM loans
    WHERE outcome_eligible = 1
)
SELECT 
    income_band,
    COUNT(*) AS eligible_loans,
    SUM(default_flag) AS defaults,
    CAST(SUM(default_flag) AS FLOAT) / COUNT(*) AS default_rate
FROM IncomeBands
GROUP BY income_band
ORDER BY default_rate DESC;

-- Q8. How does default rate vary across debt-to-income (DTI) bands?
SELECT 
    dti_band,
    SUM(outcome_eligible) AS eligible_loans,
    SUM(default_flag) AS defaults,
    CAST(SUM(default_flag) AS FLOAT) / SUM(outcome_eligible) AS default_rate
FROM loans
WHERE outcome_eligible = 1
GROUP BY dti_band
ORDER BY dti_band ASC;

-- Q9. Are higher interest rates associated with higher observed default rates?
WITH InterestRateBands AS (
    SELECT 
        CASE 
            WHEN interest_rate < 10 THEN '< 10%'
            WHEN interest_rate < 15 THEN '10% - 15%'
            WHEN interest_rate < 20 THEN '15% - 20%'
            ELSE '> 20%'
        END AS int_rate_band,
        outcome_eligible,
        default_flag
    FROM loans
    WHERE outcome_eligible = 1
)
SELECT 
    int_rate_band,
    COUNT(*) AS eligible_loans,
    SUM(default_flag) AS defaults,
    CAST(SUM(default_flag) AS FLOAT) / COUNT(*) AS default_rate
FROM InterestRateBands
GROUP BY int_rate_band
ORDER BY default_rate DESC;

-- Q10. Which loan purpose shows the highest default rate?
SELECT 
    loan_purpose,
    SUM(outcome_eligible) AS eligible_loans,
    SUM(default_flag) AS defaults,
    CAST(SUM(default_flag) AS FLOAT) / SUM(outcome_eligible) AS default_rate
FROM loans
WHERE outcome_eligible = 1
GROUP BY loan_purpose
HAVING SUM(outcome_eligible) > 10 -- Optional: filter out very small sample sizes
ORDER BY default_rate DESC;

-- Q11. What do the risk segments (Credit Grade × DTI) look like in terms of volume, funded amount, and default rate?
SELECT 
    risk_segment,
    COUNT(*) AS total_loans,
    SUM(loan_amount) AS total_funded_amount,
    SUM(outcome_eligible) AS eligible_loans,
    SUM(default_flag) AS defaults,
    CAST(SUM(default_flag) AS FLOAT) / NULLIF(SUM(outcome_eligible), 0) AS default_rate
FROM loans
GROUP BY risk_segment
ORDER BY grade ASC, dti_band ASC;
