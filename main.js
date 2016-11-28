// Generated by CoffeeScript 1.11.1

/**
 *
 * probemon adapter
 */

(function() {
  var OFFLINE_TIMEOUT, _, adapter, handleProbeRequest, main, pcap, requests, setOffline, trackDevice, utils;

  requests = {};

  _ = require("lodash");

  OFFLINE_TIMEOUT = 1000 * 60 * 10;

  setOffline = function(mac) {
    requests[mac].online = false;
    return adapter.setState(mac + '.online', {
      val: false,
      ack: true
    });
  };

  trackDevice = function(deviceConfig) {
    if (!requests[deviceConfig.mac]) {
      requests[deviceConfig.mac] = {
        lastSeen: +(new Date),
        online: true,
        timeout: setTimeout((function() {
          return setOffline(mac);
        }), OFFLINE_TIMEOUT)
      };
      adapter.setObject(deviceConfig.name + '.online', {
        type: 'state',
        common: {
          name: 'online',
          type: 'boolean',
          role: 'indicator.reachable'
        },
        "native": {}
      });
      adapter.setObject(deviceConfig.name + '.lastSeen', {
        type: 'state',
        common: {
          name: 'lastSeen',
          type: 'date'
        },
        "native": {}
      });
    } else {
      clearTimeout(requests[deviceConfig.mac].timeout);
      requests[deviceConfig.mac].timeout = setTimeout((function() {
        return setOffline(mac);
      }), OFFLINE_TIMEOUT);
      requests[deviceConfig.mac].lastSeen = +(new Date);
      requests[deviceConfig.mac].online = true;
    }
    adapter.setState(deviceConfig.name + '.online', {
      val: true,
      ack: true
    });
    return adapter.setState(deviceConfig.name + '.lastSeen', {
      val: +(new Date),
      ack: true
    });
  };

  handleProbeRequest = function(mac) {
    var deviceConfig;
    adapter.log.info("handle " + mac);
    deviceConfig = _.find(adapter.config.devices, function(dev) {
      return dev.mac === mac;
    });
    if (deviceConfig != null) {
      trackDevice(deviceConfig);
    }
    return adapter.setState("nsamode.raw_proberequest", {
      val: mac,
      ack: true
    });
  };

  main = function() {
    adapter.log.info('creating pcap session');
    adapter.setObject("nsamode.raw_proberequest", {
      type: 'state',
      common: {
        name: 'raw_proberequest',
        type: 'string',
        role: 'info'
      },
      "native": {}
    });
    pcap.createSession(adapter.config["interface"], '(type mgt) and (type mgt subtype probe-req )').on('packet', function(raw_packet) {
      var frame;
      frame = pcap.decode.packet(raw_packet).payload.ieee802_11Frame;
      if (frame.type === 0 && frame.subType === 4) {
        handleProbeRequest(frame.shost.toString());
      }
    });
    return adapter.subscribeStates('*');
  };

  'use strict';

  pcap = require('pcap');

  utils = require(__dirname + '/lib/utils');

  adapter = utils.adapter('probemon');

  adapter.on('unload', function(callback) {
    var e;
    try {
      adapter.log.info('cleaned everything up...');
      callback();
    } catch (error) {
      e = error;
      callback();
    }
  });

  adapter.on('objectChange', function(id, obj) {
    adapter.log.info('objectChange ' + id + ' ' + JSON.stringify(obj));
  });

  adapter.on('stateChange', function(id, state) {
    adapter.log.info('stateChange ' + id + ' ' + JSON.stringify(state));
    if (state && !state.ack) {
      adapter.log.info('ack is not set!');
    }
  });

  adapter.on('ready', function() {
    main();
  });

}).call(this);

//# sourceMappingURL=main.js.map
