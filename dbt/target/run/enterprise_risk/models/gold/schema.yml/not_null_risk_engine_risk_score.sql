select
      count(*) as failures,
      count(*) != 0 as should_warn,
      count(*) != 0 as should_error
    from (
      
    
    



select risk_score
from "enterprise_risk"."public_gold"."risk_engine"
where risk_score is null



      
    ) dbt_internal_test