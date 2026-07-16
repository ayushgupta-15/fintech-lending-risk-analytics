
    
    

with all_values as (

    select
        grade as value_field,
        count(*) as n_records

    from "enterprise_risk"."public_silver"."loans_clean"
    group by grade

)

select *
from all_values
where value_field not in (
    'A','B','C','D','E','F','G'
)


