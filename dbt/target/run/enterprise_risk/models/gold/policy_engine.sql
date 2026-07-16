
  
    

  create  table "enterprise_risk"."public_gold"."policy_engine__dbt_tmp"
  
  
    as
  
  (
    

-- This table holds loan-level pre-calculations to make policy simulations instantly fast.
-- It joins the base loan data with its corresponding risk segment metrics.

SELECT 
    l.loan_id,
    l.loan_amount,
    l.grade,
    l.debt_to_income,
    l.dti_band,
    l.annual_income,
    l.income_band,
    l.emp_length,
    l.loan_purpose,
    l.default_flag,
    l.outcome_eligible,
    r.risk_score,
    r.expected_loss AS segment_expected_loss
FROM "enterprise_risk"."public_silver"."loans_clean" l
LEFT JOIN "enterprise_risk"."public_gold"."risk_engine" r 
  ON l.grade = r.grade 
 AND l.loan_purpose = r.loan_purpose
 AND l.income_band = r.income_band
 AND l.dti_band = r.dti_band
  );
  