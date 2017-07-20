var url = {};
url.serverPath = "http://www.fashionsuperman.top/ifyoudog/fs-game-service/";
url.url_getShopCommodities = url.serverPath + "Shop/getShopCommodities";
url.buyUrl = url.serverPath + "Shop/buyShopCommodity";
url.url_getUserPackageList = url.serverPath + "Package/getUserPackageList";
url.getLoginUserInfo = url.serverPath + "User/getLoginUserInfo";
url.wxlogin = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx324313fc147c74e2&redirect_uri=http%3a%2f%2fwww.fashionsuperman.top%2fifyoudog%2ffs-game-service%2fUser%2floginwx&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
url.generateUserOrder = url.serverPath + "Order/generateUserOrder";
url.applyWXPayUrl = url.serverPath + "DogBiz/applyWXPay";


url.buyShopCommodity = url.serverPath + "Shop/buyShopCommodity";

module.exports.url = url;
