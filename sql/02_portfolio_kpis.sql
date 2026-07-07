-- 02_portfolio_kpis.sql
-- Queries to answer Portfolio Performance business questions

-- Q1. How many loans are in the portfolio, and what is the total funded amount?
SELECT 
    COUNT(*) AS total_loans, 
    SUM(loan_amount) AS total_funded_amount
FROM loans;

-- Q2. What is the average loan size and average/weighted interest rate?
SELECT 
    AVG(loan_amount) AS average_loan_size,
    AVG(interest_rate) AS average_interest_rate,
    SUM(loan_amount * interest_rate) / SUM(loan_amount) AS weighted_avg_interest_rate
FROM loans;

-- Q3. What is the overall default rate?
-- Note: Denominator must only include eligible loans (outcome_eligible = 1)
SELECT 
    SUM(default_flag) AS defaulted_loans,
    SUM(outcome_eligible) AS eligible_loans,
    CAST(SUM(default_flag) AS FLOAT) / SUM(outcome_eligible) AS default_rate,
    SUM(CASE WHEN default_flag = 1 THEN loan_amount ELSE 0 END) AS defaulted_principal_exposure
FROM loans
WHERE outcome_eligible = 1;

-- Q4. How has loan volume changed over time (monthly/quarterly)?
-- Uses issue_month
SELECT 
    issue_month,
    COUNT(*) AS num_loans,
    SUM(loan_amount) AS total_funded_amount
FROM loans
GROUP BY issue_month
ORDER BY issue_month;

-- Q5. Which loan purposes represent the largest share of funded amount?
SELECT 
    loan_purpose,
    COUNT(*) AS num_loans,
    SUM(loan_amount) AS total_funded_amount,
    SUM(loan_amount) / (SELECT SUM(loan_amount) FROM loans) * 100 AS pct_of_total_funded
FROM loans
GROUP BY loan_purpose
ORDER BY total_funded_amount DESC;

-- Q6. Which credit grades represent the largest share of funded amount?
SELECT 
    grade,
    COUNT(*) AS num_loans,
    SUM(loan_amount) AS total_funded_amount,
    SUM(loan_amount) / (SELECT SUM(loan_amount) FROM loans) * 100 AS pct_of_total_funded
FROM loans
GROUP BY grade
ORDER BY grade ASC;
