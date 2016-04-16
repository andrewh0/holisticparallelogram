#!/bin/bash
set -x # Show the output of the following commands (useful for debugging)

echo -e "Host 104.236.177.231\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config

# Import the SSH deployment key
openssl aes-256-cbc -K $encrypted_ea9ad5e41313_key -iv $encrypted_ea9ad5e41313_iv -in deploy-key.enc -out deploy-key -d
rm deploy-key.enc # Don't need it anymore
chmod 600 deploy-key
mv deploy-key ~/.ssh/id_rsa
