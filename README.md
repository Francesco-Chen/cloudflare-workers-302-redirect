# cloudflare-workers-302-redirect
A Cloudflare Workers serverless function for IP-based redirection and dynamic configuration using KV.

## how usging
Set up a crontab scheduled task or

For Synology NAS, open "Control Panel" --> "Task Scheduler" --> "Create" --> "User-defined script", execute every minute.
```
curl https://dns.yourname.workers.dev/?token=123
```
open https://dns.yourname.workers.dev will redirect to your ip. 

### other parameter
#### set ip
curl https://dns.yourname.workers.dev/?token=123&ip=1.2.3.4
#### set port
curl https://dns.yourname.workers.dev/?token=123&port=5000
