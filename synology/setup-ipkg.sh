#!/bin/sh -x

### fn definition

waitForUserInput() {
    read -p "Will $1. Type any key to continue...\n"
}

# Main script

waitForUserInput "create the @optware folder"


mkdir -p /volume1/@optware
mkdir -p /opt
mount -o bind /volume1/@optware /opt


waitForUserInput "download ipkg"


feed=http://ipkg.nslu2-linux.org/feeds/optware/cs08q1armel/cross/unstable
ipk_name=`wget -qO- $feed/Packages | awk '/^Filename: ipkg-opt/ {print $2}'`
[ ! -f $feed/$ipk_name ] && wget $feed/$ipk_name && tar -xOvzf $ipk_name ./data.tar.gz | tar -C / -xzvf -
mkdir -p /opt/etc/ipkg
echo "src cross $feed" > /opt/etc/ipkg/feeds.conf


waitForUserInput "update the PATH in /etc/profile and /root/.profile"


echo PATH=$PATH:/opt/bin:/opt/sbin >> /etc/profile
echo PATH=$PATH:/opt/bin:/opt/sbin >> /root/.profile
source /root/.profile

waitForUserInput "install the /etc/rc.local file"


touch /etc/rc.local
chmod 755 /etc/rc.local
cat << EOF > /etc/rc.local
#!/bin/sh

# Optware setup
[ -x /etc/rc.optware ] && /etc/rc.optware start
EOF


waitForUserInput "install the /etc/rc.optware file"


touch /etc/rc.optware
chmod 755 /etc/rc.optware
cat << EOF > /etc/rc.optware
#!/bin/sh

if test -z "${REAL_OPT_DIR}"; then
    # next line to be replaced according to OPTWARE_TARGET
    REAL_OPT_DIR=/volume1/@optware
fi

case "$1" in
    start)
        echo "Starting Optware."
        if test -n "${REAL_OPT_DIR}"; then
            if ! grep ' /opt ' /proc/mounts >/dev/null 2>&1 ; then
                mkdir -p /opt
                mount -o bind ${REAL_OPT_DIR} /opt
            fi
        fi
	[ -x /opt/etc/rc.optware ] && /opt/etc/rc.optware
        ;;
    reconfig)
	true
        ;;
    stop)
        echo "Shutting down Optware."
	true
        ;;
    *)
        echo "Usage: $0 {start|stop|reconfig}"
        exit 1
esac

exit 0
EOF
