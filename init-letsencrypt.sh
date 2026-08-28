#!/usr/bin/env bash
# Emite el certificado TLS de paymyloan.ai la primera vez.
#
# Se corre UNA SOLA VEZ en el servidor de produccion, con el DNS de
# paymyloan.ai y www.paymyloan.ai ya apuntando a este host y el puerto 80
# abierto (Let's Encrypt valida por HTTP). Despues de esto, el servicio
# "certbot" del docker-compose.yml se encarga de renovar solo.
set -euo pipefail
cd "$(dirname "$0")"

domains=(paymyloan.ai www.paymyloan.ai)
rsa_key_size=4096
data_path="./certbot"
email="frank.ownertodueno@gmail.com"   # solo para avisos de Let's Encrypt (vencimiento, etc.)
staging=${STAGING:-0}            # STAGING=1 para probar sin gastar el limite de Let's Encrypt

if [ -d "$data_path/conf/live/${domains[0]}" ]; then
  read -r -p "Ya existe un certificado para ${domains[0]}. ¿Reemplazarlo? (s/N) " decision
  if [[ "$decision" != "s" && "$decision" != "S" ]]; then
    exit 0
  fi
fi

mkdir -p "$data_path/conf"

echo "### Creando un certificado dummy para que nginx pueda arrancar ..."
domain_path="$data_path/conf/live/${domains[0]}"
mkdir -p "$domain_path"
docker compose run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1 \
    -keyout '/etc/letsencrypt/live/${domains[0]}/privkey.pem' \
    -out '/etc/letsencrypt/live/${domains[0]}/fullchain.pem' \
    -subj '/CN=localhost'" certbot

echo "### Arrancando nginx ..."
docker compose up --build -d nginx

echo "### Borrando el certificado dummy ..."
docker compose run --rm --entrypoint "\
  rm -Rf /etc/letsencrypt/live/${domains[0]} && \
  rm -Rf /etc/letsencrypt/archive/${domains[0]} && \
  rm -Rf /etc/letsencrypt/renewal/${domains[0]}.conf" certbot

echo "### Pidiendo el certificado real a Let's Encrypt ..."
domain_args=""
for domain in "${domains[@]}"; do
  domain_args="$domain_args -d $domain"
done

staging_arg=""
if [ "$staging" != "0" ]; then
  staging_arg="--staging"
fi

docker compose run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    $staging_arg \
    $domain_args \
    --email $email \
    --rsa-key-size $rsa_key_size \
    --agree-tos \
    --no-eff-email \
    --force-renewal" certbot

echo "### Recargando nginx con el certificado real ..."
docker compose exec nginx nginx -s reload

echo "### Levantando el resto del stack (landing + renovacion automatica) ..."
docker compose up --build -d

echo "### Listo. https://${domains[0]} deberia responder con el certificado real."
