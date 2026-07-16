

WITH risk_flags AS (
    SELECT 
        grade,
        dti_band,
        default_rate,
        loan_count,
        CASE 
            WHEN default_rate > 0.04 THEN 'High Default Rate'
            WHEN dti_band LIKE 'High%' AND default_rate > 0.03 THEN 'High DTI & Rising Risk'
            ELSE 'Normal'
        END AS risk_trigger
    FROM "enterprise_risk"."public_gold"."risk_engine"
)
SELECT 
    grade,
    dti_band,
    risk_trigger,
    CASE 
        WHEN risk_trigger = 'High Default Rate' THEN 'Increase minimum grade requirements or reduce maximum loan sizes.'
        WHEN risk_trigger = 'High DTI & Rising Risk' THEN 'Reduce approval threshold for High DTI applicants.'
        ELSE 'Monitor performance.'
    END AS recommendation,
    
    CASE 
        WHEN risk_trigger != 'Normal' THEN 'High'
        ELSE 'Low'
    END AS business_impact
FROM risk_flags
WHERE risk_trigger != 'Normal'