# junekim-reading

Textbooks and research papers translated into runnable code with SVG diagrams. Live at [june.kim/reading](https://june.kim/reading/).

## Local dev

```
pnpm install
pnpm dev        # localhost:12345
```

## Deploy

No deploy script in this repo. The site is built and deployed via the june.kim blog repo:

```
cd ~/Documents/june.kim && bash deploy.sh
```

That script builds reading as a subpath and syncs everything to S3/CloudFront.

## Tests

```
pnpm test       # vitest
```
