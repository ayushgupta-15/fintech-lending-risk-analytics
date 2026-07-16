
    
    

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


