#!/bin/sh

init=$(date +%s)

export APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=true
export DEBIAN_FRONTEND=noninteractive

hostname=$(grep -m 1 '\.test' /etc/hosts | sed 's/		*/ /g' | cut -d ' ' -f 2)
locale=${1:-'en_US.UTF-8'}
timezone=${2:-'UTC'}
vnjs='14'

if [ -e /vagrant/package.json ] && grep -q '"node":'; then
  vnjs=$(grep -m 1 '"node": ' /vagrant/package.json | sed 's/[^0-9.]//g' | cut -d '.' -f 1)
fi



# ----- System -----------------------------------------------------------------

if grep -q 'root:!' /etc/shadow; then
  printf 'Updating root password'
  printf 'root:root' | chpasswd
fi

if ! timedatectl | grep -q "Time zone: $timezone"; then
  printf 'Updating system time zone'
  timedatectl set-timezone "$timezone"
fi

if ! locale | grep -iq "LANG=$locale" ; then
  printf 'Updating system locale'
  update-locale LANG="$locale"
fi

if [ ! -e /etc/apt/sources.list.d/vagrant.list ]; then
  printf 'Updating apt sources'
  wget -qO - https://nginx.org/keys/nginx_signing.key | apt-key add - >/dev/null
  printf 'deb http://nginx.org/packages/mainline/debian/ %s nginx\n' "$(lsb_release -cs)" >> /etc/apt/sources.list.d/vagrant.list
  wget -qO - https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - >/dev/null
  printf 'deb https://deb.nodesource.com/node_%s.x %s main\n' "$vnjs" "$(lsb_release -cs)" >> /etc/apt/sources.list.d/vagrant.list
  apt-get -qq update
fi

if ! dpkg -l | grep -q 'nginx'; then
  printf 'Installing system packages'
  apt-get -qqy install   \
    apache2              \
    curl                 \
    git                  \
    libxml2-utils        \
    nginx                \
    nodejs               \
    pkg-config           \
    postfix              \
    ruby-full            \
    unzip                \
    vim                  \
    zlib1g-dev           \
    >/dev/null 2>&1
    service apache2 stop
fi



# ----- Server -----------------------------------------------------------------

apache_root=$(apachectl -V | grep -o 'HTTPD_ROOT=.*' | cut -d '"' -f 2)
nginx_conf=$(nginx -V 2>&1 | grep -o '\-\-conf-path=.*' | cut -d ' ' -f 1 | sed 's/--conf-path=//')
nginx_confs=$(grep -o 'include  *.*conf' "$nginx_conf" | sed 's/include  *//' | sed 's/\/[*].conf//' | tail -1)
nginx_root=$(nginx -V 2>&1 | grep -o '\-\-prefix=.*' | cut -d ' ' -f 1 | sed 's/--prefix=//')

if [ ! -e '/etc/ssl/certs/server.crt' ]; then
  printf 'Creating self-signed certificate'
  openssl req -new -newkey rsa:4096 -days 30 -nodes -x509 -subj /CN=*."$hostname" -keyout /etc/ssl/private/server.key -out /etc/ssl/certs/server.crt 2>/dev/null
fi

if [ ! -d /srv/web ]; then
  printf 'Creating %s' "$hostname"
  mkdir /srv/web
fi

if ! grep -q sys."$hostname" /etc/hosts; then
  printf 'Updating hosts with sys.%s' "$hostname"
  printf '%s sys.%s\n' "$(grep -m 1 '\.test' /etc/hosts | sed 's/		*/ /g' | cut -d ' ' -f 1)" "$hostname" >> /etc/hosts
fi

if [ ! -e "$nginx_root"/custom_conf ]; then
  printf 'Updating Nginx configuration'
  touch "$nginx_root"/custom_conf
  touch "$nginx_root"/custom_server
  sed -i 's/user  *nginx;/user www-data;/' "$nginx_conf"
  sed -i 's/sendfile/# sendfile/' "$nginx_conf"
  cat <<NGINXCONF > "$nginx_confs"/default.conf
client_max_body_size 999m;

ssl_certificate /etc/ssl/certs/server.crt;
ssl_certificate_key /etc/ssl/private/server.key;

include custom_conf;

server {
  server_name $hostname;

  listen 80 default_server;
  listen 443 ssl default_server;

  root /srv/web;

  index index.html;

  location / {
    try_files \$uri.html \$uri \$uri/ =404;
  }

  include custom_server;
}

