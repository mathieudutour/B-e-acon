/*App.info({
  id: 'com.meteor.beacon',
  name: 'The Beacon',
  description: '',
  author: 'Mathieu Dutour',
  email: 'mathieu@dutour.me',
  website: 'http://thebeacon.meteor.com',
  version: '0.1.10'
});*/

/*
// https://gist.github.com/jperl/f8c395b9f0f1056ad890
// http://ticons.fokkezb.nl/
App.icons({
  'iphone': 'public/icons/app/assets/iphone/appicon-60.png',
  'iphone_2x': 'public/icons/app/assets/iphone/appicon-60@2x.png',
  'iphone_3x': 'public/icons/app/assets/iphone/appicon-60@3x.png',
  'ipad': 'public/icons/app/assets/iphone/appicon-76.png',
  'ipad_2x': 'public/icons/app/assets/iphone/appicon-76@2x.png',

  'android_ldpi': 'public/icons/platform/android/res/drawable-ldpi/appicon.png',
  'android_mdpi': 'public/icons/platform/android/res/drawable-mdpi/appicon.png',
  'android_hdpi': 'public/icons/platform/android/res/drawable-hdpi/appicon.png',
  'android_xhdpi': 'public/icons/platform/android/res/drawable-xhdpi/appicon.png'
});

// http://ticons.fokkezb.nl/
App.launchScreens({
  'iphone': 'public/splash/iphone/Default.png',
  'iphone_2x': 'public/splash/iphone/Default@2x.png',
  'iphone5': 'public/splash/iphone/Default-568h@2x.png',
  'iphone6': 'public/splash/iphone/Default-667h@2x.png',
  'iphone6p_portrait': 'public/splash/iphone/Default-Portrait-736h@3x.png',
  'iphone6p_landscape': 'public/splash/iphone/Default-Landscape-736h@3x.png',
  'ipad_portrait': 'public/splash/iphone/Default-Portrait.png',
  'ipad_portrait_2x': 'public/splash/iphone/Default-Portrait@2x.png',
  'ipad_landscape': 'public/splash/iphone/Default-Landscape.png',
  'ipad_landscape_2x': 'public/splash/iphone/Default-Landscape@2x.png',

  'android_ldpi_portrait': 'public/splash/android/images/res-notlong-port-ldpi/default.png',
  'android_ldpi_landscape': 'public/splash/android/images/res-notlong-land-ldpi/default.png',
  'android_mdpi_portrait': 'public/splash/android/images/res-notlong-port-mdpi/default.png',
  'android_mdpi_landscape': 'public/splash/android/images/res-notlong-land-mdpi/default.png',
  'android_hdpi_portrait': 'public/splash/android/images/res-notlong-port-hdpi/default.png',
  'android_hdpi_landscape': 'public/splash/android/images/res-notlong-land-hdpi/default.png',
  'android_xhdpi_portrait': 'public/splash/android/images/res-notlong-port-xhdpi/default.png',
  'android_xhdpi_landscape': 'public/splash/android/images/res-notlong-land-xhdpi/default.png'
});
*/
App.accessRule("http://localhost:3000/*");
App.accessRule("https://assets.braintreegateway.com/*");
App.accessRule("https://client-analytics.sandbox.braintreegateway.com/*");
App.accessRule("https://checkout.paypal.com/*");
App.accessRule("https://api.sandbox.braintreegateway.com/*");
App.accessRule("http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css");

// Set PhoneGap/Cordova preferences
//App.setPreference('BackgroundColor', '0xffFFFFFF');
