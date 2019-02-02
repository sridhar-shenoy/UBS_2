# UBS_2

After cloning:

1) Generating logs (optional, because they already exist): Run Log_Generator/Log_Generator.py - there will result multiple logs of proxy, event and gateway kinds in folders, representing a complex system through which order requests flow.

2) Adding logs to the database: after using ./bin/elasticsearch in /elasticsearch-6.5.4 to run elasticsearch, navigate to /logstash-6.5.4
and replace all "D:/Desktop" in logstash.conf with the address of the containing directory of the cloned folder, and the elasticsearch port at the bottom with the appropriate port number (likely to be the same). Save and use bin/logstash -f logstash.conf in /logstash-6.5.4 to run logstash and add the logs to elasticsearch.

3) Run npm install then npm start in /dashboard to open the dashboard. There should be a count of number of entries in the database,
and also a search bar with suggestions that are saved as new queries are made. Search works by pressing the down arrow key after typing
and then hitting enter.
