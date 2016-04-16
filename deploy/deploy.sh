#!/bin/bash
set -x
eval `ssh-agent -s` # Start ssh agent
ssh-add ~/.ssh/id_rsa
if [ $TRAVIS_BRANCH == 'deploy' ] ; then
   git init
   git remote add deploy ssh://deploy@104.236.177.231/var/www/scenic.ninja/.git
   git config user.name "Travis CI"
   git config user.email "andrew.leean.ho@gmail.com"
   git add .
   git commit -m "Deploy"
   git push --force deploy deploy
else
   echo "Not deploying, since this branch isn't called \"deploy\"."
fi
