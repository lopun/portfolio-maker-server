# portfolio-maker-server

Portfolio Maker made by #GraphQL #Typescript #TypeORM #Apollo

## Scripts

### Development Mode

```js
yarn dev
npm run dev
```

### Type Generate

```js
yarn types
npm run types
```

### Build

```js
yarn build
npm run build
```

### Production Start

```js
yarn start
npm run start
```

## Source Structure

### API

- Each APIs : src/api/Entitiy_name/API_name
- Each entity's type definition: src/api/Entity_name/shared/Entity_name.graphql
- Schema / Resolvers Merge : Merged in src/schema.ts

### Types

```js
// Type Generation based on _.graphql
yarn types
```

- src/types/graph.d.ts => Used when making resolvers
- src/types/resolvers.d.ts => Basic Resolver type definition

### TypeORM Entities & Config

- src/entities/Entity_name => Entity Definitions
- src/cormConfig.ts => TypeORM Configuration File

### Utils

- src/utils/decodeJWT => return user by decoding JWT
- src/utils/cleanNullArgs => use it when you want to clean Null Arguments inside a object
- src/utils/createJWT => createJWT by using JWT inside .env file and password.
- src/utils/privateResolvers =>

### Environment Configuration

In source directory, do `copy .env.example .env` and configure environment variables.
Do `copy docker-compose.example.yml docker-compose.yml` to make docker-compose file. Please configure environment variables(password, etc) same with .env file.
