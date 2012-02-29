#!/bin/sh

pid_file='scripts/node-server.pid'

# if server not running, quit
if ! [ -f $pid_file ]
then
	echo "Server already stopped."
	exit
fi

# read pid from file
pid=`cat $pid_file`

# kill the server process
kill $pid
echo "Killed server process with pid $pid."

# delete the pid file
rm $pid_file
echo "Deleted pid file $pid_file"

echo