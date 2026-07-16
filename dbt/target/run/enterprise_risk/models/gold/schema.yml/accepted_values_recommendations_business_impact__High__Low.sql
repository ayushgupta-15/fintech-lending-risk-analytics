select
      count(*) as failures,
      count(*) != 0 as should_warn,
      count(*) != 0 as should_error
    from (
      
    
    

with all_values as (

    select
        business_impact as value_field,
        count(*) as n_records

    from "enterprise_risk"."public_gold"."recommendations"
    group by business_impact

)

select *
from all_values
where value_field not in (
    'High','Low'
)



      
    ) dbt_internal_test