# Run in local
`npm start`

# Deploy

## Check firebase project list
`firebase projects:list`

## dev
```bash.sh
  npm run build-dev
  firebase use dev
  firebase target
  firebase deploy
```

## prod
```bash.sh
  npm run build
  firebase use prod
  firebase target
  firebase deploy
```