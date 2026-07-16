select
      count(*) as failures,
      count(*) != 0 as should_warn,
      count(*) != 0 as should_error
    from (
      
    
    



select loan_amount
from "enterprise_risk"."public_silver"."loans_clean"
where loan_amount is null



      
    ) dbt_internal_test