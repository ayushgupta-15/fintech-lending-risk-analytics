
    
    

select
    loan_id as unique_field,
    count(*) as n_records

from "enterprise_risk"."public_silver"."loans_clean"
where loan_id is not null
group by loan_id
having count(*) > 1


