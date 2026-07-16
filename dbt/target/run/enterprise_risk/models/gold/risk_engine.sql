
  
    

  create  table "enterprise_risk"."public_gold"."risk_engine__dbt_tmp"
  
  
    as
  
  (
    

SELECT 
    grade,
    loan_purpose,
    income_band,
    dti_band,
    
    COUNT(*) AS loan_count,
    SUM(loan_amount) AS funded_amount,
    
    SUM(CASE WHEN default_flag = 1 THEN 1 ELSE 0 END) AS defaults,
    
    ROUND(CAST(SUM(CASE WHEN default_flag = 1 THEN 1 ELSE 0 END) AS NUMERIC) / NULLIF(SUM(outcome_eligible), 0), 4) AS default_rate,
    
    SUM(CASE WHEN default_flag = 1 THEN loan_amount - paid_total ELSE 0 END) AS expected_loss,
    
    -- Naive risk score based on historical default rate 
    -- (Scaled 0-1000 where higher is riskier)
    COALESCE(ROUND(
        (CAST(SUM(CASE WHEN default_flag = 1 THEN 1 ELSE 0 END) AS NUMERIC) / NULLIF(SUM(outcome_eligible), 0)) * 1000
    , 2), 0) AS risk_score

FROM "enterprise_risk"."public_silver"."loans_clean"
GROUP BY 
    grade,
    loan_purpose,
    income_band,
    dti_band
  );
  