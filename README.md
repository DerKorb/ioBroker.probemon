![Logo](admin/probemon.png)
# ioBroker.probemon
=================
This adapter allow to track the presence of wifi devices (your's and anyone else's within the range of your wifi).

It is using pcap to listen for so called probe requests, sent by wifi devices to scan for available wlans.

If a probe request is detected, availibility for the corresponding MAC adress is set true. If no request is detected for ten seconds availibilty is set back to false.

Tested on Rpi 3 with Wifi Dongle (original pi wifi does not support monitor mode).

To change your wifi adapter to monitor mode follow these steps:
~~~~
# shut down the corresponding wlan interface
sudo ifconfig wlan1 down

# enable monitor mode for the corresponding physical interface
sudo iw phy phy1 interface add mon0 type monitor

# bring the wlan interface back up
sudo ifconfig wlan1 up

# activate the monitor interface
sudo ifconfig mon0 up
~~~~
For the adapter to work you need to configurate it. Specify the monitor interface from before (mon0 in my case) and which MAC adresses you want to track.

You will need libpcap installed. Most OSX machines seem to have it. All major Linux distributions have it available either by default or with a package like libpcap-dev.
