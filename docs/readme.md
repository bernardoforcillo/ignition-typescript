# Monorepo Documentation (developer knowledge base) 

## Setup: run postgres
```bash
podman run --rm -it -p 5432:5432 --network=host --volume ./local/postgres/:/var/lib/postgresql:rw --name local-postgres --env-file ./.env docker.io/postgres:alpine
```

```bash
podman stop local-postgres && podman container rm local-postgres
```