server {
  server_name sys.$hostname;

  listen 443 ssl;

  return 301 http://\$http_host\$request_uri;
}
NGINXCONF
fi

if ! apachectl -M | grep -q 'info'; then
  printf 'Installing Apache modules'
  a2enmod -q info proxy proxy_http rewrite socache_shmcb ssl >/dev/null
fi

if [ ! -L "$apache_root"/conf-enabled/default.conf ]; then
  printf 'Updating Apache configuration'
  cat <<APACHEDEFAULT > "$apache_root"/conf-available/default.conf
<Directory /srv/>
  AllowOverride All
  EnableSendfile Off
  Options FollowSymLinks Indexes MultiViews
  Require all granted
</Directory>
APACHEDEFAULT
  ln -fs "$apache_root"/conf-available/default.conf "$apache_root"/conf-enabled/default.conf
fi

if [ ! -e /usr/local/bin/serve ]; then
  printf 'Creating server switch utility'
  cat <<BINSERVE > /usr/local/bin/serve
case "\$1" in
  'apache')
    if sudo service apache2 status | grep -q 'running'; then
      printf 'Apache is already serving\n'
      exit 1
    fi

    printf 'Switching server to Apache\n'
    sudo service nginx stop
    sudo service apache2 start
    ;;
  'nginx')
    if sudo service nginx status | grep -q 'running'; then
      printf 'Nginx is already serving\n'
      exit 1
    fi

    printf 'Switching server to Nginx\n'
    sudo service apache2 stop
    sudo service nginx start
    ;;
  *)
    printf 'Usage: serve {apache|nginx}\n'
    ;;
esac
BINSERVE
  chmod +x /usr/local/bin/serve
fi

if service apache2 status | grep -q 'running'; then
  printf 'Restarting Apache'
  service apache2 restart
else
  printf 'Restarting Nginx'
  service nginx restart
fi



# ----- Utilities --------------------------------------------------------------

touch /home/vagrant/.bash_aliases

if [ -e /vagrant/Gemfile ]; then
  if ! gem list | grep -q 'bundler'; then
    printf 'Installing Bundler'
    gem install -N --conservative --minimal-deps --silent bundler
  fi

  if ! bundle check --gemfile /vagrant/Gemfile >/dev/null 2>&1; then
    printf 'Installing Bundler packages'
    bundle install --gemfile /vagrant/Gemfile --jobs 9 --quiet
  fi
fi

if [ -e /vagrant/package.json ]; then
  if [ ! -d /vagrant/node_modules ]; then
    printf 'Installing Node packages'
    npm set progress=false
    cd /vagrant || exit 1
    npm -s install >/dev/null 2>&1
    cd /home/vagrant || exit 1
    npm set progress=true
  fi

  if ! grep -q '/node_modules/' /home/vagrant/.bash_aliases; then
    printf 'Updating bash path for Node\n'
    # shellcheck disable=SC2016
    printf 'export PATH=/vagrant/node_modules/.bin:$PATH\n' >> /home/vagrant/.bash_aliases
    printf 'alias run="npm run -s"\n' >> /home/vagrant/.bash_aliases
  fi
fi



# ----- Jekyll -----------------------------------------------------------------

if [ -e /vagrant/Gemfile ] && grep -q 'jekyll' /vagrant/Gemfile; then
  if [ ! -e /vagrant/_config.yml ]; then
    printf 'Creating Jekyll site'
    jekyll new /vagrant
  fi

  if [ ! -e /srv/web/index.html ]; then
    printf 'Building Jekyll site'
    jekyll build -d /srv/web -s /vagrant >/dev/null
  fi
fi



# ----- Finish -----------------------------------------------------------------

if ! stat -c '%U:%G' /srv/web | grep -q 'www-data:www-data'; then
  printf 'Updating web files owner'
  find /srv/web -exec chown www-data:www-data {} \;
fi

stop=$(date +%s)
mins=$(((stop - init) / 60))
secs=$((stop - init - mins * 60))

printf '\nProvisioning completed in %02dm %02ds\n' "$mins" "$secs"
printf 'Now serving %s at %s\n' "$(hostname -I | cut -d ' ' -f 2)" "$hostname"
printf 'See sys.%s for server administration' "$hostname"
