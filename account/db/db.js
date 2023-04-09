/**
 *
 * @param {*} success 数据库连接成功的回调
 * @param {*} error 数据库连接失败的回调
 */
module.exports = function (success, error) {
  if (typeof error !== "function") {
    error = () => {
      console.log("连接失败1");
    };
  }
  const mongoose = require("mongoose");
  const { DBHSOT, DBPORT, DBNAME } = require("../config/config");
  mongoose.set("strictQuery", true);
  //连接mongodb服务
  //   mongoose.connect("mongodb://${DBHSOT}:${DBPORT}/${DBNAME}");
  mongoose.connect("mongodb://127.0.0.1:27017/bilibili");
  //设置回调 once 一次，事件回调函数只执行一次
  mongoose.connection.once("open", () => {
    success();
  });
  mongoose.connection.on("error", () => {
    error();
  });
  mongoose.connection.on("close", () => {});
};
