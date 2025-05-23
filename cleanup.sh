#!/bin/bash

# Remove sensitive data from Git history
git filter-branch --force --index-filter \
"git rm --cached --ignore-unmatch \
server/server.js \
server/resetUsers.js \
server/clearDatabase.js" \
--prune-empty --tag-name-filter cat -- --all

# Force push the changes
git push origin --force --all

# Clean up the refs and garbage collect
git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now 