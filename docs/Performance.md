# Performance

By pre-aggregating data in the Medallion Warehouse using dbt and bypassing SQLAlchemy ORM in favor of raw `psycopg` queries, API latency is kept under 20ms for most analytical queries. Simulation engine queries execute in ~42ms dynamically.
