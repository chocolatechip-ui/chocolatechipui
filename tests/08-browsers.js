var isPhantomJS = /PhantomJS/igm.test(navigator.userAgent);
describe("Browser Tests", function () {

  it('$.isiPhone should return boolean.', function() {
    var userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13G36 Safari/601.1";
    var isiPhone = /iphone/img.test(userAgent);
    /* Test for iPhone */
    expect(isiPhone).to.equal(true);
  });

  it('$.isiPad should return boolean.', function() {
    var userAgent = "Mozilla/5.0 (iPad; CPU OS 10_2 like Mac OS X) AppleWebKit/602.3.12 (KHTML, like Gecko) Version/10.0 Mobile/14C92 Safari/602.1";
    var isiPad = /ipad/img.test(userAgent);
    /* Test for iPad */
    expect(isiPad).to.equal(true);
  });

  it('$.isiPod should return boolean.', function() {
    var userAgent = "Mozilla/5.0 (iPod; CPU iPhone OS 10_2 like Mac OS X) AppleWebKit/602.3.12 (KHTML, like Gecko) Version/10.0 Mobile/14C92 Safari/602.1";
    var isiPod = /ipod/img.test(userAgent);
    /* Test for iPod */
    expect(isiPod).to.equal(true);
  });

  it('$.isiOS should return boolean.', function() {
    var userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13G36 Safari/601.1";
    var isiOS = /ip(hone|od|ad)/img.test(userAgent);
    /* Test for iOS */
    expect().to.equal();
  });

  it('$.isAndroid should return boolean.', function() {
    var userAgent = "Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/_BuildID_) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";
    var isAndroid = (/android/img.test(userAgent) && /applewebKit/img.test(userAgent));
    /* Test for Android */
    expect(isAndroid).to.equal(true);
  });

  it('$.isTouchEnabled should return boolean.', function() {
    var touchEnabled = 'createTouch' in document;
    if (touchEnabled) {
      /* Test for touch */
      expect($.isTouchEnabled).to.equal(true);
    } else {
      /* Test for touch */
      expect($.isTouchEnabled).to.equal(false);
    }
  });

  it('$.isOnline should return boolean.', function() {
    if ($.isOnline) {
      /* Test if online */
      expect($.isOnline).to.equal(true);
    } else {
      /* Test if online */
      expect($.isOnline).to.equal(false);
    }
  });

  it('$.isStandalone should return boolean.', function() {
    if ($.isStandalone) {
      /* Test if standalone */
      expect($.isStandalone).to.equal(true);
    } else {
      /* Test if standalone */
      expect($.isStandalone).to.equal(false);
    }
  });

  it('$.isWebkit should return boolean.', function() {
    var userAgent = "";
    var isWebkit = "";
    /* Test if webkit */
    expect().to.equal();
  });

  it('$.isDesktop should return boolean.', function() {
    /* Check for PhantomJS */
    if (isPhantomJS) {
      expect($.isDesktop).to.equal(true);
    } else {
      if ($.isMobile) {
        expect($.isDesktop).to.equal(false);
      } else {
        expect($.isDesktop).to.equal(true);
      }
    }
  });

  it('$.isMobile should return boolean.', function() {
    /* Check for PhantomJS */
    if (isPhantomJS) {
      expect($.isMobile).to.equal(false);
    } else {
      if ($.isDesktop) {
        expect($.isMobile).to.equal(false);
      }
    }
  });

  it('$.isSafari should return boolean.', function() {
    /* mobile Safari */
    var userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13G36 Safari/601.1";

    var isSafari = (!/edge/img.test(userAgent) && !/Chrome/img.test(userAgent) && /Safari/img.test(userAgent) && !/android/img.test(userAgent));

    /* desktop Safari */
    var desktopSafari = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/602.3.12 (KHTML, like Gecko) Version/10.0.2 Safari/602.3.12";

    var isSafariDesktop = (!/edge/img.test(desktopSafari) && !/Chrome/img.test(desktopSafari) && /Safari/img.test(desktopSafari) && !/android/img.test(desktopSafari));

    /* Test if Safari on mobile & desktop */
    expect(isSafari).to.equal(true);
    expect(isSafariDesktop).to.equal(true);
  });

  it('$.isChrome should return boolean.', function() {
    var userAgent = "Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/_BuildID_) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";
    var isChrome = !/trident/img.test(userAgent) && !/edge/img.test(userAgent) && /Chrome/img.test(userAgent) && !((/samsung/img.test(userAgent) || /Galaxy Nexus/img.test(userAgent) || /HTC/img.test(userAgent) || /LG/img.test(userAgent)) && !/trident/img.test(userAgent) && !/edge/img.test(userAgent) && /android/i.test(userAgent) && /webkit/i.test(userAgent));
    /* Test if Chrome */
    expect(isChrome).to.equal(true);
  });

  it('$.isNativeAndroid should return boolean.', function() {

    var userAgentHTC = "Mozilla/5.0 (Linux; U; Android 4.4.2; en-gb; HTC_One Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30";

    var userAgentSamsung = "Mozilla/5.0 (Linux; U; Android 4.2.2; en-us; Galaxy Nexus Build/JDQ39) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30";
    
    var userAgentLG = "Mozilla/5.0 (Linux; U; Android 4.0.4; en-us; LG-MS770 Build/IMM76I) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30";

    var isNativeAndroidHTC = ((/samsung/img.test(userAgentHTC) || /Galaxy Nexus/img.test(userAgentHTC) || /HTC/img.test(userAgentHTC) || /\sLG/img.test(userAgentHTC)) && !/trident/img.test(userAgentHTC) && !/edge/img.test(userAgentHTC) && /android/i.test(userAgentHTC) && /webkit/i.test(userAgentHTC) && (/Android 3/i.test(userAgentHTC) || /Android 4/i.test(userAgentHTC)));

    var isNativeAndroidSamsung = ((/samsung/img.test(userAgentSamsung) || /Galaxy Nexus/img.test(userAgentSamsung) || /HTC/img.test(userAgentSamsung) || /\sLG/img.test(userAgentSamsung)) && !/trident/img.test(userAgentSamsung) && !/edge/img.test(userAgentSamsung) && /android/i.test(userAgentSamsung) && /webkit/i.test(userAgentSamsung) && (/Android 3/i.test(userAgentHTC) || /Android 4/i.test(userAgentHTC)));

    var isNativeAndroidLG = ((/samsung/img.test(userAgentLG) || /Galaxy Nexus/img.test(userAgentLG) || /HTC/img.test(userAgentLG) || /\sLG/img.test(userAgentLG)) && !/trident/img.test(userAgentLG) && !/edge/img.test(userAgentLG) && /android/i.test(userAgentLG) && /webkit/i.test(userAgentLG) && (/Android 3/i.test(userAgentHTC) || /Android 4/i.test(userAgentHTC)));

    var androidversion = parseFloat(userAgentLG.slice(userAgentLG.indexOf("Android")+8));
    /* Test if native Android browser */
    expect(isNativeAndroidHTC).to.equal(true);
    expect(isNativeAndroidSamsung).to.equal(true);
    expect(isNativeAndroidLG).to.equal(true);
  });

});