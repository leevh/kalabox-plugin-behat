#!/bin/bash
set -e

# Set defaults
: ${KALABOX_UID:='1000'}
: ${KALABOX_GID:='50'}
: ${KALABOX_SSH_KEY:='pantheon.kalabox.id_rsa'}

# Move any config over and git correct perms
chown -Rf $KALABOX_UID:$KALABOX_GID $HOME

# Add local user to match host
addgroup --force-badname --gecos "" "$KALABOX_GID" > /dev/null || true
adduser --force-badname --quiet --gecos "" --disabled-password --home "$HOME" --gid "$KALABOX_GID" "$KALABOX_UID" > /dev/null
mkdir -p "$HOME/.ssh"

# If we have a composer installed drush lets symlink that to a common path
if [ -f "/composer/vendor/drush/drush/drush" ]; then
  ln -sf /composer/vendor/drush/drush/drush /usr/local/bin/drush
fi

# set gherkin cache folder permissions
chmod 777 -R /tmp/behat_gherkin_cache

echo "$KALABOX_UID ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Run the behat command
su -m "$KALABOX_UID" -c "bin/$(echo $@)"
