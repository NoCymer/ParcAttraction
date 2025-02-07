# Documentation

## Init database

Use the following command to shell into the api

```shell
docker compose exec api sh
```

Running the following command will recreate the datase tables contained inside the `init.sql` file and insert data contained in the `create.sql` file

```shell
python3 init.py
```
