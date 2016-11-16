![Logo](admin/probemon.png)
# ioBroker.probemon
=================
Tracks devices via probe request monitoring. Requires a wifi adapter that allows promiscous mode.

Specify the monitor interface (eg "mon0") and a list of mac addresses in the config.

Unix only

# setup your wifiadapter for monitor mode (numbers need to be adapted to your hardware):
~~~~
sudo ifconfig wlan1 down
sudo iw phy phy1 interface add mon0 type monitor
sudo ifconfig wlan1 up
sudo ifconfig mon0 up
~~~~
