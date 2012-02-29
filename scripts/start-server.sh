#!/bin/sh

pid_file='scripts/node-server.pid'
out_file='logs/node-server.out'
err_file='logs/node-server.err'

# if server already running, print out pid and quit
if [ -f $pid_file ]
then
	pid=`cat $pid_file`
	echo "Server already running with pid $pid."
	exit
fi

if ! [ -f $out_file ]
then
	touch $out_file
fi

if ! [ -f $err_file ]
then
	touch $err_file
fi

# start the node server
nohup /usr/local/bin/node /var/rapp/abootay-node/server.js < /dev/null > $out_file 2> $err_file &
pid=$!
echo "Server running with pid $pid."

# save pid to a file so we can stop the server later
echo $pid > $pid_file
echo "Pid saved in file $pid_file."

echo