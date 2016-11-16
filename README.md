![Logo](admin/probemon.png)
# ioBroker.probemon
=================
tracks devices via probe request monitoring
requires a wifi adapter that allows promiscous mode
specify the monitor interface (eg "mon0") and a list of mac addresses in the config
unix only

# setup your wifiadapter for monitor mode (numbers need to be adapted to your hardware):
sudo ifconfig wlan1 down
sudo iw phy phy1 interface add mon0 type monitor
sudo ifconfig wlan1 up
sudo ifconfig mon0 up
