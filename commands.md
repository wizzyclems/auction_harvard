test123@

Test123@

Testing123@

ISP Public IP: 86.40.95.56
https://86.40.95.56/
https://www.auctions.com.ng
https://auctions.com.ng

## Useful Django commands
python3 manage.py startapp appname
python3 manage.py runserver

python3 manage.py makemigrations
python3 manage.py migrate

pip freeze > requirements.txt

## Change a user's password
python3 manage.py changepassword your_username

sudo adduser app_user
sudo usermod -aG sudo app_user

## Compress the app for transfer into the server
tar -czvf auction_harvard.tar.gz auction_harvard

## Copy the app into the server
scp -r auction_harvard.tar.gz app_user@p5h-1:/home/app_user/


## Uncompress the app file
tar -xvf auction_harvard.tar.gz 


## Get the public IP 
curl ifconfig.me
curl -s checkip.dyndns.org | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+\.[0-9]\+'


## Setup app environment
cd auctions_harvard
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python3 manage.py collectstatic 
python3 manage.py migrate
deactivate

## Django Gunicorn Service

### create the network socket for the app
sudo mkdir -p /run/auction_app
sudo chown app_user:www-data /run/auction_app
sudo chmod 770 /run/auction_app

### Verify socket ownership
ls -lZ /run/auction_app/auction_app.sock


### See app sysstem logs
sudo journalctl -u auction_app --no-pager

sudo chown -R app_user:www-data /home/app_user/auction_harvard/static
sudo chmod -R 755 /home/app_user/auction_harvard/static

sudo chmod 755 /home/app_user
sudo chmod 755 /home/app_user/auction_harvard

sudo chown -R app_user:www-data /home/app_user/auction_harvard/media
sudo chmod -R 755 /home/app_user/auction_harvard/media

sudo chown app_user:www-data /home/app_user/auction_harvard/auction_app.sock
sudo chmod 777 /home/app_user/auction_harvard/auction_app.sock
sudo usermod -aG www-data app_user

### create a service file for our app
sudo nano /etc/systemd/system/auction_app.service

### Reload daemon after editing the service file
sudo systemctl daemon-reload

### start and enable the app service
sudo systemctl start auction_app
sudo systemctl enable auction_app
sudo systemctl restart auction_app


## Nginx Configuration

### app specific nginx configuation
sudo nano /etc/nginx/sites-available/auction_app

### link your app config to nginx enabled sites.
sudo ln -s /etc/nginx/sites-available/auction_app /etc/nginx/sites-enabled
ls -la /etc/nginx/sites-enabled



### Test nginx config file
sudo nginx -t

### Restart nginx
sudo systemctl reload nginx

### See nginx status
sudo systemctl status nginx

### Check if nginx is listening on port 80
sudo netstat -tuln | grep :80

### Stream nginx access and error logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
sudo tail -n 50 /var/log/nginx/error.log



curl -I https://auctions.com.ng


### SSL for nginx 

#### install the required packages
sudo apt install certbot python3-certbot-nginx

#### Request certificate from let's encrypt
sudo certbot --nginx -d auctions.com.ng -d www.auctions.com.ng


uccessfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/auctions.com.ng/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/auctions.com.ng/privkey.pem
This certificate expires on 2025-11-01.
These files will be updated when the certificate renews.
Certbot has set up a scheduled task to automatically renew this certificate in the background.

Deploying certificate
Successfully deployed certificate for auctions.com.ng to /etc/nginx/sites-enabled/auction_app
Successfully deployed certificate for www.auctions.com.ng to /etc/nginx/sites-enabled/auction_app
Congratulations! You have successfully enabled HTTPS on https://auctions.com.ng and https://www.auctions.com.ng

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
If you like Certbot, please consider supporting our work by:
 * Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
 * Donating to EFF:                    https://eff.org/donate-le


## After createing a new user. Use the below to enable ssh
mkdir -p ~/.ssh
chmod 700 ~/.ssh

### copy the auth key from the remote server
cat ~/.ssh/id_rsa.pub

### paste the auth key in the ssh's authorized keys of our new user
nano ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys


## SQLite3

### Connect to SQlite3 db from the terminal
sqlite3 dbname

### Useful SQLite3 commands

| Task                       | Command                   |
| -------------------------- | ------------------------- |
| View all tables            | `.tables`                 |
| Describe a table schema    | `.schema table_name`      |
| Show all commands          | `.help`                   |
| Run SQL                    | `SELECT * FROM my_table;` |
| Exit SQLite                | `.exit` or `Ctrl+D`       |
| Read SQL from a file       | `.read script.sql`        |
| Show current database file | `.databases`              |

