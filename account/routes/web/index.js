var express = require("express");
var router = express.Router();

//导入moment
const moment = require("moment");
const AccountModel = require("../../models/AccountModel");

//声明中间件检测登录
let checkLoginMiddleware = require("../../middlewares/checkLoginMiddleware");
/* GET home page. */
router.get("/account", checkLoginMiddleware, function (req, res, next) {
  AccountModel.find()
    .sort({ time: -1 })
    .exec()
    .then((data) => {
      if (!data) {
        res.status(500).send("失败");
        return;
      }
      res.render("list", { account: data, moment: moment });
    });
});

//添加记录
router.get("/account/create", checkLoginMiddleware, function (req, res, next) {
  res.render("create");
});

//新增记录
router.post("/account", checkLoginMiddleware, (req, res) => {
  //转化日期string为date
  //插入数据库
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate(),
  }).then((data) => {
    if (!data) {
      res.status(500).send("插入失败");
      return;
    }
    res.render("success", { msg: "添加成功哦", url: "/account" });
  });
});

//删除记录
router.get("/account/:id", checkLoginMiddleware, (req, res) => {
  let id = req.params.id;
  AccountModel.deleteOne({ _id: id }).then((data) => {
    if (!data) {
      res.status(500).send("删除失败");
      return;
    }

    res.render("success", { msg: "删除成功哦", url: "/account" });
  });
});
module.exports = router;
