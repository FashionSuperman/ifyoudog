var url = {};
url.serverPath = "http://192.168.1.103:8088/fs-game-dubbox-web/fs-game-service/";
url.url_getShopCommodities = url.serverPath + "Shop/getShopCommodities";
url.buyUrl = url.serverPath + "Shop/buyShopCommodity";

module.exports.url = url;
